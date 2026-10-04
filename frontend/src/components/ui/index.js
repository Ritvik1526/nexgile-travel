import React from 'react';
import { STATUS_COLORS, LOYALTY_TIERS } from '../../types';

// ─── NEUMORPHIC CARD ──────────────────────────────────────────────────────────
export const Card = ({ children, className = '', raised = true, onClick, style = {} }) => (
  <div
    onClick={onClick}
    style={{
      background: 'var(--surface)',
      borderRadius: 4,
      padding: 24,
      boxShadow: raised
        ? '0 8px 0 #080808'
        : 'inset 0 0 0 1px #080808',
      border: '1px solid var(--border)',
      transition: 'box-shadow 0.25s ease, transform 0.25s cubic-bezier(.2,.8,.2,1)',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }}
    className={className}
    onMouseEnter={e => onClick && (e.currentTarget.style.transform = 'translateY(-5px)')}
    onMouseLeave={e => onClick && (e.currentTarget.style.transform = 'translateY(0)')}
  >
    {children}
  </div>
);

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
export const Badge = ({ status, label, size = 'sm' }) => {
  const colors = STATUS_COLORS[status] || { bg: '#f3f4f6', text: '#374151' };
  return (
    <span style={{
      background: colors.bg, color: colors.text,
      padding: size === 'sm' ? '3px 10px' : '5px 14px',
      borderRadius: 999, fontSize: size === 'sm' ? 11 : 13,
      fontWeight: 600, letterSpacing: 0.3, whiteSpace: 'nowrap'
    }}>
      {label || status}
    </span>
  );
};

// ─── LOYALTY TIER BADGE ───────────────────────────────────────────────────────
export const TierBadge = ({ tier }) => {
  const t = LOYALTY_TIERS[tier] || LOYALTY_TIERS.Member;
  return (
    <span style={{
      background: t.bg, color: t.color,
      padding: '2px 10px', borderRadius: 999, fontSize: 11,
      fontWeight: 700, border: `1px solid ${t.color}40`
    }}>
      {tier}
    </span>
  );
};

// ─── BUTTON ───────────────────────────────────────────────────────────────────
export const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, icon, style = {} }) => {
  const sizes = { sm: { padding: '6px 14px', fontSize: 13 }, md: { padding: '10px 22px', fontSize: 14 }, lg: { padding: '14px 28px', fontSize: 16 } };
  const variants = {
    primary: { background: '#080808', color: '#fff', border: '1px solid #080808', boxShadow: '0 4px 0 #6658ff' },
    secondary: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', boxShadow: '0 3px 0 #080808' },
    danger: { background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', boxShadow: 'none' },
    success: { background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', boxShadow: 'none' },
    ghost: { background: 'transparent', color: 'var(--text-muted)', border: 'none', boxShadow: 'none' }
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizes[size], ...variants[variant],
        borderRadius: 999, fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex', alignItems: 'center', gap: 6, opacity: disabled ? 0.6 : 1,
        transition: 'all 0.15s ease', ...style
      }}
    >
      {icon && <span>{icon}</span>}{children}
    </button>
  );
};

// ─── STAT CARD ────────────────────────────────────────────────────────────────
export const StatCard = ({ label, value, change, icon, color = '#6366f1', onClick }) => (
  <Card onClick={onClick} style={{ position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `${color}12`, borderRadius: '0 20px 0 80px' }} />
    <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 800, marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontSize: 30, fontWeight: 900, color: 'var(--text)', letterSpacing: -1.5 }}>{value}</div>
    {change !== undefined && (
      <div style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: change >= 0 ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', gap: 3 }}>
        <span>{change >= 0 ? '↑' : '↓'}</span>
        <span>{Math.abs(change)}% vs last month</span>
      </div>
    )}
  </Card>
);

// ─── LOADING SPINNER ─────────────────────────────────────────────────────────
export const Spinner = ({ size = 32, color = '#6366f1' }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 32 }}>
    <div style={{
      width: size, height: size, border: `3px solid ${color}30`,
      borderTop: `3px solid ${color}`, borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
);

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
export const EmptyState = ({ icon = '📭', title = 'Nothing here', message, action }) => (
  <div style={{ textAlign: 'center', padding: '48px 24px' }}>
    <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{title}</div>
    {message && <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>{message}</div>}
    {action}
  </div>
);

// ─── ERROR STATE ──────────────────────────────────────────────────────────────
export const ErrorState = ({ message, onRetry }) => (
  <div style={{ textAlign: 'center', padding: '48px 24px' }}>
    <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
    <div style={{ fontSize: 16, fontWeight: 600, color: '#dc2626', marginBottom: 8 }}>{message}</div>
    {onRetry && <Button variant="secondary" size="sm" onClick={onRetry}>Try Again</Button>}
  </div>
);

// ─── SEARCH INPUT ─────────────────────────────────────────────────────────────
export const SearchInput = ({ value, onChange, placeholder = 'Search…' }) => (
  <div style={{ position: 'relative' }}>
    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 16 }}>🔍</span>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '10px 14px 10px 40px', borderRadius: 12,
        border: '1px solid var(--border)', background: 'var(--surface)',
        boxShadow: 'inset 2px 2px 6px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light)',
        fontSize: 14, color: 'var(--text)', outline: 'none', boxSizing: 'border-box'
      }}
    />
  </div>
);

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
export const SectionHeader = ({ title, subtitle, actions }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
    <div>
      <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900, color: 'var(--text)', letterSpacing: -1.4 }}>{title}</h2>
      {subtitle && <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--text-muted)' }}>{subtitle}</p>}
    </div>
    {actions && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{actions}</div>}
  </div>
);

// ─── TABLE ────────────────────────────────────────────────────────────────────
export const Table = ({ columns, data, onRowClick }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, fontSize: 12, color: 'var(--text-muted)', borderBottom: '2px solid var(--border)', whiteSpace: 'nowrap', background: 'var(--surface-alt)' }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            onClick={() => onRowClick && onRowClick(row)}
            style={{ cursor: onRowClick ? 'pointer' : 'default', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-alt)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {columns.map(col => (
              <td key={col.key} style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── MODAL ────────────────────────────────────────────────────────────────────
export const Modal = ({ open, onClose, title, children, width = 560 }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#00000060', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div style={{ background: 'var(--surface)', borderRadius: 24, width: '100%', maxWidth: width, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 64px #0000004d' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
};

// ─── AVATAR ───────────────────────────────────────────────────────────────────
export const Avatar = ({ initials, size = 36, color = '#6366f1' }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', background: `linear-gradient(135deg, ${color}, ${color}99)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 800, fontSize: size * 0.38, flexShrink: 0,
    boxShadow: `0 2px 8px ${color}40`
  }}>
    {initials}
  </div>
);

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
export const ProgressBar = ({ value, max = 100, color = '#6366f1', label }) => (
  <div>
    {label && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>
      <span>{label}</span><span>{value}%</span>
    </div>}
    <div style={{ height: 8, background: 'var(--surface-alt)', borderRadius: 99, overflow: 'hidden', boxShadow: 'inset 1px 1px 4px var(--shadow-dark)' }}>
      <div style={{ height: '100%', width: `${Math.min(value, max)}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 99, transition: 'width 0.6s ease' }} />
    </div>
  </div>
);
