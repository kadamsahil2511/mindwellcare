import React, { useState, useRef, useEffect } from 'react';
import { Send, User, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'consultant';
  timestamp: Date;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Sarah, your personal wellness consultant. How can I help you today?",
      sender: 'consultant',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate consultant typing
    setTimeout(() => {
      const consultantMessage: Message = {
        id: messages.length + 2,
        text: getResponse(newMessage),
        sender: 'consultant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, consultantMessage]);
    }, 1000);
  };

  const getResponse = (message: string): string => {
    // Predefined responses for a more supportive conversation
    const responses = [
      "I understand how you're feeling. Let's explore that further.",
      "That's a great observation. What made you come to that realization?",
      "I'm here to support you. Would you like to tell me more about that?",
      "It sounds like you're going through a lot. Let's break this down together.",
      "That's perfectly normal to feel that way. How long have you been experiencing this?",
      "Your feelings are valid. How can I help you work through this?",
      "Thank you for sharing that with me. What kind of support are you looking for right now?",
      "I hear you, and I want you to know that you're not alone in this.",
      "Let's focus on what you can control. What small step would help you feel better?",
      "It takes courage to open up about these feelings. How can we make things more manageable for you?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Wellness Consultation</h2>
            <p className="text-sm text-gray-500">Chat with your personal wellness consultant</p>
          </div>
          <a
            href="#landing"
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </a>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'consultant' && (
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=30&h=30"
                      alt="Consultant"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  {message.sender === 'user' && <User className="w-5 w-5" />}
                  <span className="text-sm font-medium">
                    {message.sender === 'user' ? 'You' : 'Sarah'}
                  </span>
                </div>
                <p>{message.text}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 