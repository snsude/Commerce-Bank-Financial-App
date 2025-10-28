import { useState } from 'react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

//THESE ARE JUST THE COMPONENTS PULLED FROM TAILWIND WEBSITE AS PLACEHOLDER

  const navItems = [
    { name: 'Dashboard', active: true },
    { name: 'Categories', active: false },
    { name: 'Reports', active: false },
    { name: 'Other data', active: false },
    { name: 'Finance', active: false }
  ];

  const globalActivitiesData = [
    { name: 'Tailored ui', value: '896' },
    { name: 'Customize', value: '1200' },
    { name: 'Other', value: '12' }
  ];

  const downloadsData = [
    { name: 'From new users', value: '896' },
    { name: 'From old users', value: '1200' }
  ];

  const customizeData = [
    { name: 'Tailored ui', value: '896' },
    { name: 'Customize', value: '1200' },
    { name: 'Other', value: '12' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
     
      {/* Main Content */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        {/* Header */}
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 className="hidden text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-12 h-16 -mr-2 border-r lg:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex space-x-4">
              <div className="hidden md:block">
                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
              
        
                </div>
              </div>
           
            
           
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="px-6 pt-6 2xl:container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Global Activities Card */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="md:col-span-2 lg:col-span-1">
                <div className="rounded-xl border-4 bg-white overflow-hidden" style={{borderColor: '#89CE94'}}>
                  {/* Purple Header */}
                   <div className="h-24 bg-purple-600 border-b-4 " style={{backgroundColor: '#7D5BA6', borderColor: '#89CE94'}} ></div>
    
                  {/* Content Area */}
                  <div className="p-6 space-y-4">
                  {/* Your content goes here */}
                  <p>Content area</p>
                  </div>
                  </div>
                </div>
          
            </div>

            {/* Downloads Card */}
            <div>
              <div className="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
                <h5 className="text-xl text-gray-700">Downloads</h5>
                <div className="my-8">
                  <h1 className="text-5xl font-bold text-gray-800">64.5%</h1>
                  <span className="text-gray-500">Compared to last week $13,988</span>
                </div>
                <div className="w-full h-16 bg-gradient-to-r from-purple-400 to-cyan-400 rounded opacity-20"></div>
                <table className="mt-6 -mb-2 w-full text-gray-600">
                  <tbody>
                    {downloadsData.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2">{item.name}</td>
                        <td className="text-gray-500">{item.value}</td>
                        <td>
                          <div className="w-16 h-5 ml-auto bg-gray-200 rounded"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ask to Customize Card */}
            <div>
              <div className="lg:h-full py-8 px-6 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 opacity-20"></div>
                <div className="mt-6">
                  <h5 className="text-xl text-gray-700 text-center">Ask to customize</h5>
                  <div className="mt-2 flex justify-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-700">28</h3>
                    <div className="flex items-end gap-1 text-green-500">
                      <svg className="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                      </svg>
                      <span>2%</span>
                    </div>
                  </div>
                  <span className="block text-center text-gray-500">Compared to last week 13</span>
                </div>
                <table className="mt-6 -mb-2 w-full text-gray-600">
                  <tbody>
                    {customizeData.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2">{item.name}</td>
                        <td className="text-gray-500">{item.value}</td>
                        <td>
                          <div className="w-16 h-5 ml-auto bg-gray-200 rounded"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}