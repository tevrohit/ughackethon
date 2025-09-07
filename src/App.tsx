import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Mentor from './pages/Mentor'
import Counselor from './pages/Counselor'
import AICounselor from './pages/AICounselor'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/counselor" element={<Counselor />} />
        <Route path="/ai-counselor" element={<AICounselor />} />
      </Routes>
    </div>
  )
}

export default App
