import React from 'react';

interface State {
  error: Error | null;
}

interface Props {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: '100dvh',
          backgroundColor: '#000',
          color: 'white',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          textAlign: 'center',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '48px' }} aria-hidden="true">⚠️</div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>
          Qualcosa è andato storto
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', maxWidth: 360, margin: 0 }}>
          Si è verificato un errore inatteso. Riprova oppure ricarica la pagina.
        </p>
        {import.meta.env.DEV && (
          <pre
            style={{
              marginTop: 8,
              padding: 12,
              fontSize: 11,
              color: '#ff8a80',
              backgroundColor: 'rgba(229,57,53,0.08)',
              border: '1px solid rgba(229,57,53,0.3)',
              borderRadius: 8,
              maxWidth: 400,
              overflow: 'auto',
              textAlign: 'left',
            }}
          >
            {this.state.error.message}
          </pre>
        )}
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            onClick={this.handleReset}
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Riprova
          </button>
          <button
            onClick={this.handleReload}
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #ef4444, #b71c1c)',
              color: 'white',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Ricarica
          </button>
        </div>
      </div>
    );
  }
}
