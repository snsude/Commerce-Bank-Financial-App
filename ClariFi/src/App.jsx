import './index.css';
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom' 
import NavBar from './pages/NavBar'
import Login from './pages/Login'
import NewUser from './pages/NewUser'
import Dashboard from './pages/Dashboard'
import Goals from './pages/Goals'
import Settings from './pages/Settings'
import ChatBot  from './pages/Chatbot';



function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route path="/Login" element={<Login />}/>
          <Route path="/NewUser" element={<NewUser />}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
          <Route path="/Goals" element={<Goals />}/>
          <Route path="/ChatBot" element={<ChatBot/>}/>
          <Route path="/Settings" element={<Settings />}/>
        </Routes>
      </div>
    </Router>
  )
}
export default App;



