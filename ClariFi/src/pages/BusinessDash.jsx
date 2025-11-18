import React, { useState } from 'react';
import NavBar from './NavBar'

function BusinessDash() {
  const [selectedProject, setSelectedProject] = useState('Project Alpha');
  
  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta'];
  
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

  // Helper function to draw bar chart
  const renderBarChart = (data, color) => {
    const maxValue = Math.max(...data.map(d => d.amount));
    const chartHeight = 200;
    const padding = 40;
    const bottomSpace = 50;
    
    return (
      <svg width="100%" height={chartHeight + bottomSpace} style={{ display: 'block' }} viewBox={`0 0 400 ${chartHeight + bottomSpace}`} preserveAspectRatio="xMidYMid meet">
        {data.map((item, i) => {
          const barWidth = 60;
          const totalWidth = 400 - (padding * 2);
          const spacing = totalWidth / data.length;
          const barHeight = (item.amount / maxValue) * chartHeight;
          const x = padding + (i * spacing) + (spacing - barWidth) / 2;
          const y = chartHeight - barHeight + 20;
          
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx={6}
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight + 40}
                textAnchor="middle"
                fontSize="16"
                fontWeight="600"
                fill="#333"
              >
                {item.quarter}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#555"
              >
                ${(item.amount / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#E0E0E0' }}>
      <NavBar />
      

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
        
        {/* Project Selector */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '8px', 
              border: '2px solid #89CE94', 
              fontSize: '18px',
              backgroundColor: 'white',
              outline: 'none'
            }}
          >
            {projects.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
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

        {/* Income and Expenses Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', height: 'calc(100vh - 330px)' }}>
          
          {/* Income */}
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
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                {renderBarChart(incomeData, '#89CE94')}
              </div>
            </div>
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

          {/* Expenses */}
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
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                {renderBarChart(expenseData, '#FFA8C3')}
              </div>
            </div>
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

export default BusinessDash;