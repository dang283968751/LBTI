// POST /api/visitor — increment page view counter
// GET  /api/visitor — return current count
// Uses same KV binding as counter: SBTI_KV
//
// Dedup: same IP only counts once per 30 minutes

export async function onRequest(context) {
  const { request, env } = context;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: { ...headers, Allow: 'GET, POST, OPTIONS' } });
  }

  const VISITOR_KEY = 'visitor-count';

  if (!env.SBTI_KV) {
    return new Response(JSON.stringify({ count: 0 }), { headers });
  }

  if (request.method === 'POST') {
    // Simple dedup: hash IP + User-Agent + date-hour as a crude unique-visitor key
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const ua = (request.headers.get('user-agent') || '').slice(0, 64);
    // One unique per IP+UA per 30-min window
    const now = Date.now();
    const window = Math.floor(now / 1800000); // 30-min bucket
    const dedupKey = 'visitor-dedup-' + window + '-' + ip.slice(-8);

    const already = await env.SBTI_KV.get(dedupKey);
    if (!already) {
      await env.SBTI_KV.put(dedupKey, '1', { expirationTtl: 3600 }); // expire after 1h
      const current = await env.SBTI_KV.get(VISITOR_KEY);
      const newCount = (parseInt(current) || 0) + 1;
      await env.SBTI_KV.put(VISITOR_KEY, String(newCount));
      return new Response(JSON.stringify({ count: newCount }), { headers });
    }

    // Already counted in this window
    const current = await env.SBTI_KV.get(VISITOR_KEY);
    return new Response(JSON.stringify({ count: parseInt(current) || 0 }), { headers });
  }

  // GET
  const count = await env.SBTI_KV.get(VISITOR_KEY);
  return new Response(JSON.stringify({ count: parseInt(count) || 0 }), { headers });
}
