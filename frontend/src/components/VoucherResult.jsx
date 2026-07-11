import React from 'react';
import { Ticket, ArrowLeft, Plane, User, CalendarDays } from 'lucide-react';

export default function VoucherResult({ result, onReset }) {
  if (!result || !result.seats) return null;

  const { data, seats } = result;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl text-primary font-medium tracking-tight m-0">Boarding Passes</h2>
        <button 
          onClick={onReset} 
          className="inline-flex items-center justify-center gap-2 w-auto py-2 px-4 border-0 rounded bg-white text-primary font-medium uppercase tracking-wide cursor-pointer shadow-sm hover:shadow-md transition-shadow"
        >
          <ArrowLeft size={18} /> New Flight
        </button>
      </div>

      <div className="mb-8 flex gap-4 flex-wrap">
        <div className="flex-1 bg-white rounded-lg shadow-md py-4 px-6 flex items-center gap-4 transition-shadow hover:shadow-lg">
          <Plane size={32} className="text-primary" />
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Flight Number</div>
            <div className="text-xl font-bold text-primary">{data.flight_number?.toUpperCase()}</div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg shadow-md py-4 px-6 flex items-center gap-4 transition-shadow hover:shadow-lg">
          <CalendarDays size={32} className="text-primary" />
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Departure Date</div>
            <div className="text-xl font-bold text-primary">{data.flight_date}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {seats.map((seat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm flex relative overflow-hidden border-l-[6px] border-primary">
            <div className="flex-1 p-6">
              <div className="bg-gray-100 p-4 border-b border-gray-300 flex items-center gap-2 text-primary font-medium -mt-6 -mx-6 mb-6">
                <Plane size={18} />
                <span>{data.aircraft_type}</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Passenger</div>
                  <div className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    Voucher Winner #{index + 1}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Assigned By (Crew)</div>
                  <div className="text-lg font-medium text-gray-900">{data.crew_name}</div>
                </div>
              </div>
            </div>
            
            <div className="relative my-4 border-l-2 border-dashed border-gray-300 before:absolute before:content-[''] before:w-6 before:h-6 before:bg-primary-light before:rounded-full before:-left-[13px] before:-top-[24px] before:shadow-inner after:absolute after:content-[''] after:w-6 after:h-6 after:bg-primary-light after:rounded-full after:-left-[13px] after:-bottom-[24px] after:shadow-inner"></div>
            
            <div className="w-[120px] p-6 bg-gray-50 flex flex-col justify-center items-center rounded-r-xl">
              <div className="text-xs text-orange-500 uppercase tracking-wide mb-1">Seat</div>
              <div className="text-4xl font-bold text-orange-500 leading-none">{seat}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center text-green-700 flex items-center justify-center gap-3 text-lg font-medium">
        <Ticket size={24} />
        <span>Vouchers successfully generated and secured!</span>
      </div>
    </div>
  );
}
