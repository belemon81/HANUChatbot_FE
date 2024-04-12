import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();
 
  if (!messages) {
    throw new Error('Question is missing');
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-2024-04-09',
    max_tokens: 1500,
    stream: true,
    messages,
  });
 
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}





