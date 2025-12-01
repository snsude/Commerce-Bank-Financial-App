import { useState } from 'react';
import NavBar from './NavBar';

export default function SettingsPageBusiness() {
  const [activeTab, setActiveTab] = useState('edit-profile');
  const [businessName, setBusinessName] = useState('Acme Corporation');
  const [username, setUsername] = useState('Test User');
  const [email, setEmail] = useState('testuser@example.com');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navItems = [
    { id: 'edit-profile', label: 'Edit Profile' },
    { id: 'change-password', label: 'Change Password' },
    { id: 'delete-chats', label: 'Delete Chats' }
  ];

  const handleSaveProfile = () => {
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 9;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    
    return hasMinLength && hasNumber && hasSpecialChar && hasNoSpaces;
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage('Please fill in all password fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage('Password does not meet requirements');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setMessage('Password changed successfully!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteChats = () => {
    if (window.confirm('Are you sure you want to delete all chats? This action cannot be undone.')) {
      setMessage('All chats have been deleted');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Get user initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ backgroundColor: '#E0E0E0' }}>
      {/* Sidebar */}
      <NavBar />
      
      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Settings Content */}
        <div className="p-8 h-screen flex flex-col relative">
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
              <h1 className="text-3xl font-bold text-[#333333]">Settings</h1>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div className="mb-4 p-4 bg-[#89ce94] text-white rounded-lg">
                {message}
              </div>
            )}

            {/* Settings Container */}
            <div className="bg-white rounded-2xl border-2 border-[#86a59c] shadow-sm flex-1 flex overflow-hidden">
              <div className="flex w-full">
                {/* Left Side - Menu + Content */}
                <div className="flex-1 flex border-r border-gray-200">
                  {/* Navigation Menu */}
                  <nav className="w-64 border-r border-gray-200 p-6 flex-shrink-0 overflow-y-auto">
                    <div className="space-y-1">
                      {navItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === item.id
                              ? 'bg-[#7d5ba6] text-white'
                              : 'text-[#333333] hover:bg-gray-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </nav>

                  {/* Content Area */}
                  <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-2xl">
                      {/* Edit Profile */}
                      {activeTab === 'edit-profile' && (
                        <div>
                          <h2 className="text-2xl font-bold text-[#333333] mb-2">Edit Profile</h2>
                          <p className="text-gray-600 mb-6">Update your profile information</p>
                          
                          <div className="space-y-6">
                            <div>
                              <label className="text-sm font-medium text-[#333333] mb-2 block">Business Name</label>
                              <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg focus:outline-none focus:border-[#7d5ba6]"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-[#333333] mb-2 block">Username</label>
                              <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg focus:outline-none focus:border-[#7d5ba6]"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-[#333333] mb-2 block">Email</label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg focus:outline-none focus:border-[#7d5ba6]"
                              />
                            </div>
                            <button 
                              onClick={handleSaveProfile}
                              className="px-6 py-2 bg-[#89ce94] text-white rounded-lg hover:bg-[#7dc987] transition-colors"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Change Password */}
                      {activeTab === 'change-password' && (
                        <div>
                          <h2 className="text-2xl font-bold text-[#333333] mb-2">Change Password</h2>
                          <p className="text-gray-600 mb-6">Update your password to keep your account secure</p>
                          
                          <div className="space-y-6">
                            <div>
                              <label className="text-sm font-medium text-[#333333] mb-2 block">Old Password</label>
                              <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Enter old password"
                                className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg focus:outline-none focus:border-[#7d5ba6]"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-[#333333] mb-2 block">New Password</label>
                              <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg focus:outline-none focus:border-[#7d5ba6]"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-[#333333] mb-2 block">Confirm Password</label>
                              <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg focus:outline-none focus:border-[#7d5ba6]"
                              />
                            </div>
                            
                            {/* Password Requirements */}
                            <div className="p-4 bg-gray-50 rounded-lg border-2 border-[#86a59c]">
                              <p className="text-sm font-medium text-[#333333] mb-2">Password Requirements:</p>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• At least 9 characters</li>
                                <li>• Must contain a number</li>
                                <li>• Must contain a special character</li>
                                <li>• No spaces allowed</li>
                              </ul>
                            </div>
                            
                            <button 
                              onClick={handleChangePassword}
                              className="px-6 py-2 bg-[#89ce94] text-white rounded-lg hover:bg-[#7dc987] transition-colors"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Delete Chats */}
                      {activeTab === 'delete-chats' && (
                        <div>
                          <h2 className="text-2xl font-bold text-[#333333] mb-2">Delete Chats</h2>
                          <p className="text-gray-600 mb-6">Manage your chat history</p>
                          
                          <div className="space-y-6">
                            <div className="p-6 border-2 border-[#86a59c] rounded-lg bg-gray-50">
                              <h3 className="font-semibold text-[#333333] mb-2">Delete All Chats</h3>
                              <p className="text-sm text-gray-600 mb-4">
                                This will permanently delete all your chat conversations. This action cannot be undone.
                              </p>
                              <button 
                                onClick={handleDeleteChats}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                Delete All Chats
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="w-80 p-8 flex flex-col items-center justify-start flex-shrink-0">
                  <div className="flex flex-col items-center">
                    {/* Profile Circle with Initials */}
                    <div className="w-32 h-32 rounded-full bg-[#89ce94] flex items-center justify-center mb-4">
                      <span className="text-4xl font-bold text-white">{getInitials(username)}</span>
                    </div>
                    
                    {/* Business Name */}
                    <p className="text-sm font-semibold text-[#7d5ba6] mb-2">{businessName}</p>
                    
                    {/* Username */}
                    <h3 className="text-xl font-bold text-[#333333] mb-2">{username}</h3>
                    
                    {/* Email */}
                    <p className="text-sm text-gray-600">{email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="fixed bottom-4 right-4 text-xs text-gray-500">
            App is owned by Team Nova in partner with Commerce Bank
          </div>
        </div>
      </div>
    </div>
  );
}