import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";
import { getServerSession } from "next-auth";

export async function POST(req: Request, res: Response) {
  //session
  const session = await getServerSession();

  const user = session?.user;
  const name = user?.name || "Guest";

  const { messages } = await req.json();
  const lastUserMessage = messages[messages.length - 1]?.content ?? "";

  //AI
  let ragContent = "";

  if (session) {
    //bukas
  }

  //Default

  const systemPrompt = !session
    ? `
  You are StudyBuddy, a friendly virtual tutor. If the user is not logged in; politely explain that signing in will unlock: 
  - Personalized tutoring and chat experience. 
  - Answer based on their uploaded documents (RAG)`
    : ``;

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    system: systemPrompt,
    maxOutputTokens: session ? 1000 : 300,
  });

  return result.toUIMessageStreamResponse();
}
