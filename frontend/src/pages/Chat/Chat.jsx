import { useState, useRef, useEffect } from 'react'
import Topbar from '../../components/Topbar'
import MessageBubble from '../../components/MessageBubble'
import { sendQuery } from '../../services/api'
import './Chat.css'

const WELCOME_MESSAGE = {
  role: 'bot',
  content: (
    <>
      Welcome to the IT Career Advisor! I use ontology-based reasoning to provide personalized career guidance.
      <ul style={{ marginTop: 8, paddingLeft: 16 }}>
        <li>Role recommendations based on your skills</li>
        <li>Learning paths for specific careers</li>
        <li>Career progression strategies</li>
        <li>Salary information for IT roles</li>
      </ul>
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '0.5px solid #e0e0e0', fontSize: 13, color: '#888' }}>
        💡 Tip: Set up your profile to get personalized recommendations.
      </div>
    </>
  ),
  reasoning: null,
  timestamp: new Date().toLocaleTimeString(),
}

export default function Chat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const response = await sendQuery(text)
      const botMsg = {
        role: 'bot',
        content: response.answer,
        reasoning: response.reasoning ?? null,
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages(prev => [...prev, botMsg])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'Something went wrong. Please try again.',
        reasoning: null,
        timestamp: new Date().toLocaleTimeString(),
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-page">
      <Topbar />
      <div className="messages">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {loading && (
          <div className="loading-indicator">Thinking...</div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="input-area">
        <div className="input-row">
          <input
            type="text"
            placeholder="Ask about IT careers, skills, or roles..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <button className="send-btn" onClick={handleSend} disabled={loading} aria-label="Send">
            ➤
          </button>
        </div>
        <p className="footnote">All responses are grounded in the IT career ontology</p>
      </div>
    </div>
  )
}
