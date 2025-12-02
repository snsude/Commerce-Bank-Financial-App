import { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar'; 
import PlotlyPersonal from './PlotlyPersonal';

export default function Dashboard() {
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi! I'm your financial assistant. How can I help you today?", isBot: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatContainerRef = useRef(null);

  const recentPurchases = [
    { id: 1, item: 'Laptop', date: '2024-11-01', amount: '$1,299.99' },
    { id: 2, item: 'Wireless Mouse', date: '2024-11-02', amount: '$29.99' },
    { id: 3, item: 'USB-C Cable', date: '2024-11-03', amount: '$15.99' },
    { id: 4, item: 'Headphones', date: '2024-10-28', amount: '$89.99' },
    { id: 5, item: 'Desk Lamp', date: '2024-10-25', amount: '$45.50' },
    { id: 6, item: 'Coffee Subscription', date: '2024-10-22', amount: '$24.99' },
  ];

  const expenseCategories = [
    { name: 'Food', value: 450, color: '#8B6FB0' },
    { name: 'Transport', value: 200, color: '#6BB577' },
    { name: 'Entertainment', value: 150, color: '#F5C563' },
    { name: 'Utilities', value: 300, color: '#E67E9F' },
    { name: 'Other', value: 100, color: '#5DADE2' }
  ];

  const goals = [
    { name: 'Emergency Fund', current: 3500, target: 5000, color: '#7D5BA6' },
    { name: 'Vacation', current: 800, target: 2000, color: '#5CB85C' },
    { name: 'New Laptop', current: 650, target: 1500, color: '#E67E9F' }
  ];

  // chat orientation
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const cardShadow = {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  const headerShadow = {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.12)'
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ backgroundColor: '#E8E8E8' }}>
      <NavBar />
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6 p-6">

        {/*RECENT PURCHASES*/}
        <div
          className="rounded-xl border-4 bg-white overflow-hidden"
          style={{ borderColor: '#6BB577', ...cardShadow }}
        >
          <div style={{ 
            backgroundColor: '#7D5BA6', 
            color: 'white', 
            fontSize: '26px', 
            textAlign: 'center', 
            padding: '10px 0', 
            fontFamily: 'Carme, sans-serif',
            fontWeight: '500',
            ...headerShadow
          }}>
            Recent Purchases
          </div>
          <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 60px)' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#E5E5E5' }}>
                  <th className="text-left py-2 px-4 font-semibold text-gray-600">Item</th>
                  <th className="text-left py-2 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-right py-2 px-4 font-semibold text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map(p => (
                  <tr key={p.id} className="border-b" style={{ borderColor: '#F5F5F5' }}>
                    <td className="py-3 px-4 text-gray-800">{p.item}</td>
                    <td className="py-3 px-4 text-gray-600">{p.date}</td>
                    <td className="py-3 px-4 text-right font-semibold" style={{ color: '#7D5BA6' }}>{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*EXPENSE CATEGORIES*/}
        <div
          className="rounded-xl border-4 bg-white overflow-hidden"
          style={{ borderColor: '#6BB577', ...cardShadow }}
        >
          <div style={{ 
            backgroundColor: '#7D5BA6', 
            color: 'white', 
            fontSize: '26px', 
            textAlign: 'center', 
            padding: '10px 0', 
            fontFamily: 'Carme, sans-serif',
            fontWeight: '500',
            ...headerShadow
          }}>
            Expense Categories
          </div>

          <div className="flex h-full" style={{ height: 'calc(100% - 60px)' }}>
            {/* Left side: Category list */}
            <div className="w-1/2 p-6 space-y-3 flex flex-col justify-center">
              {expenseCategories.map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div style={{ 
                      width: 20, 
                      height: 20, 
                      backgroundColor: cat.color, 
                      borderRadius: 6,
                      boxShadow: `0 2px 4px ${cat.color}40`
                    }}></div>
                    <span className="font-medium text-gray-800">{cat.name}</span>
                  </div>
                  <span className="font-semibold text-gray-700">${cat.value}</span>
                </div>
              ))}
            </div>

            {/* Right side: Pie chart */}
            <div className="w-1/2 flex justify-center items-center">  
              <PlotlyPersonal data={expenseCategories} />
            </div>
          </div>
        </div>

        {/*GOALS*/}
        <div
          className="rounded-xl border-4 overflow-hidden"
          style={{ borderColor: '#6BB577', ...cardShadow }}
        >
          <div style={{ 
            background: 'linear-gradient(135deg, #8FD8A3 0%, #A8E2B8 100%)',
            color: '#2C5F3B', 
            fontSize: '26px', 
            textAlign: 'center', 
            padding: '10px 0', 
            fontFamily: 'Carme, sans-serif',
            fontWeight: '600',
            ...headerShadow
          }}>
            Goals
          </div>
          <div className="p-6 space-y-6 overflow-hidden" style={{ 
            background: 'linear-gradient(180deg, #E8F5EA 0%, #F0F9F1 100%)',
            height: 'calc(100% - 60px)' 
          }}>
            {goals.map((goal, i) => {
              const percentage = (goal.current / goal.target) * 100;
              return (
                <div key={i} className="bg-white rounded-lg p-4" style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-gray-800">{goal.name}</span>
                    <span className="font-medium text-gray-600">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-5" style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.08)' }}>
                    <div 
                      className="h-5 rounded-full flex items-center justify-end pr-2 text-white text-xs font-semibold" 
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: goal.color,
                        boxShadow: `0 2px 4px ${goal.color}60`,
                        minWidth: percentage > 0 ? '30px' : '0'
                      }}
                    >
                      {percentage > 15 && `${percentage.toFixed(0)}%`}
                    </div>
                  </div>
                  {percentage <= 15 && (
                    <div className="text-right text-xs text-gray-600 mt-1">{percentage.toFixed(0)}%</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/*CHAT ASSISTANT*/}
        <div
          className="rounded-xl border-4 bg-white overflow-hidden flex flex-col"
          style={{ borderColor: '#6BB577', ...cardShadow }}
        >
          <div style={{ 
            backgroundColor: '#7D5BA6', 
            color: 'white', 
            fontSize: '26px', 
            textAlign: 'center', 
            padding: '10px 0', 
            fontFamily: 'Carme, sans-serif',
            fontWeight: '500',
            ...headerShadow
          }}>
            Chat Assistant
          </div>
          <div className="flex flex-col flex-1" style={{ height: 'calc(100% - 60px)' }}>
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)' }}
            >
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className="px-4 py-2 rounded-lg max-w-[80%]" 
                    style={{ 
                      backgroundColor: msg.isBot ? '#6BB577' : '#7D5BA6', 
                      color: 'white',
                      boxShadow: msg.isBot 
                        ? '0 2px 6px rgba(107, 181, 119, 0.3)' 
                        : '0 2px 6px rgba(125, 91, 166, 0.3)'
                    }}
                  >
                    {msg.isBot ? <>🤖 {msg.text}</> : msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t-2 flex gap-2" style={{ borderColor: '#E5E5E5', backgroundColor: 'white' }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#6BB577',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chatInput.trim()) {
                    setChatMessages(prev => [...prev, { text: chatInput, isBot: false }]);
                    setChatInput('');
                    setTimeout(() => {
                      setChatMessages(prev => [...prev, { text: "I'm here to help with your finances!", isBot: true }]);
                    }, 500);
                  }
                }}
              />
              <button
                onClick={() => {
                  if (chatInput.trim()) {
                    setChatMessages(prev => [...prev, { text: chatInput, isBot: false }]);
                    setChatInput('');
                    setTimeout(() => {
                      setChatMessages(prev => [...prev, { text: "I'm here to help with your finances!", isBot: true }]);
                    }, 500);
                  }
                }}
                className="px-6 py-2 rounded-lg text-white font-medium transition-colors"
                style={{ 
                  backgroundColor: '#7D5BA6',
                  boxShadow: '0 2px 6px rgba(125, 91, 166, 0.3)'
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>

      </div>
      <div style={{ 
        position: 'fixed', 
        bottom: '16px', 
        right: '16px', 
        fontSize: '11px', 
        color: '#888',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '6px 10px',
        borderRadius: '6px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)'
      }}>
        App is owned by Team Nova in partner with Commerce Bank
      </div>
    </div>
  );
}