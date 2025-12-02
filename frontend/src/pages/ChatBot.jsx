import React, { useState } from 'react';
import { Send } from 'lucide-react';
import NavBar from './NavBar';

const ChatBot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [activeChat, setActiveChat] = useState(0);

  const chatHistory = [
    { 
      id: 0, 
      title: 'Current Chat', 
      date: '2024-11-09',
      messages: [
        { type: 'bot', text: 'What Can I Assist You With?' }
      ]
    },
    { 
      id: 1, 
      title: 'Budget Planning Help', 
      date: '2024-11-08',
      messages: [
        { type: 'bot', text: 'What Can I Assist You With?' },
        { type: 'user', text: 'I need help creating a monthly budget' },
        { type: 'bot', text: 'I can help you with that! Let\'s start by listing your monthly income and expenses.' }
      ]
    },
    { 
      id: 2, 
      title: 'Savings Goal Setup', 
      date: '2024-11-07',
      messages: [
        { type: 'bot', text: 'What Can I Assist You With?' },
        { type: 'user', text: 'How do I set up a savings goal?' },
        { type: 'bot', text: 'Great question! You can set up savings goals in the Goals section. What are you saving for?' },
        { type: 'user', text: 'I want to save for a vacation' },
        { type: 'bot', text: 'Perfect! I recommend setting a target amount and timeline. How much do you want to save?' }
      ]
    },
    { 
      id: 3, 
      title: 'Expense Categories', 
      date: '2024-11-06',
      messages: [
        { type: 'bot', text: 'What Can I Assist You With?' },
        { type: 'user', text: 'Can you explain the expense categories?' },
        { type: 'bot', text: 'Of course! We categorize expenses into Food, Transport, Entertainment, Utilities, and Other to help you track spending patterns.' }
      ]
    },
    { 
      id: 4, 
      title: 'Investment Advice', 
      date: '2024-11-05',
      messages: [
        { type: 'bot', text: 'What Can I Assist You With?' },
        { type: 'user', text: 'Should I start investing?' },
        { type: 'bot', text: 'Investing can be a great way to grow your wealth! It depends on your financial situation. Do you have an emergency fund set up?' },
        { type: 'user', text: 'Yes, I have 3 months saved' },
        { type: 'bot', text: 'That\'s excellent! With an emergency fund in place, you might consider starting with low-risk investments. Would you like to learn more?' }
      ]
    },
    { 
      id: 5, 
      title: 'Monthly Report', 
      date: '2024-11-04',
      messages: [
        { type: 'bot', text: 'What Can I Assist You With?' },
        { type: 'user', text: 'Can I see my monthly spending report?' },
        { type: 'bot', text: 'Your monthly report shows you spent $1,200 total. Your biggest category was Food at $450, followed by Utilities at $300.' }
      ]
    }
  ];

  const [chats, setChats] = useState(chatHistory);

  const handleSend = () => {
    if (inputText.trim()) {
      const updatedChats = [...chats];
      updatedChats[activeChat].messages.push({ type: 'user', text: inputText });
      setChats(updatedChats);
      setInputText('');
      
      setTimeout(() => {
        const newChats = [...updatedChats];
        newChats[activeChat].messages.push({ 
          type: 'bot', 
          text: 'I can help you with budgeting, savings goals, and financial planning!' 
        });
        setChats(newChats);
      }, 1000);
    }
  };

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#E0E0E0' }}>
      <NavBar />
      
      {/* Chat History Sidebar */}
      <div className="w-64 bg-gray-200 border-r-4" style={{ borderColor: '#89CE94' }}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#7D5BA6' }}>Chat History</h3>
          <div className="space-y-2">
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => handleChatSelect(chat.id)}
                className={`p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 border-2 ${activeChat === chat.id ? 'ring-2 ring-[#7D5BA6]' : ''}`}
                style={{ borderColor: '#89CE94' }}
              >
                <p className="font-medium text-sm text-gray-800">{chat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{chat.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chatbot Title */}
        <div className="px-8 py-4">
          <h5 className="text-2xl text-gray-600 font-medium">Chatbot</h5>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {chats[activeChat].messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'bot' && (
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-16 h-16 bg-[#7d5ba6] rounded-full flex items-center justify-center">
                      <div className="text-white text-3xl">🤖</div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Clarifi Assistant</span>
                  </div>
                )}
                <div className={`max-w-md p-4 rounded-2xl ${
                  message.type === 'bot' 
                    ? 'bg-white border-2 border-[#7d5ba6]' 
                    : 'bg-[#86a59c] text-white'
                }`}>
                  <p className={message.type === 'bot' ? 'text-[#333333]' : 'text-white'}>
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-8 py-6">
          <div className="max-w-3xl mx-auto flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message here..."
              className="flex-1 px-6 py-3 border-2 border-[#86a59c] rounded-full focus:outline-none focus:border-[#7d5ba6] text-[#333333]"
            />
            <button
              onClick={handleSend}
              className="w-12 h-12 bg-[#89ce94] rounded-full flex items-center justify-center hover:bg-[#7dc987] transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            This service is for general information only and not financial advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;