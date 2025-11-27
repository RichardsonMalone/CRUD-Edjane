import Students from './Components/Students/Students'
import './App.css'
import LoginSignup from './Components/LoginSignup/LoginSignup'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/alunos" element={<Students />} />
    </Routes>
  )
}