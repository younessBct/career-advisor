import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Chat from './pages/Chat/Chat'
import Profile from './pages/Profile/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
