// GET  /api/counter → { count: N }
// POST /api/counter → increments and returns { count: N }
// Requires KV binding "SBTI_KV" in Cloudflare Pages dashboard

export async function onRequest(context) {
  const { request, env } = context;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  };

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: { ...headers, Allow: 'GET, POST, OPTIONS' } });
  }

  const COUNTER_KEY = 'test-count';

  // No KV binding? fallback to 0
  if (!env.SBTI_KV) {
    return new Response(JSON.stringify({ count: 0 }), { headers });
  }

  if (request.method === 'POST') {
    const current = await env.SBTI_KV.get(COUNTER_KEY);
    const newCount = (parseInt(current) || 0) + 1;
    await env.SBTI_KV.put(COUNTER_KEY, String(newCount));
    return new Response(JSON.stringify({ count: newCount }), { headers });
  }

  // GET
  const count = await env.SBTI_KV.get(COUNTER_KEY);
  return new Response(JSON.stringify({ count: parseInt(count) || 0 }), { headers });
}
