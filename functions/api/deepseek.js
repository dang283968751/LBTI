// POST /api/deepseek — AI personality deep interpretation via DeepSeek
// Body: { code, cn, intro, dimScores, userVector, dimDetails, lang }
// dimDetails: [{ dim, name, model, level, explanation }, ...]
//
// Requires DEEPSEEK_API_KEY env var in Cloudflare Pages dashboard.
// Fallback: reads from hardcoded key (dev only — move to env var in production).

export async function onRequest(context) {
  const { request, env } = context;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  };

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: { ...headers, Allow: 'POST, OPTIONS' } });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers
    });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers
    });
  }

  const { code, cn, intro, dimDetails, lang } = body;
  if (!code || !dimDetails || !dimDetails.length) {
    return new Response(JSON.stringify({ error: 'Missing required fields: code, dimDetails' }), {
      status: 400, headers
    });
  }

  const isCn = lang !== 'en';

  // Build the user prompt
  const dimSummary = dimDetails.map((d, i) => {
    const levelLabel = d.level === 'H' ? (isCn ? '高' : 'High') :
                       d.level === 'M' ? (isCn ? '中' : 'Medium') :
                       (isCn ? '低' : 'Low');
    return `${i + 1}. ${d.name} (${d.model}): ${levelLabel}(${d.level})\n   ${isCn ? '解读' : 'Meaning'}: ${d.explanation || ''}`;
  }).join('\n\n');

  const systemPrompt = isCn
    ? `你是一位资深的心理学专家和人格分析师，专精于 SBTI 人格模型。SBTI 是一种基于 5 大模型（自我模型、情感模型、态度模型、行动驱力模型、社交模型）× 3 个维度的 15 维人格评估体系。每个维度有 H（高）、M（中）、L（低）三个等级。

你需要根据用户的 15 维人格分数，生成一份专业、深入、个性化的解读报告。报告要求：

1. 使用第二人称"你"，像和朋友对话般温暖、共情
2. 结合用户的具体维度分数，做出精准的分析，不要泛泛而谈
3. 语言生动有趣，可以适当使用 emoji 和年轻人喜欢的表达
4. 篇幅约 800-1200 字
5. 必须包含以下结构（使用 Markdown 标题）：

## 🎭 整体画像
（200-300 字）结合用户的人格代码和维度特点，描绘一个生动的整体人格画像。

## 💪 核心优势
（200-300 字）根据高(H)维度，分析用户的突出优势、天赋和能力。要具体引用维度名称和含义。

## 🌱 成长盲区
（150-250 字）根据低(L)和中(M)维度，温柔地指出可能的短板和改进方向。

## 💼 职业与方向
（150-200 字）结合人格特点，建议适合的工作类型、环境偏好和发展方向。

## 💕 关系与社交
（150-200 字）分析用户在感情、友情、社交中的表现模式和相处建议。

## ✨ 专属寄语
（50-100 字）一句暖心的个性化寄语。

请确保分析具体、有深度，避免通用的赞美。要敢于结合分数特点给出建设性反馈。`
    : `You are a senior psychology expert and personality analyst specializing in the SBTI personality model. SBTI is a 15-dimension personality assessment system based on 5 models (Self, Emotion, Attitude, Action Drive, Social) × 3 dimensions each. Each dimension has H (High), M (Medium), L (Low) levels.

Generate a professional, in-depth, personalized interpretation report based on the user's 15-dimension scores. Requirements:

1. Use second person "you", warm and empathetic tone
2. Reference specific dimension scores — be precise, not generic
3. Engaging, lively language — appropriate emoji use
4. ~800-1200 words
5. Follow this structure (use Markdown headings):

## 🎭 Overall Portrait
Vivid overall personality portrait based on the type code and dimensions.

## 💪 Core Strengths
Analyze standout strengths and talents based on High (H) dimensions. Reference specific dimension names.

## 🌱 Growth Areas
Gently point out potential blind spots and growth directions based on Low (L) and Medium (M) dimensions.

## 💼 Career & Direction
Suggest suitable work types, environment preferences, and development directions.

## 💕 Relationships & Social
Analyze relationship patterns, social style, and interpersonal advice.

## ✨ Personal Note
A warm, personalized closing message.

Be specific, deep, and constructive. Avoid generic flattery.`;

  const userPrompt = isCn
    ? `请为以下 SBTI 人格测试结果生成深度解读报告：

**人格代码**: ${code} · ${cn}
**人格简介**: ${intro}

**15 维度详细分数**：
${dimSummary}

请基于以上数据生成完整的深度解读报告。`
    : `Please generate a deep interpretation report for the following SBTI personality test result:

**Type Code**: ${code} · ${cn}
**Type Intro**: ${intro}

**15 Dimension Scores**:
${dimSummary}

Please generate a complete deep interpretation report based on the above data.`;

  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server config missing: DEEPSEEK_API_KEY' }), {
      status: 500, headers
    });
  }

  try {
    const dsResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-v4-pro',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 4096,
        temperature: 0.8,
        top_p: 0.95
      })
    });

    if (!dsResponse.ok) {
      const errText = await dsResponse.text();
      console.error('DeepSeek API error:', dsResponse.status, errText);
      return new Response(JSON.stringify({
        error: 'AI service temporarily unavailable',
        status: dsResponse.status
      }), { status: 502, headers });
    }

    const dsData = await dsResponse.json();
    const content = dsData.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({
      report: content,
      model: 'deepseek-v4-pro'
    }), { headers });

  } catch (e) {
    console.error('DeepSeek request failed:', e.message);
    return new Response(JSON.stringify({
      error: 'AI request failed: ' + e.message
    }), { status: 500, headers });
  }
}
