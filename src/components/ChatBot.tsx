import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Menu, MessageSquare } from "lucide-react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ChatSidebar } from "@/components/ChatSidebar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  files?: File[];
}

interface ChatBotProps {
  className?: string;
}

export const ChatBot: React.FC<ChatBotProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, files?: File[]) => {
    const userMessage: Message = {
      id: Date.now().toString() + "_user",
      content,
      sender: "user",
      timestamp: new Date(),
      files,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString() + "_bot",
        content: `I received your message: "${content}". This is a demo response. In a real implementation, this would connect to an AI service.`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setSidebarOpen(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className={cn("flex h-screen bg-background relative", className)}>
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 lg:p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            {hasMessages && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center animate-float">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">ChatGPT</h2>
                  <p className="text-sm text-muted-foreground">
                    {isLoading ? "Typing..." : "Online"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {!hasMessages ? (
            <WelcomeScreen
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          ) : (
            <div className="h-full overflow-y-auto p-4 lg:p-6 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "flex gap-3 max-w-full",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-4 h-4 rounded-full border-2 border-primary-foreground flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                        </div>
                      </div>
                    )}
                    
                    <div
                      className={cn(
                        "max-w-[80%] sm:max-w-[70%] lg:max-w-[60%] rounded-2xl px-4 py-3 shadow-message",
                        message.sender === "user"
                          ? "bg-gradient-primary text-primary-foreground ml-auto"
                          : "bg-card text-card-foreground"
                      )}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 bg-gradient-primary rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full border border-primary-foreground flex items-center justify-center">
                              <div className="w-0.5 h-0.5 bg-primary-foreground rounded-full" />
                            </div>
                          </div>
                          <span className="text-xs font-medium text-primary">ChatGPT</span>
                        </div>
                      )}
                      <div
                        className={cn(
                          "text-sm leading-relaxed whitespace-pre-wrap",
                          message.content.includes("//") && "font-mono bg-muted/20 p-3 rounded-lg border border-primary/20"
                        )}
                      >
                        {message.content.includes("//") ? (
                          <pre className="text-primary font-mono text-sm">
                            {message.content}
                          </pre>
                        ) : (
                          message.content
                        )}
                      </div>
                      {message.files && message.files.length > 0 && (
                        <div className="mt-2 text-xs opacity-70">
                          📎 {message.files.length} file(s) attached
                        </div>
                      )}
                      <div
                        className={cn(
                          "text-xs mt-2 opacity-70",
                          message.sender === "user" ? "text-right" : "text-left"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    {message.sender === "user" && (
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-4 h-4 rounded-full border-2 border-primary-foreground flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                    </div>
                  </div>
                  <div className="bg-card rounded-2xl px-4 py-3 shadow-message animate-shimmer">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 lg:p-6 border-t border-border bg-background/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <PromptInputBox
              onSend={handleSendMessage}
              isLoading={isLoading}
              placeholder={hasMessages ? "Message ChatGPT..." : "Write simple JS code"}
              className="shadow-input"
            />
          </div>
          {!hasMessages && (
            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground">
                ChatGPT can make mistakes. Consider checking important information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};