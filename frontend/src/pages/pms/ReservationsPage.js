import React, { useState, useEffect } from 'react';
import { AppLayout } from '../../layouts/AppLayout';
import { Card, Badge, Button, Spinner, SearchInput, SectionHeader, Table, TierBadge, Modal } from '../../components/ui';
import { reservationsService } from '../../services/reservationsService';

export const ReservationsPage = ({ onNavigate }) => {
  const [reservations, setReservations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [res, s] = await Promise.all([
        reservationsService.getAll({ status: statusFilter }),
        reservationsService.getStats()
      ]);
      setReservations(res.data || []);
      setStats(s.data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [statusFilter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await reservationsService.updateStatus(id, status);
      setSelected(null);
      load();
    } catch (e) { alert(e.message); }
  };

  const filtered = reservations.filter(r =>
    !search || r.guestName?.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()) || r.confirmationNo?.toLowerCase().includes(search.toLowerCase())
  );

  const statCards = [
    { label: 'Total', value: stats?.total || 0, color: '#6366f1' },
    { label: "Today's Arrivals", value: stats?.todayArrivals || 0, color: '#10b981' },
    { label: "Today's Departures", value: stats?.todayDepartures || 0, color: '#0ea5e9' },
    { label: 'Checked In', value: stats?.checkedIn || 0, color: '#f59e0b' }
  ];

  return (
    <AppLayout activePage="reservations" onNavigate={onNavigate} title="Reservations" subtitle="Manage all bookings across properties">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {statCards.map(s => (
          <Card key={s.label} style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card raised={false} style={{ boxShadow: '8px 8px 20px var(--shadow-dark), -4px -4px 12px var(--shadow-light)' }}>
        <SectionHeader
          title="All Reservations"
          actions={
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['', 'confirmed', 'checked-in', 'checked-out', 'cancelled'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '6px 14px', borderRadius: 99, border: statusFilter === s ? '2px solid #6366f1' : '1px solid var(--border)', background: statusFilter === s ? '#6366f118' : 'var(--surface)', fontWeight: 600, fontSize: 12, cursor: 'pointer', color: statusFilter === s ? '#6366f1' : 'var(--text-muted)' }}>
                  {s || 'All'}
                </button>
              ))}
            </div>
          }
        />
        <div style={{ marginBottom: 16 }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name, ID, or confirmation number…" />
        </div>

        {loading ? <Spinner /> : (
          <Table
            columns={[
              { key: 'id', label: 'Reservation ID' },
              { key: 'confirmationNo', label: 'Confirmation' },
              { key: 'guestName', label: 'Guest', render: (v, row) => (
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)' }}>{v}</div>
                  <TierBadge tier={row.guestTier || 'Member'} />
                </div>
              )},
              { key: 'roomNo', label: 'Room' },
              { key: 'checkIn', label: 'Check-In' },
              { key: 'checkOut', label: 'Check-Out' },
              { key: 'nights', label: 'Nights' },
              { key: 'totalAmount', label: 'Total', render: v => `₹${v.toLocaleString()}` },
              { key: 'status', label: 'Status', render: v => <Badge status={v} label={v} /> },
              { key: 'source', label: 'Source' }
            ]}
            data={filtered}
            onRowClick={setSelected}
          />
        )}
      </Card>

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Reservation ${selected?.id}`} width={680}>
        {selected && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              {[
                ['Guest', selected.guestName], ['Room', selected.roomNo], ['Check-In', selected.checkIn], ['Check-Out', selected.checkOut],
                ['Nights', selected.nights], ['Adults', selected.adults], ['Children', selected.children],
                ['Total', `₹${selected.totalAmount.toLocaleString()}`], ['Paid', `₹${selected.paid.toLocaleString()}`],
                ['Balance', `₹${selected.balance.toLocaleString()}`], ['Source', selected.source], ['Rate Code', selected.rateCode]
              ].map(([label, value]) => (
                <div key={label} style={{ padding: '10px 14px', background: 'var(--surface-alt)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{value}</div>
                </div>
              ))}
            </div>
            {selected.specialRequests && (
              <div style={{ padding: '12px 14px', background: '#fef3c718', border: '1px solid #f59e0b30', borderRadius: 10, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#d97706', marginBottom: 4 }}>SPECIAL REQUESTS</div>
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{selected.specialRequests}</div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {selected.status === 'confirmed' && <Button variant="success" size="sm" onClick={() => handleStatusUpdate(selected.id, 'checked-in')}>✓ Check In</Button>}
              {selected.status === 'checked-in' && <Button variant="secondary" size="sm" onClick={() => handleStatusUpdate(selected.id, 'checked-out')}>Check Out</Button>}
              {['confirmed', 'pending'].includes(selected.status) && <Button variant="danger" size="sm" onClick={() => handleStatusUpdate(selected.id, 'cancelled')}>Cancel</Button>}
              <Button variant="secondary" size="sm">📄 View Folio</Button>
              <Button variant="secondary" size="sm">✏️ Modify</Button>
            </div>
          </div>
        )}
      </Modal>
    </AppLayout>
  );
};
