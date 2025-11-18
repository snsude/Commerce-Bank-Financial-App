import { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar'; 

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
    { name: 'Food', value: 450, color: '#A28BC0' },
    { name: 'Transport', value: 200, color: '#9FD6A7' },
    { name: 'Entertainment', value: 150, color: '#FFD588' },
    { name: 'Utilities', value: 300, color: '#FFA8C3' },
    { name: 'Other', value: 100, color: '#8DC8F1' }
  ];

  const goals = [
    { name: 'Emergency Fund', current: 3500, target: 5000 },
    { name: 'Vacation', current: 800, target: 2000 },
    { name: 'New Laptop', current: 650, target: 1500 }
  ];

  // chat orientation
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);


  const goalHeaderColor = '#B3E4B8';
  const goalContentColor = '#DFF4E1';

 
  const cardShadow = {
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ backgroundColor: '#E0E0E0' }}>
      <NavBar />
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6 p-6">

        {/*RECENT PURCHASES*/}
        <div
          className="rounded-xl border-4 bg-white overflow-hidden"
          style={{ borderColor: '#89CE94', ...cardShadow }}
        >
          <div style={{ backgroundColor: '#7D5BA6', color: 'white', fontSize: '26px', textAlign: 'center', padding: '10px 0', fontFamily: 'Carme, sans-serif' }}>
            Recent Purchases
          </div>
          <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 60px)' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Item</th>
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-right py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map(p => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{p.item}</td>
                    <td className="py-3 px-4">{p.date}</td>
                    <td className="py-3 px-4 text-right">{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*EXPENSE CATEGORIES*/}
        <div
          className="rounded-xl border-4 bg-white overflow-hidden"
          style={{ borderColor: '#89CE94', ...cardShadow }}
        >
          <div style={{ backgroundColor: '#7D5BA6', color: 'white', fontSize: '26px', textAlign: 'center', padding: '10px 0', fontFamily: 'Carme, sans-serif' }}>
            Expense Categories
          </div>

          <div className="flex h-full" style={{ height: 'calc(100% - 60px)' }}>
            {/* Left side: Category list */}
            <div className="w-1/2 p-6 space-y-2 flex flex-col justify-center">
              {expenseCategories.map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div style={{ width: 16, height: 16, backgroundColor: cat.color, borderRadius: 4 }}></div>
                    <span>{cat.name}</span>
                  </div>
                  <span className="font-semibold">${cat.value}</span>
                </div>
              ))}
            </div>

            {/* Right side: Pie chart */}
            <div className="w-1/2 flex justify-center items-center">
              <svg width="180" height="180" viewBox="0 0 200 200">
                {(() => {
                  const total = expenseCategories.reduce((sum, cat) => sum + cat.value, 0);
                  let currentAngle = 0;
                  return expenseCategories.map((cat, i) => {
                    const angle = (cat.value / total) * 360;
                    const start = currentAngle;
                    currentAngle += angle;
                    const startRad = (start - 90) * (Math.PI / 180);
                    const endRad = (currentAngle - 90) * (Math.PI / 180);
                    const x1 = 100 + 80 * Math.cos(startRad);
                    const y1 = 100 + 80 * Math.sin(startRad);
                    const x2 = 100 + 80 * Math.cos(endRad);
                    const y2 = 100 + 80 * Math.sin(endRad);
                    const largeArc = angle > 180 ? 1 : 0;
                    return (
                      <path
                        key={i}
                        d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={cat.color}
                        stroke="#fff"
                        strokeWidth="2"
                      />
                    );
                  });
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/*GOALS*/}
        <div
          className="rounded-xl border-4 overflow-hidden"
          style={{ borderColor: '#89CE94', ...cardShadow }}
        >
          <div style={{ backgroundColor: goalHeaderColor, color: '#333', fontSize: '26px', textAlign: 'center', padding: '10px 0', fontFamily: 'Carme, sans-serif' }}>
            Goals
          </div>
          <div className="p-6 space-y-6 overflow-hidden" style={{ backgroundColor: goalContentColor, height: 'calc(100% - 60px)' }}>
            {goals.map((goal, i) => {
              const percentage = (goal.current / goal.target) * 100;
              return (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{goal.name}</span>
                    <span>${goal.current} / ${goal.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="h-4 rounded-full" style={{ width: `${percentage}%`, backgroundColor: '#7D5BA6' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/*CHAT ASSISTANT*/}
        <div
          className="rounded-xl border-4 bg-white overflow-hidden flex flex-col"
          style={{ borderColor: '#89CE94', ...cardShadow }}
        >
          <div style={{ backgroundColor: '#7D5BA6', color: 'white', fontSize: '26px', textAlign: 'center', padding: '10px 0', fontFamily: 'Carme, sans-serif' }}>
            Chat Assistant
          </div>
          <div className="flex flex-col flex-1" style={{ height: 'calc(100% - 60px)' }}>
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
            >
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className="px-4 py-2 rounded-lg max-w-[80%]" style={{ backgroundColor: msg.isBot ? '#89CE94' : '#7D5BA6', color: 'white' }}>
                    {msg.isBot ? <>🤖 {msg.text}</> : msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#89CE94' }}
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
                className="px-6 py-2 rounded-lg text-white"
                style={{ backgroundColor: '#7D5BA6' }}
              >
                Send
              </button>
            </div>
            <div className="fixed bottom-4 right-4 text-xs text-gray-500">
            App is owned by Team Nova in partner with Commerce Bank
          </div>
          </div>
        </div>

      </div>
    </div>
  );
}
