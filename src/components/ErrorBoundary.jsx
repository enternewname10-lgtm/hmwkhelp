import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0f1a',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          padding: 24,
          textAlign: 'center',
          gap: 16,
        }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <h2>Something went wrong</h2>
          <pre style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '12px 20px',
            borderRadius: 8,
            fontSize: 13,
            color: '#ef4444',
            maxWidth: 600,
            overflow: 'auto',
            textAlign: 'left',
          }}>
            {this.state.error.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 28px',
              background: '#7c3aed',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
