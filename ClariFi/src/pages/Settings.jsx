import { useState } from 'react';
import NavBar from './NavBar';

//THESE ARE JUST THE COMPONENTS PULLED FROM TAILWIND WEBSITE AS PLACEHOLDER

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  const navItems = [
    { id: 'profile', label: 'Profile', href: '/examples/forms' },
    { id: 'account', label: 'Account', href: '/examples/forms/account' },
    { id: 'appearance', label: 'Appearance', href: '/examples/forms/appearance' },
    { id: 'notifications', label: 'Notifications', href: '/examples/forms/notifications' },
    { id: 'display', label: 'Display', href: '/examples/forms/display' }
  ];

  const contentMap = {
    profile: {
      title: 'Profile',
      description: 'This is how others will see you on the site.'
    },
    account: {
      title: 'Account',
      description: 'Update your account settings. Set your preferred language and timezone.'
    },
    appearance: {
      title: 'Appearance',
      description: 'Customize the appearance of the app. Automatically switch between day and night themes.'
    },
    notifications: {
      title: 'Notifications',
      description: 'Configure how you receive notifications.'
    },
    display: {
      title: 'Display',
      description: 'Turn items on or off to control what\'s displayed in the app.'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4" style={{ backgroundColor: '#E0E0E0' }}>
      <NavBar />
      <div className="hidden space-y-6 p-10 pb-16 md:block bg-white rounded-lg shadow-sm">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-gray-600">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        
        {/* Separator */}
        <div className="shrink-0 bg-gray-200 h-[1px] w-full"></div>
        
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          {/* Navigation */}
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 h-9 px-4 py-2 justify-start ${
                  activeTab === item.id
                    ? 'bg-gray-100 hover:bg-gray-100'
                    : 'hover:bg-transparent hover:underline'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Content Area */}
          <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  {contentMap[activeTab].title}
                </h2>
                <p className="text-sm text-gray-600">
                  {contentMap[activeTab].description}
                </p>
              </div>

              {/* Form Content Based on Active Tab */}
              <div className="space-y-4">
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Username</label>
                      <input
                        type="text"
                        placeholder="Enter your username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Bio</label>
                      <textarea
                        placeholder="Tell us about yourself"
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Language</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Timezone</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Pacific Time (PT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Central Time (CT)</option>
                        <option>Eastern Time (ET)</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Theme</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>System</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Font Size</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-600">Receive emails about new features</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                  </div>
                )}

                {activeTab === 'display' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Show Sidebar</p>
                        <p className="text-sm text-gray-600">Display the sidebar navigation</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Compact Mode</p>
                        <p className="text-sm text-gray-600">Reduce spacing between elements</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Show Avatars</p>
                        <p className="text-sm text-gray-600">Display user avatars in lists</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="pt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Message */}
      <div className="md:hidden flex items-center justify-center h-screen">
        <p className="text-gray-600 text-center px-4">
          Please view this page on a larger screen to access settings.
        </p>
      </div>
    </div>
  );
}