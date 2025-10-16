import React, { useState } from "react";
import {
  Home,
  Target,
  MessageSquare,
  FileText,
  Settings,
  Clock,
} from "lucide-react";

const Goals = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [goals, setGoals] = useState([
    { name: "New Car", total: 3200, current: 1600, color: "#643173" },
    { name: "House - Down Pmt", total: 15000, current: 1600, color: "#7d5ba6" },
    { name: "New Phone", total: 500, current: 475, color: "#86a59c" },
  ]);

  const [newGoal, setNewGoal] = useState({ name: "", amount: "" });
  const [showAddGoal, setShowAddGoal] = useState(false);

  // Sidebar navigation items
  const navItems = [
    { name: "Dashboard", active: false, path: "/dashboard" },
    { name: "Goals", active: true, path: "/goals" },
    { name: "ChatBot", active: false, path: "/chatbot" },
    { name: "Documents", active: false, path: "/documents" },
    { name: "Settings", active: false, path: "/settings" },
  ];

  const addNewGoal = () => {
    if (newGoal.name && newGoal.amount) {
      setGoals([
        ...goals,
        {
          name: newGoal.name,
          total: parseFloat(newGoal.amount),
          current: 0,
          color: "#89ce94",
        },
      ]);
      setNewGoal({ name: "", amount: "" });
      setShowAddGoal(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "ml-0" : "ml-[-100%]"
        } fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]`}
      >
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <img
                src="/ClariFi-Mini Logo.png"
                className="h-13 w-13"
                alt="ClariFi Logo"
              />
            </a>
          </div>

          <div className="mt-8 text-center">
            <img
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              Cynthia J. Watts
            </h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className={`px-4 py-3 flex items-center space-x-4 rounded-xl ${
                    item.active
                      ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                      : "text-gray-600 hover:text-gray-700"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
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
            <h5 className="hidden text-2xl text-gray-600 font-medium lg:block">
              Goals
            </h5>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-12 h-16 -mr-2 border-r lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Goals Content */}
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-[#333333]">Goals</h1>
              <button
                onClick={() => setShowAddGoal(true)}
                className="px-4 py-2 bg-[#89ce94] text-white rounded-lg hover:bg-[#7dc987] transition-colors"
              >
                + Create Goal
              </button>
            </div>

            {/* Goals List */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#86a59c] shadow-sm">
              <h2 className="text-xl font-semibold text-[#333333] mb-6">
                Your Goals
              </h2>

              <div className="space-y-6">
                {goals.map((goal, index) => {
                  const percentage = (goal.current / goal.total) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#333333]">
                          {index + 1}. {goal.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          ${goal.current.toLocaleString()} out of $
                          {goal.total.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: goal.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Goal Modal */}
            {showAddGoal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                  <h2 className="text-2xl font-bold text-[#333333] mb-6">
                    Add New Goal
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Goal Name
                      </label>
                      <input
                        type="text"
                        value={newGoal.name}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg focus:outline-none focus:border-[#7d5ba6]"
                        placeholder="e.g., Vacation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Target Amount
                      </label>
                      <input
                        type="number"
                        value={newGoal.amount}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, amount: e.target.value })
                        }
                        className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg focus:outline-none focus:border-[#7d5ba6]"
                        placeholder="$0"
                      />
                    </div>
                    <div className="flex space-x-3 mt-6">
                      <button
                        onClick={() => setShowAddGoal(false)}
                        className="flex-1 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addNewGoal}
                        className="flex-1 py-2 bg-[#89ce94] text-white rounded-lg hover:bg-[#7dc987]"
                      >
                        Add Goal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
