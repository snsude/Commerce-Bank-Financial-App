import React, { useState } from "react";
import NavBar from './NavBar';

const Goals = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 

  const [newGoal, setNewGoal] = useState({ name: "", amount: "" });
  const [showAddGoal, setShowAddGoal] = useState(false);

  
  const [editGoalIndex, setEditGoalIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", total: "", current: "" });

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

  const totalSaved = goals.reduce((acc, goal) => acc + goal.current, 0);
  const totalGoalAmount = goals.reduce((acc, goal) => acc + goal.total, 0);
  const overallProgress = (totalSaved / totalGoalAmount) * 100;

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ backgroundColor: '#E0E0E0' }}>
      <NavBar />

      <div className="flex-1 w-full">
        <div className="p-8 h-screen flex flex-col relative">
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-[#333333]">Goals</h1>
              <button
                onClick={() => setShowAddGoal(true)}
                className="px-4 py-2 bg-[#89ce94] text-white rounded-lg hover:bg-[#7dc987] transition-colors"
              >
                + Create Goal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 flex-shrink-0">
              <div className="bg-white rounded-xl p-6 border-2 border-[#86a59c] shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Total Saved</p>
                <p className="text-3xl font-bold text-[#643173]">
                  ${totalSaved.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-[#86a59c] shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Total Goal Amount</p>
                <p className="text-3xl font-bold text-[#7d5ba6]">
                  ${totalGoalAmount.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-[#86a59c] shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Overall Progress</p>
                <p className="text-3xl font-bold text-[#89ce94]">
                  {overallProgress.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Goals List */}
            <div className="bg-white rounded-2xl border-2 border-[#86a59c] shadow-sm flex-1 flex flex-col overflow-hidden">
              <h2 className="text-xl font-semibold text-[#333333] p-8 pb-4 flex-shrink-0">
                Your Goals
              </h2>

              <div className="space-y-6 px-8 pb-8 overflow-y-auto flex-1">
                {goals.map((goal, index) => {
                  const percentage = (goal.current / goal.total) * 100;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#333333]">
                          {index + 1}. {goal.name}
                        </span>

                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span>
                            ${goal.current.toLocaleString()} out of ${goal.total.toLocaleString()}
                          </span>

                          {/* NEW: Edit Button */}
                          <button
                            onClick={() => {
                              setEditGoalIndex(index);
                              setEditData({
                                name: goal.name,
                                total: goal.total,
                                current: goal.current,
                              });
                            }}
                            className="px-3 py-1 bg-[#7d5ba6] text-white rounded-md hover:bg-[#6d4f96]"
                          >
                            Edit
                          </button>
                        </div>
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

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{percentage.toFixed(1)}% complete</span>
                        <span>${(goal.total - goal.current).toLocaleString()} remaining</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ADD GOAL */}
            {showAddGoal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                  <h2 className="text-2xl font-bold text-[#333333] mb-6">Add New Goal</h2>
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
                        className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg"
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
                        className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg"
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

            {/* EDIT GOAL MODAL */}
            {editGoalIndex !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                  <h2 className="text-2xl font-bold text-[#333333] mb-6">Edit Goal</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Goal Name</label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Target Amount</label>
                      <input
                        type="number"
                        value={editData.total}
                        onChange={(e) =>
                          setEditData({ ...editData, total: Number(e.target.value) })
                        }
                        className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Current Saved</label>
                      <input
                        type="number"
                        value={editData.current}
                        onChange={(e) =>
                          setEditData({ ...editData, current: Number(e.target.value) })
                        }
                        className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg"
                      />
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <button
                        onClick={() => setEditGoalIndex(null)}
                        className="flex-1 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => {
                          const updated = [...goals];
                          updated[editGoalIndex] = {
                            ...updated[editGoalIndex],
                            name: editData.name,
                            total: editData.total,
                            current: editData.current,
                          };
                          setGoals(updated);
                          setEditGoalIndex(null);
                        }}
                        className="flex-1 py-2 bg-[#7d5ba6] text-white rounded-lg hover:bg-[#6d4f96]"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="fixed bottom-4 right-4 text-xs text-gray-500">
            App is owned by Team Nova in partner with Commerce Bank
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
