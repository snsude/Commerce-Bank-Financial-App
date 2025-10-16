import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatBot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'What Can I Assist You With?' }
  ]);
  const [inputText, setInputText] = useState('');

  // Sidebar navigation items
  const navItems = [
    { name: 'Dashboard', active: false, path: '/dashboard' },
    { name: 'Goals', active: false, path: '/goals' },
    { name: 'ChatBot', active: true, path: '/chatbot' },
    { name: 'Documents', active: false, path: '/documents' },
    { name: 'Settings', active: false, path: '/settings' },
  ];

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { type: 'user', text: inputText }]);
      setInputText('');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: 'I can help you with budgeting, savings goals, and financial planning!' 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'ml-0' : 'ml-[-100%]'} fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]`}>
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" className="w-32" alt="tailus logo" />
            </a>
          </div>

          <div className="mt-8 text-center">
            <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp" alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Cynthia J. Watts</h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.path} 
                  className={`px-4 py-3 flex items-center space-x-4 rounded-xl ${
                    item.active 
                      ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' 
                      : 'text-gray-600 hover:text-gray-700'
                  }`}
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] w-full">
        {/* Header */}
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 className="hidden text-2xl text-gray-600 font-medium lg:block">ChatBot</h5>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-12 h-16 -mr-2 border-r lg:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, index) => (
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
          <div className="bg-white px-8 py-6 border-t">
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
    </div>
  );
};

export default ChatBot;