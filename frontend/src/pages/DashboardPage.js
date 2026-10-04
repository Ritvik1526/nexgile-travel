import React, { useState, useEffect } from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { Card, StatCard, Button, Spinner, Badge, ProgressBar } from '../components/ui';
import { analyticsService } from '../services/operationsService';
import { reservationsService } from '../services/reservationsService';
import { revenueService } from '../services/revenueService';
import { propertiesService } from '../services/propertiesService';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const DashboardPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [resStats, setResStats] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsService.getOverview(),
      reservationsService.getStats(),
      revenueService.getMonthly(),
      revenueService.getForecast(7),
      propertiesService.getAll()
    ]).then(([ana, res, mon, fore, props]) => {
      setAnalytics(ana.data);
      setResStats(res.data);
      setMonthly(mon.data || []);
      setForecast(fore.data || []);
      setProperties(props.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) return (
    <AppLayout activePage="dashboard" onNavigate={onNavigate} title="Dashboard">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}><Spinner size={48} /></div>
    </AppLayout>
  );

  const kpis = analytics?.kpis || [];

  return (
    <AppLayout
      activePage="dashboard"
      onNavigate={onNavigate}
      title="Dashboard"
      subtitle={`${greeting()}, ${user?.name?.split(' ')[0]}! Here's your operational overview.`}
    >
      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Revenue (MTD)', value: '₹4.28Cr', change: 12.4, icon: '💰', color: '#6366f1', nav: 'revenue' },
          { label: 'Avg Occupancy', value: '87.3%', change: 3.2, icon: '🏨', color: '#0ea5e9', nav: 'analytics' },
          { label: 'ADR', value: '₹12,485', change: 8.7, icon: '📊', color: '#10b981', nav: 'revenue' },
          { label: 'RevPAR', value: '₹10,899', change: 11.1, icon: '📈', color: '#f59e0b', nav: 'revenue' },
          { label: 'Guest Score', value: '4.7/5', change: 0.2, icon: '⭐', color: '#ec4899', nav: 'guests' },
          { label: 'NPS', value: '72', change: 5, icon: '💬', color: '#8b5cf6', nav: 'analytics' }
        ].map(kpi => (
          <StatCard key={kpi.label} label={kpi.label} value={kpi.value} change={kpi.change} icon={kpi.icon} color={kpi.color} onClick={() => onNavigate(kpi.nav)} />
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Revenue Trend */}
        <Card style={{ gridColumn: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>Revenue Trend</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Monthly RevPAR performance</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('revenue')}>Full Report →</Button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Occupancy Forecast */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>7-Day Forecast</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>AI-powered demand prediction</div>
            </div>
            <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>AI ✦</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} tickFormatter={d => d.slice(5)} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v) => [`${v}%`, 'Occupancy']} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }} />
              <Line type="monotone" dataKey="occupancy" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {/* Today's Operations */}
        <Card>
          <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 16 }}>Today's Operations</div>
          {[
            { icon: '🛬', label: 'Arrivals', value: resStats?.todayArrivals || 8, color: '#6366f1' },
            { icon: '🛫', label: 'Departures', value: resStats?.todayDepartures || 6, color: '#0ea5e9' },
            { icon: '🛏️', label: 'In-House', value: resStats?.checkedIn || 212, color: '#10b981' },
            { icon: '🧹', label: 'HK Pending', value: 14, color: '#f59e0b' },
            { icon: '🔧', label: 'Maintenance', value: 3, color: '#ef4444' }
          ].map(op => (
            <div key={op.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{op.icon}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{op.label}</span>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: op.color }}>{op.value}</span>
            </div>
          ))}
          <Button variant="secondary" size="sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={() => onNavigate('reservations')}>
            View All Reservations
          </Button>
        </Card>

        {/* Property Performance */}
        <Card>
          <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 16 }}>Property Performance</div>
          {properties.map(p => (
            <div key={p.id} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{p.name.replace('Nexgile ', '')}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#6366f1' }}>{p.metrics?.occupancy}%</span>
              </div>
              <ProgressBar value={p.metrics?.occupancy || 0} color="#6366f1" />
              <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                <span>ADR: ₹{(p.metrics?.adr || 0).toLocaleString()}</span>
                <span>RevPAR: ₹{(p.metrics?.revpar || 0).toLocaleString()}</span>
              </div>
            </div>
          ))}
          <Button variant="secondary" size="sm" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={() => onNavigate('properties')}>
            View Properties
          </Button>
        </Card>

        {/* AI Insights */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>AI Insights</div>
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', color: '#fff', padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>LIVE</span>
          </div>
          {[
            { type: 'opportunity', icon: '💡', text: 'Dec 14–16 shows peak demand — raise rates by 15–20%', impact: '+₹2.4L', color: '#6366f1' },
            { type: 'alert', icon: '⚡', text: 'Expedia channel has 2 sync errors — inventory may be off', impact: 'Fix now', color: '#ef4444' },
            { type: 'info', icon: '📊', text: 'Saturday ADR is 24% above weekday average this month', impact: 'Monitor', color: '#f59e0b' }
          ].map((ins, i) => (
            <div key={i} style={{ padding: '10px 12px', background: `${ins.color}08`, borderRadius: 10, border: `1px solid ${ins.color}20`, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>{ins.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: ins.color, background: `${ins.color}18`, padding: '2px 8px', borderRadius: 99 }}>{ins.impact}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{ins.text}</div>
            </div>
          ))}
          <Button variant="secondary" size="sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onNavigate('revenue')}>
            Revenue Center →
          </Button>
        </Card>
      </div>
    </AppLayout>
  );
};
