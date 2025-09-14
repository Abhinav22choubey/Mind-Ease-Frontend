import React, { useState, useEffect, useRef } from "react";
import { Bot, User, Send, X } from "lucide-react";
import { PulseLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import Typewriter from "typewriter-effect";

const MainChatBot = ({ phqResult, onClose }) => {
  const scrollRef = useRef(null);
  const uniqueId = phqResult?.userId || uuidv4();

  const [messages, setMessages] = useState(() => {
    if (phqResult?.phq9) {
      return [
        {
          sender: "system",
          text: `PHQ-9 Score: ${phqResult.phq9.score} (${phqResult.phq9.severity})`,
        },
      ];
    }
    return [];
  });

  const [input, setInput] = useState("");
  const [load, setLoad] = useState(false);

  // ---- Show suggestion + followUp after PHQ9 ----
  useEffect(() => {
    if (phqResult?.phq9) {
      setLoad(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "AI", text: phqResult.phq9.suggestion },
        ]);
        setLoad(false);

        if (phqResult.followUpResponse) {
          setLoad(true);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { sender: "AI", text: phqResult.followUpResponse },
            ]);
            setLoad(false);
          }, 1000);
        }
      }, 1500);
    }
  }, [phqResult]);

  const run = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      setLoad(true);
      const res = await fetch("https://mind-ease-backend.vercel.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: uniqueId, msg: input }),
      });
      const data = await res.text();
      setMessages((prev) => [...prev, { sender: "AI", text: data }]);
      setInput("");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: "Error: " + err.message },
      ]);
    }
    setLoad(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-h-screen min-h-[100%] flex flex-col border-l border-gray-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <h3 className="font-semibold">AI ChatBot</h3>
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 break-words ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : "bg-white border shadow"
              }`}
            >
              <div className="flex items-start space-x-2">
                {msg.sender === "AI" || msg.sender === "system" ? (
                  <Bot className="w-4 h-4 mt-1 text-indigo-500" />
                ) : (
                  <User className="w-4 h-4 mt-1" />
                )}

                {/* 👇 AI messages with typewriter */}
                {msg.sender === "AI" ? (
                  <Typewriter
                    options={{
                      strings: [msg.text],
                      autoStart: true,
                      delay: 30,
                      deleteSpeed: Infinity,
                      cursor: "",
                      loop: false,
                    }}
                  />
                ) : (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {load && (
          <div className="flex justify-start">
            <div className="bg-white border rounded-2xl px-4 py-3 max-w-[70%] flex items-center space-x-2 shadow">
              <Bot className="w-4 h-4 text-indigo-500" />
              <PulseLoader size={6} color="#6366F1" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <button
            onClick={run}
            disabled={!input.trim()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:shadow-lg transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainChatBot;
