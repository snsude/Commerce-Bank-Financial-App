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
      <aside className={`${sidebarOpen ? 'ml-0' : 'ml-[-100%]'} fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]`}>
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" className="w-32" alt="tailus logo" />
            </a>
          </div>

          <div className="mt-8 text-center">
            <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp" alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Cynthia J. Watts</h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`px-4 py-3 flex items-center space-x-4 rounded-xl ${
                    item.active 
                      ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' 
                      : 'text-gray-600 hover:text-gray-700'
                  }`}
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

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
                  <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z" />
                    </svg>
                  </span>
                  <input 
                    type="search" 
                    placeholder="Search here" 
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                  />
                </div>
              </div>
              <button aria-label="search" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mx-auto fill-current text-gray-600" viewBox="0 0 35.997 36.004">
                  <path d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z" />
                </svg>
              </button>
              <button aria-label="chat" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </button>
              <button aria-label="notification" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="px-6 pt-6 2xl:container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Global Activities Card */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                <svg className="w-40 m-auto opacity-75" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="73" cy="73" r="70" stroke="#e4e4f2" strokeWidth="4.9" fill="none" />
                  <circle cx="73" cy="73" r="50" stroke="#e4e4f2" strokeWidth="4.9" fill="none" />
                  <path d="M73 24C84.3364 24 95.3221 27.9307 104.085 35.1225" stroke="url(#paint0)" strokeWidth="10" strokeLinecap="round" />
                  <circle cx="73.5" cy="72.5" r="29" fill="#e4e4f2" stroke="#e4e4f2" />
                  <defs>
                    <linearGradient id="paint0" x1="73" y1="24" x2="104" y2="35">
                      <stop stopColor="#4DFFDF" />
                      <stop offset="1" stopColor="#4DA1FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <h5 className="text-xl text-gray-600 text-center">Global Activities</h5>
                  <div className="mt-2 flex justify-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-700">$23,988</h3>
                    <div className="flex items-end gap-1 text-green-500">
                      <svg className="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                      </svg>
                      <span>2%</span>
                    </div>
                  </div>
                  <span className="block text-center text-gray-500">Compared to last week $13,988</span>
                </div>
                <table className="w-full text-gray-600">
                  <tbody>
                    {globalActivitiesData.map((item, index) => (
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