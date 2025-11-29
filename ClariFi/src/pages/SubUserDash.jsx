import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlotlyBusiness from './PlotlyBusiness'; 

function SubUserDash() {
  const [isExpanded, setIsExpanded] = useState(false);
  const projectName = 'Project Alpha';
  
  const budget = {
    total: 100000,
    used: 67500
  };

  const incomeData = [
    { quarter: 'Q1', amount: 45000 },
    { quarter: 'Q2', amount: 52000 },
    { quarter: 'Q3', amount: 48000 },
    { quarter: 'Q4', amount: 61000 }
  ];

  const expenseData = [
    { quarter: 'Q1', amount: 32000 },
    { quarter: 'Q2', amount: 38000 },
    { quarter: 'Q3', amount: 35000 },
    { quarter: 'Q4', amount: 42000 }
  ];

  const recentIncome = [
    { id: 1, description: 'Client Payment - Acme Corp', date: '2024-11-10', amount: '$15,000' },
    { id: 2, description: 'Service Fee - Tech Industries', date: '2024-11-08', amount: '$8,500' },
    { id: 3, description: 'Consulting Revenue', date: '2024-11-05', amount: '$12,000' },
    { id: 4, description: 'Product Sales', date: '2024-11-01', amount: '$6,750' },
    { id: 5, description: 'License Renewal', date: '2024-10-28', amount: '$9,200' },
    { id: 6, description: 'Partnership Income', date: '2024-10-25', amount: '$11,500' }
  ];

  const recentExpenses = [
    { id: 1, description: 'Office Rent', date: '2024-11-12', amount: '$3,200' },
    { id: 2, description: 'Employee Salaries', date: '2024-11-10', amount: '$25,000' },
    { id: 3, description: 'Software Licenses', date: '2024-11-08', amount: '$1,450' },
    { id: 4, description: 'Marketing Campaign', date: '2024-11-05', amount: '$4,800' },
    { id: 5, description: 'Equipment Purchase', date: '2024-11-01', amount: '$7,600' },
    { id: 6, description: 'Travel Expenses', date: '2024-10-28', amount: '$2,300' }
  ];

  const budgetPercentage = (budget.used / budget.total) * 100;

  const cardShadow = {
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#E0E0E0' }}>
      
      {/* NAV BAR  */}
      <aside 
        className={`flex flex-col items-center text-white shadow h-screen transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        style={{backgroundColor: '#174D1F'}}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Profile */}
        <div className="h-16 flex items-center w-full justify-center px-4">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-gray-700 font-semibold flex-shrink-0"></div>
        </div>

        {/* Navigation */}
        <ul className="flex-1 w-full">
          <li className="hover:bg-purple-700">
            <Link to="/SubUserDash" className="h-16 px-6 flex items-center w-full focus:text-white">
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              {isExpanded && <span className="ml-4 text-sm font-medium whitespace-nowrap">Dashboard</span>}
            </Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="h-20 flex items-center justify-center w-full transition-all duration-500 ease-in-out">
          <img
            src={isExpanded ? "/ClariFi-Logo.png" : "/ClariFi-Logo-Small.png"}
            alt="Logo"
            className={`object-contain transition-all duration-100 ${
              isExpanded ? 'h-10 w-auto' : 'h-14 w-14'
            }`}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' }}
          />
        </div>

        {/* Settings */}
        <div className="h-16 flex items-center w-full border-t border-purple-400">
          <Link to="/SubUserSettings" className="h-16 w-full px-6 flex items-center hover:bg-purple-700 focus:outline-none focus:text-white">
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            {isExpanded && <span className="ml-4 text-sm font-medium whitespace-nowrap">Settings</span>}
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
        
        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#7D5BA6', fontFamily: 'Carme, sans-serif' }}>
            Dashboard - {projectName}
          </h1>
        </div>

        {/* Budget Section */}
        <div
          style={{ 
            borderRadius: '12px', 
            border: '4px solid #89CE94', 
            backgroundColor: 'white', 
            overflow: 'hidden',
            height: '180px',
            ...cardShadow 
          }}
        >
          <div style={{ backgroundColor: '#7D5BA6', color: 'white', fontSize: '26px', textAlign: 'center', padding: '10px 0', fontFamily: 'Carme, sans-serif' }}>
            Budget
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px', fontWeight: '600' }}>Total Budget Usage</span>
              <span style={{ fontSize: '20px' }}>${budget.used.toLocaleString()} / ${budget.total.toLocaleString()}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '32px' }}>
              <div 
                style={{ 
                  height: '32px', 
                  borderRadius: '9999px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white', 
                  fontWeight: '600',
                  width: `${budgetPercentage}%`, 
                  backgroundColor: '#7D5BA6' 
                }}
              >
                {budgetPercentage.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Income + Expenses section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', height: 'calc(100vh - 370px)' }}>
          
          {/* INCOME CARD */}
          <div
            style={{
              borderRadius: '12px',
              border: '4px solid #89CE94',
              backgroundColor: 'white',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              ...cardShadow
            }}
          >
            <div style={{ backgroundColor: '#7D5BA6', color: 'white', fontSize: '26px', textAlign: 'center', padding: '10px 0', fontFamily: 'Carme, sans-serif' }}>
              Income
            </div>

            {/* --- Plotly Graph --- */}
            <div style={{ padding: '16px' }}>
              <PlotlyBusiness data={incomeData} color="#89CE94" type="income" />
            </div>

            {/* Recent income table */}
            <div style={{ borderTop: '1px solid #e5e7eb', flex: 1, overflowY: 'auto', padding: '0 16px 16px 16px' }}>
              <h3 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '12px', paddingTop: '16px', position: 'sticky', top: 0, backgroundColor: 'white' }}>Recent Income</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: '48px', backgroundColor: 'white' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px' }}>Description</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px' }}>Date</th>
                    <th style={{ textAlign: 'right', padding: '8px', fontSize: '14px' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIncome.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '8px', fontSize: '14px' }}>{item.description}</td>
                      <td style={{ padding: '8px', fontSize: '14px' }}>{item.date}</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#89CE94' }}>
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EXPENSE CARD */}
          <div
            style={{
              borderRadius: '12px',
              border: '4px solid #89CE94',
              backgroundColor: 'white',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              ...cardShadow
            }}
          >
            <div style={{ backgroundColor: '#7D5BA6', color: 'white', fontSize: '26px', textAlign: 'center', padding: '10px 0', fontFamily: 'Carme, sans-serif' }}>
              Expenses
            </div>

            {/* --- Plotly Graph --- */}
            <div style={{ padding: '16px' }}>
              <PlotlyBusiness data={expenseData} color="#FFA8C3" type="expenses" />
            </div>

            {/* Recent expenses table */}
            <div style={{ borderTop: '1px solid #e5e7eb', flex: 1, overflowY: 'auto', padding: '0 16px 16px 16px' }}>
              <h3 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '12px', paddingTop: '16px', position: 'sticky', top: 0, backgroundColor: 'white' }}>Recent Expenses</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: '48px', backgroundColor: 'white' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px' }}>Description</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px' }}>Date</th>
                    <th style={{ textAlign: 'right', padding: '8px', fontSize: '14px' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExpenses.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '8px', fontSize: '14px' }}>{item.description}</td>
                      <td style={{ padding: '8px', fontSize: '14px' }}>{item.date}</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#FFA8C3' }}>
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="fixed bottom-4 right-4 text-xs text-gray-500">
            App is owned by Team Nova in partner with Commerce Bank
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubUserDash;
