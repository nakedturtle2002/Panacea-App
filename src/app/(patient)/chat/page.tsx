"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { QUICK_QUESTIONS } from "@/lib/constants";
import {
  mockChatResponses,
  defaultChatResponse,
} from "@/lib/mock-data/chat-responses";
import { ChatMessage } from "@/types/patient";
import { generateId } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      patientId: "p1",
      role: "assistant",
      content:
        "Hi there! I am your Panacea health assistant. I can help with general wellness questions, but I am not a replacement for your doctor. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      patientId: "p1",
      role: "user",
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response =
        mockChatResponses[text.trim()] || defaultChatResponse;
      const aiMessage: ChatMessage = {
        id: generateId(),
        patientId: "p1",
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-border">
        <h1 className="text-heading-3 text-navy-700">Health Assistant</h1>
        <p className="text-xs text-gray-400">
          For general guidance only - not medical advice
        </p>
      </div>

      {/* Quick questions */}
      {messages.length <= 1 && (
        <div className="px-4 py-3 bg-gray-50 border-b border-border">
          <p className="text-xs text-gray-500 mb-2 font-medium">
            Quick questions:
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="flex-shrink-0 px-4 py-2.5 bg-white rounded-full text-sm text-navy-700 border border-border hover:border-primary-400 hover:bg-primary-50 transition-colors min-h-[44px]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                msg.role === "user"
                  ? "bg-primary-500 text-white rounded-br-md"
                  : "bg-white border border-border text-navy-700 rounded-bl-md"
              )}
            >
              <p className="text-body leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Support info */}
      <div className="px-4 py-2 bg-amber-50 border-t border-amber-200">
        <p className="text-xs text-amber-700 text-center">
          Need urgent help?{" "}
          <a href="tel:1669" className="font-semibold underline">
            Call 1669
          </a>{" "}
          or{" "}
          <a href="#" className="font-semibold underline">
            contact your hospital
          </a>
        </p>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-white border-t border-border"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 rounded-xl border border-border bg-gray-50 px-4 py-3 text-body text-navy-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent min-h-touch"
            disabled={isTyping}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4"
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
}
