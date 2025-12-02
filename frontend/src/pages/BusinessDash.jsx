import React from 'react';
import NavBar from './NavBar';
import PlotlyBusiness from './PlotlyBusiness';

function BusinessDash() {
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
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  };

  const headerShadow = {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.12)'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#E8E8E8' }}>
      <NavBar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>

        {/* Budget Section */}
        <div
          style={{ 
            borderRadius: '12px', 
            border: '3px solid #6BB577', 
            backgroundColor: 'white', 
            overflow: 'hidden',
            height: '180px',
            ...cardShadow 
          }}
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
            Budget
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px', fontWeight: '600', color: '#333' }}>Total Budget Usage</span>
              <span style={{ fontSize: '20px', fontWeight: '500', color: '#555' }}>${budget.used.toLocaleString()} / ${budget.total.toLocaleString()}</span>
            </div>
            <div style={{ 
              width: '100%', 
              backgroundColor: '#F0F0F0', 
              borderRadius: '9999px', 
              height: '32px',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <div 
                style={{ 
                  height: '32px', 
                  borderRadius: '9999px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white', 
                  fontWeight: '600',
                  fontSize: '15px',
                  width: `${budgetPercentage}%`, 
                  backgroundColor: '#7D5BA6',
                  boxShadow: '0 2px 6px rgba(125, 91, 166, 0.4)'
                }}
              >
                {budgetPercentage.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Income and Expenses Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', height: 'calc(100vh - 280px)' }}>
          
          {/* Income */}
          <div
            style={{ 
              borderRadius: '12px', 
              border: '3px solid #6BB577', 
              backgroundColor: 'white', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              ...cardShadow 
            }}
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
              Income
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <PlotlyBusiness data={incomeData} color="#5CB85C" type="income" />
              </div>
            </div>
            <div style={{ borderTop: '1px solid #E5E5E5', flex: 1, overflowY: 'auto', padding: '0 16px 16px 16px' }}>
              <h3 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '12px', paddingTop: '16px', position: 'sticky', top: 0, backgroundColor: 'white', color: '#333' }}>Recent Income</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: '48px', backgroundColor: 'white' }}>
                  <tr style={{ borderBottom: '1px solid #E5E5E5' }}>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Description</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Date</th>
                    <th style={{ textAlign: 'right', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIncome.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                      <td style={{ padding: '8px', fontSize: '14px', color: '#333' }}>{item.description}</td>
                      <td style={{ padding: '8px', fontSize: '14px', color: '#666' }}>{item.date}</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#5CB85C' }}>
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
              border: '3px solid #6BB577', 
              backgroundColor: 'white', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              ...cardShadow 
            }}
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
              Expenses
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <PlotlyBusiness data={expenseData} color="#E67E9F" type="expense" />
              </div>
            </div>
            <div style={{ borderTop: '1px solid #E5E5E5', flex: 1, overflowY: 'auto', padding: '0 16px 16px 16px' }}>
              <h3 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '12px', paddingTop: '16px', position: 'sticky', top: 0, backgroundColor: 'white', color: '#333' }}>Recent Expenses</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: '48px', backgroundColor: 'white' }}>
                  <tr style={{ borderBottom: '1px solid #E5E5E5' }}>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Description</th>
                    <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Date</th>
                    <th style={{ textAlign: 'right', padding: '8px', fontSize: '14px', fontWeight: '600', color: '#666' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExpenses.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                      <td style={{ padding: '8px', fontSize: '14px', color: '#333' }}>{item.description}</td>
                      <td style={{ padding: '8px', fontSize: '14px', color: '#666' }}>{item.date}</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#E67E9F' }}>
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
    </div>
  );
}

export default BusinessDash;