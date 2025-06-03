
import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, SendHorizontal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Define types for chat messages
interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello Sarah, how can I help you with your medications today?',
      sender: 'assistant',
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 5))
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('geminiApiKey') || '');
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(!localStorage.getItem('geminiApiKey'));
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to save API key
  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('geminiApiKey', apiKey);
      setShowApiKeyPrompt(false);
      toast({
        title: "API Key saved",
        description: "Your Gemini API key has been saved successfully"
      });
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
    }
  };

  // Function to handle sending a message
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Generate a random ID for the new message
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Placeholder for Gemini API integration - for now just simulate a response
      setTimeout(() => {
        let responseContent = '';
        
        // Simple rule-based responses for demo
        if (inputMessage.toLowerCase().includes('blood pressure') && inputMessage.toLowerCase().includes('orange juice')) {
          responseContent = "I'll help you with that. For your Lisinopril, it's generally safe to take with orange juice. However, grapefruit juice should be avoided as it can interact with this medication. Would you like me to remind you about any other food interactions with your medications?";
        } else if (inputMessage.toLowerCase().includes('headache') || inputMessage.toLowerCase().includes('pain')) {
          responseContent = "If you're experiencing headaches, it's important to note that they could be a side effect of Lisinopril. I recommend discussing persistent headaches with your healthcare provider. Is there anything else I can help with?";
        } else if (inputMessage.toLowerCase().includes('refill') || inputMessage.toLowerCase().includes('prescription')) {
          responseContent = "I see that your Atorvastatin needs to be refilled soon. You have 5 pills remaining. Would you like me to remind you 3 days before you run out?";
        } else {
          responseContent = "I understand. Is there anything specific about your medications you'd like to know? I can help with scheduling, side effects, or interactions.";
        }
        
        const newAssistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          content: responseContent,
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, newAssistantMessage]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Function to handle press Enter to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-med-light-gray dark:bg-gray-900 pb-16 flex flex-col">
      <Header title="MedMind AI Assistant" showBack showHome />
      
      <div className="flex-1 overflow-y-auto pb-4">
        {showApiKeyPrompt ? (
          <div className="med-container">
            <div className="med-card dark:bg-gray-800 dark:border-gray-700">
              <h2 className="font-medium mb-2 dark:text-white">Enter Gemini API Key</h2>
              <p className="text-sm text-med-gray dark:text-gray-400 mb-4">
                To enable the AI assistant features, please enter your Gemini API key.
              </p>
              <Input
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mb-4"
              />
              <Button 
                className="w-full"
                onClick={saveApiKey}
              >
                Save API Key
              </Button>
            </div>
          </div>
        ) : (
          <div className="med-container">
            <div className="flex flex-col space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`${
                    message.sender === 'user' 
                      ? 'self-end bg-med-blue text-white dark:bg-blue-600 ml-12'
                      : 'self-start bg-gray-100 text-med-dark-gray dark:bg-gray-800 dark:text-white mr-12'
                  } p-3 rounded-lg max-w-[80%]`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user'
                      ? 'text-blue-100 dark:text-blue-200'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  
                  {/* Show "Powered by Gemini" for assistant messages */}
                  {message.sender === 'assistant' && (
                    <p className="text-xs flex items-center mt-2 text-gray-500">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                      Powered by Gemini
                    </p>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="self-start bg-gray-100 text-med-dark-gray dark:bg-gray-800 dark:text-white p-3 rounded-lg flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>
      
      {!showApiKeyPrompt && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-2 items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full dark:bg-gray-700 dark:border-gray-600"
            >
              <Camera size={20} />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                placeholder="Ask about your medicine..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="pr-10"
              />
            </div>
            
            <Button 
              size="icon" 
              className="rounded-full bg-med-blue hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
            >
              <SendHorizontal size={20} />
            </Button>
          </div>
        </div>
      )}
      
      <Navigation />
    </div>
  );
};

export default Chat;
