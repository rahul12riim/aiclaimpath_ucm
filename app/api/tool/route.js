import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  try {
    const { toolId, inputs, systemPrompt } = await request.json();
    const userMessage = Object.entries(inputs)
      .map(([k, v]) => `**${k}:**\n${v}`)
      .join('\n\n');

    const message = await client.messages.create({
     model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    return Response.json({ result: message.content[0].text });
  } catch (error) {
    return Response.json({ error: error.message || 'Something went wrong.' }, { status: 500 });
  }
}
