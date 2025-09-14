import React, { useState, useRef, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import { Send, Bot, User, Heart, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Typewriter from "typewriter-effect";

// generate a unique ID
const uniqueId = uuidv4();

const MainChatBot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [load, setLoad] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  async function run() {
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
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [...prev, { sender: "AI", text: errorMsg }]);
    }
    setLoad(false);
  }

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="py-16 bg-gradient-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-primary">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <Badge className="bg-gradient-secondary text-secondary-foreground animate-pulse">
                🤖 AI ChatBot
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Chat with AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your AI companion is here to support you anytime. Start a
              conversation and get instant responses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Features */}
            <div className="space-y-4">
              <div className="p-4 bg-card border border-primary/10 rounded-lg hover:shadow-soft transition-all">
                <div className="flex items-center space-x-3 mb-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Emotional Support</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get empathetic responses for stress, anxiety, and daily
                  challenges
                </p>
              </div>

              <div className="p-4 bg-card border border-primary/10 rounded-lg hover:shadow-soft transition-all">
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold">Coping Strategies</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Learn practical ways to manage stress and emotions
                </p>
              </div>

              <div className="p-4 bg-card border border-primary/10 rounded-lg hover:shadow-soft transition-all">
                <div className="flex items-center space-x-3 mb-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold">Always Available</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Chat with AI anytime you need support
                </p>
              </div>
            </div>

            {/* Chat Interface */}
            <Card className="lg:col-span-2 shadow-glow border-primary/20 w-[80%] h-[80vh] mx-auto flex flex-col">
              <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI Chat Interface</CardTitle>
                    <CardDescription className="text-primary-foreground/80 text-sm">
                      Connected to Mental care Chat Bot
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* Content area divided into scrollable messages + fixed input */}
              <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
                {/* Messages Area */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] md:max-w-[65%] lg:max-w-[60%] rounded-2xl px-4 py-3 break-words ${
                          msg.sender === "user"
                            ? "bg-gradient-primary text-primary-foreground"
                            : "bg-chat-bot border border-primary/10"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {msg.sender === "AI" ? (
                            <Bot className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                          ) : (
                            <User className="w-4 h-4 mt-1 flex-shrink-0" />
                          )}
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
                            <p className="text-sm leading-relaxed">
                              {msg.text}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {load && (
                    <div className="flex justify-start">
                      <div className="bg-chat-bot border border-primary/10 rounded-2xl px-4 py-3 max-w-[75%] flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-primary" />
                        <PulseLoader size={6} color="#10B981" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t bg-background">
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && run()}
                      className="flex-1 border-primary/20 focus:border-primary"
                    />
                    <Button
                      onClick={run}
                      disabled={!input.trim()}
                      className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all duration-300"
                      size="icon"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Crisis Footer */}
          <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
            <p className="text-sm text-destructive font-medium">
              ⚠️ If you're in crisis or having thoughts of self-harm, please
              seek immediate help or call your local helpline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainChatBot;
