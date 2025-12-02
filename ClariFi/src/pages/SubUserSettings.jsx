import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SettingsPageSubUser() {
  const [activeTab, setActiveTab] = useState('edit-profile');
  const [isExpanded, setIsExpanded] = useState(false);
  const businessName = ''; // Sub user cannot change this
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navItems = [
    { id: 'edit-profile', label: 'Edit Profile' },
    { id: 'change-password', label: 'Change Password' }
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
      <aside 
        className={`flex flex-col items-center text-white h-screen transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        style={{
          backgroundColor: '#174D1F',
          boxShadow: '4px 0 12px rgba(0, 0, 0, 0.15)'
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Profile Circle */}
        <div className="h-20 flex items-center w-full justify-center px-4 mb-2">
          <div 
            className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-gray-700 font-bold flex-shrink-0 text-lg"
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              border: '3px solid #6BB577'
            }}
          >
            U
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 w-full px-2">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/SubUserDash" 
                className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-green-600 hover:bg-opacity-20"
              >
                <div className="transition-transform duration-200">
                  <svg
                    className="h-6 w-6 flex-shrink-0"
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
                </div>
                {isExpanded && (
                  <span className="ml-4 text-sm font-medium whitespace-nowrap">
                    Dashboard
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logo Section */}
        <div className="h-24 flex items-center justify-center w-full px-4">
          <img
            src={isExpanded ? "/ClariFi-Logo.png" : "/ClariFi-Logo-Small.png"}
            alt="Logo"
            className={`object-contain transition-all duration-300 ${
              isExpanded ? 'h-12 w-auto' : 'h-14 w-14'
            }`}
            style={{
              filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.25))'
            }}
          />
        </div>

        {/* Settings */}
        <div className="w-full px-2 pb-4 border-t border-white border-opacity-20 pt-2">
          <Link 
            to="/SubUserSettings" 
            className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-green-600 hover:bg-opacity-20"
          >
            <div className="transition-transform duration-200">
              <svg
                className="h-6 w-6 flex-shrink-0"
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
            </div>
            {isExpanded && (
              <span className="ml-4 text-sm font-medium whitespace-nowrap">
                Settings
              </span>
            )}
          </Link>
        </div>
      </aside>

      
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
                                disabled
                                className="w-full px-4 py-2 border-2 border-[#86a59c] rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                              />
                              <p className="text-xs text-gray-500 mt-1">Business name cannot be changed by sub users</p>
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
                    </div>
                  </div>
                </div>

                {/* Right Side - User Profile Display Only */}
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