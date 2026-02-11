import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Mic, 
  Trash2, 
  Copy,
  Code2,
  MessageSquare,
  History,
  Plus,
  X,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Share
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generatorAPI } from '@/lib/api';
import AppLayout from '@/components/layout/AppLayout';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: Date;
  messages: Message[];
}

const Generator = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI code generator. I can help you create code in various programming languages. What would you like me to help you build today?',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Java ArrayList Tutorial',
      lastMessage: new Date(Date.now() - 86400000),
      messages: []
    },
    {
      id: '2', 
      title: 'Python Web Scraping',
      lastMessage: new Date(Date.now() - 172800000),
      messages: []
    },
    {
      id: '3',
      title: 'React Components',
      lastMessage: new Date(Date.now() - 259200000),
      messages: []
    }
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added or when generating
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isGenerating]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const prompt = inputValue;
    setInputValue('');
    setIsGenerating(true);

    try {
      // Call backend API for code generation
      const response = await generatorAPI.generateCode(prompt, 'java');
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Here's a Java solution for your request:

\`\`\`java
${response.code}
\`\`\`

${response.explanation || 'This code demonstrates the concept you requested. Would you like me to explain any part of it or modify it further?'}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : 'Failed to generate code. Please try again.',
        variant: "destructive"
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize, but I encountered an error while generating code: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or rephrase your request.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI code generator. I can help you create code in various programming languages. What would you like me to help you build today?',
      timestamp: new Date()
    }]);
    toast({
      title: "Chat cleared",
      description: "Conversation has been reset."
    });
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice input",
      description: "Voice input functionality will be implemented soon."
    });
  };

  const copyCode = (content: string) => {
    const codeMatch = content.match(/```[\s\S]*?```/);
    if (codeMatch) {
      const code = codeMatch[0].replace(/```\w*\n?/g, '').replace(/```$/, '');
      navigator.clipboard.writeText(code);
      toast({
        title: "Code copied!",
        description: "Code has been copied to clipboard."
      });
    }
  };

  const startNewChat = () => {
    const currentChat: ChatHistory = {
      id: Date.now().toString(),
      title: messages.length > 1 ? `Chat ${chatHistories.length + 1}` : 'New Chat',
      lastMessage: new Date(),
      messages: [...messages]
    };
    
    setChatHistories(prev => [currentChat, ...prev]);
    handleClearChat();
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-6rem)] relative -m-6">
        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 mx-6 mt-4 mb-0 border-b border-border/20 bg-gradient-to-r from-background/95 to-muted/20 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent mr-3">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Code Generator
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearChat}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              {!showHistory && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(true)}
                  className="hover:bg-primary/10 transition-colors"
                >
                  <History className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6 mx-6 bg-gradient-to-b from-background to-muted/10 h-[calc(100vh-16rem)]">
            <div className="max-w-4xl mx-auto space-y-6 min-h-full">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-primary to-accent text-white'
                        : 'bg-card border border-border/50 backdrop-blur-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                  
                  {/* Action icons below assistant messages */}
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-1 mt-2 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors"
                        onClick={() => copyCode(message.content)}
                        title="Copy"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors"
                        onClick={() => toast({ title: "Liked!", description: "Thanks for your feedback" })}
                        title="Like"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors"
                        onClick={() => toast({ title: "Disliked", description: "Thanks for your feedback" })}
                        title="Dislike"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          // Regenerate response logic would go here
                          toast({ title: "Regenerating...", description: "Creating a new response" });
                        }}
                        title="Regenerate"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(message.content);
                          toast({ title: "Shared!", description: "Response copied to clipboard" });
                        }}
                        title="Share"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              
              {isGenerating && (
                <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-card border border-border/50 backdrop-blur-sm rounded-2xl p-4 max-w-[80%] shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">Generating your code...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Scroll target for auto-scroll */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area original */}
          {/* <div className="border-t border-border/20 px-6 py-2 mx-6 mt-0 bg-card/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-4">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe what code you want me to generate..."
                    className="pr-12 h-12 text-base rounded-xl border-2 focus:border-primary/50 transition-colors"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-primary/10 transition-colors"
                    onClick={handleVoiceInput}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handleSend} 
                  disabled={!inputValue.trim() || isGenerating}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-center mt-3">
                <p className="text-xs text-muted-foreground">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </div>
          </div> */}

        {/* Input Area */}
        <div className="border-t border-border/20 px-6 py-4 bg-card/50 backdrop-blur-sm mt-auto">
          <div className="max-w-4xl mx-auto flex items-end space-x-4">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe what code you want me to generate..."
                className="pr-12 h-12 text-base rounded-xl border-2 focus:border-primary/50 transition-colors"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-primary/10 transition-colors"
                onClick={handleVoiceInput}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              onClick={handleSend} 
              disabled={!inputValue.trim() || isGenerating}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
       </div>

        {/* Chat History Sidebar - Right Side */}
        <div className={`${showHistory ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden border-l border-border/20 bg-card/30 backdrop-blur-sm`}>
          <Card className="h-full rounded-none border-0 bg-transparent">
            <CardHeader className="border-b border-border/20 bg-gradient-to-r from-card to-muted/20">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <History className="w-5 h-5 mr-2 text-primary" />
                  History
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" onClick={startNewChat} className="hover:bg-primary/10">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)} className="hover:bg-destructive/10">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-240px)]">
                {chatHistories.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-3 border-b border-border/10 hover:bg-primary/5 cursor-pointer transition-all duration-200 group flex items-center justify-center"
                    onClick={() => {
                      setMessages(chat.messages.length ? chat.messages : [{
                        id: '1',
                        role: 'assistant',
                        content: 'Hello! I\'m your AI code generator. How can I help you today?',
                        timestamp: new Date()
                      }]);
                    }}
                  >
                    <MessageSquare className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Generator;