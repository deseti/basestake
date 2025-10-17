import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Simple test without Wagmi
function TestApp() {
  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'sans-serif',
      maxWidth: '600px',
      margin: '2rem auto',
      border: '2px solid #4CAF50',
      borderRadius: '8px'
    }}>
      <h1 style={{ color: '#4CAF50' }}>✅ React is Working!</h1>
      <p>If you see this, the basic setup is correct.</p>
      <p>Now we need to debug the Wagmi configuration.</p>
      <button 
        onClick={() => alert('Button works!')}
        style={{
          padding: '0.75rem 1.5rem',
          background: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Click Me
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)
