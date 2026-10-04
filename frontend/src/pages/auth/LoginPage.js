import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui';

const DEMO_ACCOUNTS = [
  { email: 'admin@nexgile.com', password: 'admin123', role: 'SuperAdmin', label: 'Super Admin' },
  { email: 'rohit.v@nexgile.com', password: 'prop123', role: 'PropertyAdmin', label: 'Property Admin' },
  { email: 'sunita.r@nexgile.com', password: 'front123', role: 'FrontDesk', label: 'Front Desk' },
  { email: 'karthik.n@nexgile.com', password: 'rev123', role: 'RevenueManager', label: 'Revenue Manager' }
];

export const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@nexgile.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoading(true); setError('');
    try { await login(email, password); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 980, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        {/* Left - Branding */}
        <div>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 46, fontWeight: 900, color: '#080808', letterSpacing: -3, lineHeight: .9 }}>
              Nexgile
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 4, marginTop: 4 }}>TRAVAI PLATFORM</div>
          </div>
          <h2 style={{ fontSize: 'clamp(42px,5vw,72px)', fontWeight: 900, color: 'var(--text)', marginBottom: 16, lineHeight: .9, letterSpacing: -4 }}>
            Travel better. Operate smarter.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
            One platform for property operations, revenue management, distribution, AI concierge, and enterprise travel — all connected.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🏨', label: 'Multi-Property PMS' },
              { icon: '📈', label: 'AI Revenue Management' },
              { icon: '🌐', label: '20,000+ Channel Distribution' },
              { icon: '🤖', label: 'AI Guest Concierge' },
              { icon: '🏆', label: 'Loyalty & Rewards' },
              { icon: '💼', label: 'Enterprise Travel' }
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--surface)', borderRadius: 999, border: '1px solid var(--border)', boxShadow: 'none' }}>
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Login Card */}
        <div style={{ background: 'var(--surface)', borderRadius: 4, padding: 36, boxShadow: '10px 10px 0 #080808', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>Sign In</h3>

          {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: 10, marginBottom: 16, fontSize: 13, fontWeight: 600 }}>⚠️ {error}</div>}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: 'inset 2px 2px 6px var(--shadow-dark)', fontSize: 14, color: 'var(--text)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: 'inset 2px 2px 6px var(--shadow-dark)', fontSize: 14, color: 'var(--text)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <Button style={{ width: '100%', justifyContent: 'center' }} size="lg" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </Button>
          </form>

          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: 1 }}>DEMO ACCOUNTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.email}
                  onClick={() => { setEmail(acc.email); setPassword(acc.password); }}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: email === acc.email ? '#6366f118' : 'var(--surface-alt)', border: email === acc.email ? '1px solid #6366f1' : '1px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--text)' }}
                >
                  <span>{acc.label}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{acc.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
