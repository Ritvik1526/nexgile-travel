import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NAV_ITEMS_BY_ROLE, ROLE_COLORS } from '../../types';

const NAV_CONFIG = {
  dashboard: { icon: '🏠', label: 'Dashboard' },
  properties: { icon: '🏨', label: 'Properties' },
  rooms: { icon: '🛏️', label: 'Rooms & readiness' },
  reservations: { icon: '📋', label: 'Reservations' },
  guests: { icon: '👥', label: 'Guests' },
  revenue: { icon: '📈', label: 'Revenue' },
  forecasting: { icon: '✨', label: 'AI Forecasting' },
  competitors: { icon: '◈', label: 'Competitors' },
  channels: { icon: '🌐', label: 'Distribution' },
  marketplace: { icon: '🛒', label: 'Marketplace' },
  concierge: { icon: '🤖', label: 'AI Concierge' },
  housekeeping: { icon: '🧹', label: 'Housekeeping' },
  maintenance: { icon: '🔧', label: 'Maintenance' },
  analytics: { icon: '📊', label: 'Analytics' },
  loyalty: { icon: '🏆', label: 'Loyalty' },
  corporate: { icon: '💼', label: 'Corporate' },
  approvals: { icon: '✓', label: 'Approvals' },
  expenses: { icon: '🧾', label: 'Expenses' },
  trips: { icon: '✈️', label: 'My Trips' },
  documents: { icon: '📂', label: 'Documents' },
  wallet: { icon: '💳', label: 'Wallet' },
  users: { icon: '👤', label: 'Users & Roles' },
  integrations: { icon: '🔌', label: 'Integrations' },
  'api-audit': { icon: '◌', label: 'API & Audit' },
  settings: { icon: '⚙️', label: 'Settings' }
};

export const Sidebar = ({ activePage, onNavigate, collapsed, onToggle }) => {
  const { user, logout, selectedProperty, setSelectedProperty } = useAuth();
  const allowedItems = NAV_ITEMS_BY_ROLE[user?.role] || [];
  const roleColor = ROLE_COLORS[user?.role] || '#6366f1';

  return (
    <div style={{
      width: collapsed ? 72 : 240,
      height: '100vh',
      overflow: 'hidden',
      background: '#080808',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.25s ease',
      flexShrink: 0,
      position: 'relative',
      zIndex: 100,
      borderRight: '1px solid #080808'
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '20px 0' : '20px 20px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', gap: 10 }}>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: -1 }}>
              Nexgile
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#aaa', letterSpacing: 2 }}>TRAVAI ✦ PLATFORM</div>
          </div>
        )}
        {collapsed && <span style={{ fontSize: 22 }}>🏨</span>}
        <button
          onClick={onToggle}
          style={{ background: '#fff', border: '1px solid #fff', borderRadius: 999, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#080808', fontSize: 14, boxShadow: 'none', flexShrink: 0 }}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, minHeight: 0, padding: '12px 0', overflowY: 'auto', overscrollBehavior: 'contain' }}>
        {allowedItems.map(item => {
          const config = NAV_CONFIG[item];
          if (!config) return null;
          const isActive = activePage === item;
          return (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              title={collapsed ? config.label : ''}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', padding: collapsed ? '11px 0' : '11px 20px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: isActive ? '#fff' : 'transparent',
                border: 'none', borderLeft: isActive ? '3px solid #6658ff' : '3px solid transparent',
                cursor: 'pointer', transition: 'all 0.15s ease', textAlign: 'left'
              }}
              onMouseEnter={e => !isActive && (e.currentTarget.style.background = 'var(--surface-alt)')}
              onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{config.icon}</span>
              {!collapsed && <span style={{ fontSize: 13, fontWeight: isActive ? 800 : 500, color: isActive ? '#080808' : '#c4c4c4' }}>{config.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div style={{ padding: collapsed ? '12px 0' : '12px 16px', borderTop: '1px solid #333' }}>
        {!collapsed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg, ${roleColor}, ${roleColor}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>
              {user?.avatar || user?.name?.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{user?.name}</div>
              <div style={{ fontSize: 11, color: '#aaa' }}>{user?.role}</div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg, ${roleColor}, ${roleColor}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>
              {user?.avatar}
            </div>
          </div>
        )}
        <button
          onClick={logout}
          style={{ width: '100%', padding: collapsed ? '8px 0' : '8px 12px', background: 'transparent', border: '1px solid #666', borderRadius: 999, cursor: 'pointer', fontSize: 12, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 6 }}
        >
          <span>🚪</span>{!collapsed && 'Sign Out'}
        </button>
      </div>
    </div>
  );
};
