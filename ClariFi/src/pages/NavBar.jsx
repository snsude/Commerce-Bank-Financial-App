import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside 
      className={`flex flex-col items-center text-white shadow h-screen transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      style={{backgroundColor: '#174D1F'}}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Profile Circle */}
      <div className="h-16 flex items-center w-full justify-center px-4">
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-gray-700 font-semibold flex-shrink-0">
          
        </div>
      </div>

      {/* Navigation */}
      <ul className="flex-1 w-full">
        {/* Dashboard */}
        <li className="hover:bg-purple-700">
          <Link to="/Dashboard" className="h-16 px-6 flex items-center w-full focus:text-white">
        
            <svg
              className="h-5 w-5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            {isExpanded && (
              <span className="ml-4 text-sm font-medium whitespace-nowrap">Dashboard</span>
            )}
          </Link>
        </li>
        {/* Chat Assistant */}
        <li className="hover:bg-purple-700">
          <Link to="/Chatbot" className="h-16 px-6 flex items-center w-full focus:text-white">
            <svg
              className="h-5 w-5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {isExpanded && (
              <span className="ml-4 text-sm font-medium whitespace-nowrap">Chat Assistant</span>
            )}
          </Link>
        </li>

        {/* Goals */}
        <li className="hover:bg-purple-700">
          <Link to="/Goals" className="h-16 px-6 flex items-center w-full focus:text-white">
            <svg
              className="h-5 w-5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {isExpanded && (
              <span className="ml-4 text-sm font-medium whitespace-nowrap">Goals</span>
            )}
          </Link>
        </li>
      </ul>

      {/* Logo Section */}
      <div
        className="h-20 flex items-center justify-center w-full transition-all duration-500 ease-in-out"
      >
      <img
        src={isExpanded ? "/ClariFi-Logo.png" : "/ClariFi-Logo-Small.png"} // adjust file paths
        alt="Logo"
        className={`object-contain transition-all duration-100 ${
          isExpanded ? 'h-10 w-auto' : 'h-14 w-14'
        }`}
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' // soft modern shadow
        }}
      />
      </div>

        {/* Settings */}
        <div className="h-16 flex items-center w-full border-t border-purple-400">
          <button className="h-16 w-full px-6 flex items-center hover:bg-purple-700 focus:outline-none focus:text-white">
            <svg
              className="h-5 w-5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            {isExpanded && (
              <span className="ml-4 text-sm font-medium whitespace-nowrap">Settings</span>
            )}
          </button>
        </div> 
    </aside>
  );
}