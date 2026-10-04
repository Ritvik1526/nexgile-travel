import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';

export const AppLayout = ({ activePage, onNavigate, title, subtitle, topBarActions, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <Sidebar activePage={activePage} onNavigate={onNavigate} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        <TopBar title={title} subtitle={subtitle} actions={topBarActions} />
        <main style={{ flex: 1, minHeight: 0, padding: 28, overflowY: 'auto', overscrollBehavior: 'contain' }}>
          {children}
        </main>
      </div>
    </div>
  );
};
