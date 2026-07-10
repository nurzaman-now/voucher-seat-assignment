import React from 'react';
import { Ticket, ArrowLeft, Plane, User, CalendarDays } from 'lucide-react';

export default function VoucherResult({ result, onReset }) {
  if (!result || !result.seats) return null;

  const { data, seats } = result;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="title" style={{ margin: 0 }}>Boarding Passes</h2>
        <button 
          onClick={onReset} 
          className="btn btn-primary" 
          style={{ width: 'auto', padding: '0.5rem 1rem', background: 'var(--md-surface)', color: 'var(--md-primary)', boxShadow: 'var(--shadow-1)' }}
        >
          <ArrowLeft size={18} /> New Flight
        </button>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="material-card" style={{ flex: 1, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Plane size={32} color="var(--md-primary)" />
          <div>
            <div className="ticket-label">Flight Number</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--md-primary-dark)' }}>{data.flight_number?.toUpperCase()}</div>
          </div>
        </div>
        <div className="material-card" style={{ flex: 1, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CalendarDays size={32} color="var(--md-primary)" />
          <div>
            <div className="ticket-label">Departure Date</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--md-primary-dark)' }}>{data.flight_date}</div>
          </div>
        </div>
      </div>

      <div className="ticket-container">
        {seats.map((seat, index) => (
          <div key={index} className="ticket">
            <div className="ticket-main">
              <div className="ticket-header" style={{ margin: '-1.5rem -1.5rem 1.5rem -1.5rem' }}>
                <Plane size={18} />
                <span>{data.aircraft_type}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div className="ticket-label">Passenger</div>
                  <div className="ticket-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} color="var(--text-secondary)" />
                    Voucher Winner #{index + 1}
                  </div>
                </div>
                <div>
                  <div className="ticket-label">Assigned By (Crew)</div>
                  <div className="ticket-value">{data.crew_name}</div>
                </div>
              </div>
            </div>
            
            <div className="ticket-dashed-line"></div>
            
            <div className="seat-section">
              <div className="ticket-label" style={{ color: 'var(--md-secondary)' }}>Seat</div>
              <div className="seat-number">{seat}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--md-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.1rem', fontWeight: 500 }}>
        <Ticket size={24} />
        <span>Vouchers successfully generated and secured!</span>
      </div>
    </div>
  );
}
