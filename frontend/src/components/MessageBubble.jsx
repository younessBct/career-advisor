import { useState } from 'react'
import './MessageBubble.css'

export default function MessageBubble({ message }) {
  const [reasoningOpen, setReasoningOpen] = useState(false)
  const isUser = message.role === 'user'

  return (
    <div className={`msg-wrapper ${isUser ? 'user' : 'bot'}`}>
      <div className="msg-row">
        {!isUser && (
          <div className="avatar">🤖</div>
        )}
        <div className={`bubble ${isUser ? 'bubble-user' : 'bubble-bot'}`}>
          {message.content}
        </div>
      </div>

      {!isUser && message.reasoning && (
        <div className="reasoning-section">
          <button
            className="reasoning-toggle"
            onClick={() => setReasoningOpen(prev => !prev)}
          >
            💡 View ontology reasoning {reasoningOpen ? '▲' : '▾'}
          </button>
          {reasoningOpen && (
            <div className="reasoning-panel">
              {message.reasoning}
            </div>
          )}
        </div>
      )}

      <div className={`timestamp ${isUser ? 'timestamp-right' : ''}`}>
        {message.timestamp}
      </div>
    </div>
  )
}
