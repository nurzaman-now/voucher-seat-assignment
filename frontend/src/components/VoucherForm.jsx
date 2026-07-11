import React, { useState } from 'react';
import { PlaneTakeoff, User, Calendar, Hash, AlertCircle, Send } from 'lucide-react';
import Input from './Input';
import Button from './Button';

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
    <div className="w-full">
      <h2 className="text-2xl text-gray-800 font-bold tracking-tight mb-2">Flight Details</h2>
      <p className="text-gray-500 text-sm mb-8">Enter the information below to assign seats for the voucher winners.</p>

      {error && (
        <div className="p-4 rounded-lg mb-6 flex items-start gap-3 font-medium bg-red-50 text-red-700 text-sm border border-red-200">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Crew Name"
          icon={<User size={18} />}
          type="text"
          name="crew_name"
          wrapperClassName="mb-5"
          value={formData.crew_name}
          onChange={handleChange}
          placeholder=""
          required
        />

        <Input
          label="Crew ID"
          icon={<Hash size={18} />}
          type="text"
          name="crew_id"
          wrapperClassName="mb-5"
          value={formData.crew_id}
          onChange={handleChange}
          placeholder=""
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <Input
            label="Flight Number"
            icon={<PlaneTakeoff size={18} />}
            type="text"
            name="flight_number"
            value={formData.flight_number}
            onChange={handleChange}
            placeholder=""
            required
          />

          <Input
            label="Flight Date"
            icon={<Calendar size={18} />}
            type="date"
            name="flight_date"
            wrapperClassName="mb-0"
            value={formData.flight_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-8 relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Aircraft Type</label>
          <select
            name="aircraft_type"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
            value={formData.aircraft_type}
            onChange={handleChange}
            required
          >
            <option value="ATR">ATR (Rows 1-18, A,C,D,F)</option>
            <option value="Airbus 320">Airbus 320 (Rows 1-32, A-F)</option>
            <option value="Boeing 737 Max">Boeing 737 Max (Rows 1-32, A-F)</option>
          </select>
        </div>

        <Button type="submit" className="w-full" loading={loading} icon={<Send size={18} />}>
          Generate Vouchers
        </Button>
      </form>
    </div>
  );
}
