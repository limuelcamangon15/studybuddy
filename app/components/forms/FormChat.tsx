"use client";

import { useChat } from "@ai-sdk/react";
import { UserRound, Bot, Loader, Send, AlertTriangleIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";

export default function FormChat() {
  // States
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // AI SDK
  const { messages, sendMessage } = useChat({
    onError: (error) => {
      console.log("error:", error);
      setError(error.toString());
    },
  });

  // Enter to submit
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form && input.trim()) {
        form.requestSubmit();
      }
    }
  }

  // Handle chat
  async function handleChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input || isLoading) return;

    const userInput = input;
    setInput("");

    try {
      setIsLoading(true);
      await sendMessage({ text: userInput });
    } catch (error: any) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  // Auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-200 w-full mx-auto flex flex-col gap-4">
      {/* Messages Area */}
      {messages.length > 0 && (
        <div className=" flex flex-col max-h-130 overflow-y-scroll gap-3 p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={` flex gap-3 p-2 ${
                message.role === "user"
                  ? "flex-row-reverse text-right"
                  : "flex-row text-left"
              }`}
            >
              {/* Avatar */}
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full ${
                  message.role === "user" ? "bg-black/50" : "bg-gray-700"
                }  border`}
              >
                {message.role === "user" ? <UserRound /> : <Bot />}
              </div>

              {/* Message Content */}
              <div className="bg-gray-900 rounded-md p-3 max-w-[80%]">
                {message.parts.map((part, i) => (
                  <div key={i} className="prose prose-sm">
                    {part.type === "text" && (
                      <ReactMarkdown>{part.text}</ReactMarkdown>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 w-full bg-red-500/10 text-red-700 border border-red-400/30 rounded-lg px-4 py-2">
          <AlertTriangleIcon className="w-4 h-4 text-red-600" />
          <span className="text-md">{error}</span>
        </div>
      )}
      {/* Input Form */}
      <form
        onSubmit={handleChat}
        data-loading={isLoading}
        className="flex flex-col items-center gap-3 w-full bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10"
      >
        <div className="flex w-full">
          <textarea
            placeholder="What do you want to know?"
            className="w-full resize-none bg-transparent text-white placeholder-white/40 focus:outline-none p-2"
            rows={1}
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="cursor-pointer flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader className="animate-spin h-7 w-7" />
              </>
            ) : (
              <>
                <Send className="h-7 w-7 hover:scale-105 hover:translate-x-1 hover:-translate-y-1 transition-all duration-300" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
