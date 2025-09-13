import { useState } from "react";
import { MessageCircle, Send, X, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";


interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI wellness companion. I'm here to listen, support, and help you through any challenges you're facing. How are you feeling today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickResponses = [
    "I'm feeling anxious",
    "I need motivation", 
    "Help with stress",
    "Breathing exercises",
    "I'm feeling sad",
    "Can't sleep"
  ];

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: currentMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateBotResponse(currentMessage),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("anxious") || input.includes("anxiety")) {
      return "I understand that anxiety can be overwhelming. Let's try a quick grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. Would you like me to guide you through some breathing exercises as well?";
    } else if (input.includes("sad") || input.includes("depressed") || input.includes("down")) {
      return "I hear you, and your feelings are completely valid. It's okay to feel sad sometimes. Remember that this feeling is temporary. Would you like to talk about what's making you feel this way, or would you prefer some gentle activities that might help lift your mood?";
    } else if (input.includes("stress") || input.includes("stressed")) {
      return "Stress can really weigh us down. Let's work on this together. Have you tried any relaxation techniques today? I can suggest some quick stress-relief methods like deep breathing, progressive muscle relaxation, or even a brief mindfulness exercise.";
    } else if (input.includes("sleep") || input.includes("insomnia")) {
      return "Sleep troubles can really affect how we feel. Creating a calming bedtime routine can help. Try avoiding screens 1 hour before bed, practice some gentle stretches, or listen to calming music. Would you like me to suggest some specific sleep hygiene tips?";
    } else if (input.includes("motivation") || input.includes("motivated")) {
      return "Finding motivation can be challenging, especially when we're going through tough times. Start small - even tiny steps forward are progress. What's one small thing you could accomplish today that would make you feel good about yourself?";
    } else {
      return "Thank you for sharing that with me. I'm here to support you. Every feeling you have is valid, and it takes courage to reach out. Is there something specific you'd like to talk about or work on together today?";
    }
  };

  const handleQuickResponse = (response: string) => {
    setCurrentMessage(response);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-primary shadow-glow hover:shadow-primary transition-all duration-300 hover:scale-110 ${
          isOpen ? "hidden" : "flex"
        }`}
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
        <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground animate-pulse">
          AI
        </Badge>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] shadow-glow border-primary/20">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">AI Wellness Coach</CardTitle>
                  <p className="text-xs opacity-90 flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Online & Ready to Help
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[416px]">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-gradient-primary text-primary-foreground"
                          : "bg-chat-bot border border-primary/10"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && (
                          <Bot className="w-4 h-4 mt-1 text-primary" />
                        )}
                        {message.sender === "user" && (
                          <User className="w-4 h-4 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === "user" 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-chat-bot border border-primary/10 rounded-2xl px-4 py-2 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-primary" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Responses */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Quick responses:</p>
                <div className="flex flex-wrap gap-1">
                  {quickResponses.slice(0, 3).map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickResponse(response)}
                      className="text-xs h-6 px-2 border-primary/20 hover:bg-primary/10"
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border-primary/20 focus:border-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all duration-300"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;