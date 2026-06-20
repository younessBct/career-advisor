import { useNavigate, useLocation } from 'react-router-dom'
import './Topbar.css'

export default function Topbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const onProfile = location.pathname === '/profile'

  return (
    <header className="topbar">
      <div className="topbar-left" onClick={() => navigate('/chat')} style={{ cursor: 'pointer' }}>
        <h1>IT Career Advisor</h1>
        <p>Ontology-backed career guidance</p>
      </div>
      <button
        className={`profile-btn ${onProfile ? 'active' : ''}`}
        onClick={() => navigate(onProfile ? '/chat' : '/profile')}
      >
        ⚙ {onProfile ? 'Back to chat' : 'Profile'}
      </button>
    </header>
  )
}
