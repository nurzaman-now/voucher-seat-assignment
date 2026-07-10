import React, { useState } from 'react';
import { PlaneTakeoff, User, Calendar, Hash, AlertCircle, Send } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export default function VoucherForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    crew_name: '',
    crew_id: '',
    flight_number: '',
    flight_date: '',
    aircraft_type: 'ATR',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Check for duplicates
      const checkRes = await fetch(`${API_BASE_URL}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          flight_number: formData.flight_number,
          flight_date: formData.flight_date,
        }),
      });
      
      const checkData = await checkRes.json();
      
      if (checkData.exists) {
        setError('A voucher has already been generated for this flight on the selected date.');
        setLoading(false);
        return;
      }

      // 2. Generate Voucher
      const genRes = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      const genData = await genRes.json();

      if (!genRes.ok) {
        if (genData.errors) {
            const firstError = Object.values(genData.errors)[0][0];
            setError(firstError);
        } else {
            setError(genData.message || 'Failed to generate voucher.');
        }
        setLoading(false);
        return;
      }

      onSuccess(genData);
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="material-card">
      <h1 className="title">Flight Details</h1>
      <p className="subtitle">Enter the information below to assign seats for the voucher winners.</p>

      {error && (
        <div className="alert alert-danger">
          <AlertCircle size={24} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Crew Name</label>
          <div style={{ position: 'relative' }}>
            <User size={20} style={{ position: 'absolute', left: '8px', top: '8px', color: 'var(--text-disabled)' }} />
            <input 
              type="text" 
              name="crew_name" 
              className="form-input" 
              value={formData.crew_name}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Crew ID</label>
          <div style={{ position: 'relative' }}>
            <Hash size={20} style={{ position: 'absolute', left: '8px', top: '8px', color: 'var(--text-disabled)' }} />
            <input 
              type="text" 
              name="crew_id" 
              className="form-input" 
              value={formData.crew_id}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
            <label className="form-label">Flight Number</label>
            <div style={{ position: 'relative' }}>
                <PlaneTakeoff size={20} style={{ position: 'absolute', left: '8px', top: '8px', color: 'var(--text-disabled)' }} />
                <input 
                type="text" 
                name="flight_number" 
                className="form-input" 
                style={{ textTransform: 'uppercase' }}
                value={formData.flight_number}
                onChange={handleChange}
                required 
                />
            </div>
            </div>

            <div className="form-group">
            <label className="form-label">Flight Date</label>
            <div style={{ position: 'relative' }}>
                <Calendar size={20} style={{ position: 'absolute', left: '8px', top: '8px', color: 'var(--text-disabled)' }} />
                <input 
                type="date" 
                name="flight_date" 
                className="form-input" 
                value={formData.flight_date}
                onChange={handleChange}
                required 
                />
            </div>
            </div>
        </div>

        <div className="form-group">
          <label className="form-label">Aircraft Type</label>
          <select 
            name="aircraft_type" 
            className="form-select"
            value={formData.aircraft_type}
            onChange={handleChange}
            required
          >
            <option value="ATR">ATR (Rows 1-18, A,C,D,F)</option>
            <option value="Airbus 320">Airbus 320 (Rows 1-32, A-F)</option>
            <option value="Boeing 737 Max">Boeing 737 Max (Rows 1-32, A-F)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1.5rem' }}>
          {loading ? <div className="spinner"></div> : (
            <>
              <Send size={18} /> Generate Vouchers
            </>
          )}
        </button>
      </form>
    </div>
  );
}
