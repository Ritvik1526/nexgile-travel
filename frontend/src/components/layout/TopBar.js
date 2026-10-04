import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const TopBar = ({ title, subtitle, actions }) => {
  const { user } = useAuth();
  const [notifs] = useState(3);

  return (
    <div style={{
      height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', background: 'var(--surface)', borderBottom: '2px solid var(--border)',
      boxShadow: 'none', flexShrink: 0, gap: 16
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: 'var(--text)', letterSpacing: -1 }}>{title}</h1>
        {subtitle && <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {actions}
        {/* Notification bell */}
        <button style={{ position: 'relative', background: '#080808', color: '#fff', border: '1px solid #080808', borderRadius: 999, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none', fontSize: 16 }}>
          🔔
          {notifs > 0 && <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: '#ef4444', borderRadius: '50%' }} />}
        </button>
        {/* Clock */}
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right', minWidth: 80 }}>
          <div>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          <div>{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>
    </div>
  );
};
