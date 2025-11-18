import './index.css';
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom' 
import NavBar from './pages/NavBar'
import Login from './pages/Login'
import NewUser from './pages/NewUser'
import Dashboard from './pages/Dashboard'
import Goals from './pages/Goals'
import Settings from './pages/Settings'
import ChatBot  from './pages/Chatbot'
import BusinessDash from './pages/BusinessDash'
import SubUserDash from './pages/SubUserDash'
import BusinessSettings from './pages/BusinessSettings'
import SubUserSettings from './pages/SubUserSettings';



function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route path="/Login" element={<Login />}/>
          <Route path="/NewUser" element={<NewUser />}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
          <Route path="/BusinessDash" element={<BusinessDash />}/>
          <Route path="/SubUserDash" element={<SubUserDash />}/>
          <Route path="/Goals" element={<Goals />}/>
          <Route path="/ChatBot" element={<ChatBot/>}/>
          <Route path="/Settings" element={<Settings />}/>
          <Route path="/BusinessSettings" element={<BusinessSettings />}/>
          <Route path="/SubUserSettings" element={<SubUserSettings />}/>
        </Routes>
      </div>
    </Router>
  )
}
export default App;



