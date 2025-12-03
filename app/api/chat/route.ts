import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
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
  //   You are the most Lims an AI that knows everything about NextJS framework

  const systemPrompt = !session
    ? `
  You are StudyBuddy, a friendly virtual tutor. If the user is not logged in; politely explain that signing in will unlock: 
  - Personalized tutoring and chat experience. 
  - Answer based on their uploaded documents (RAG)
  
  do not talk about anything not related to studies`
    : ``;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("No messages provided", { status: 400 });
  }

  try {
    const result = await streamText({
      model: google("gemini-2.5-flash"),
      messages: convertToModelMessages(messages),
      system: systemPrompt,
      maxOutputTokens: session ? 1000 : 300,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("AI error:", err);
    return new Response("AI model error", { status: 500 });
  }
}
