import React from 'react';

export default function Input({ label, icon, wrapperClassName = '', ...props }) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input 
          className={`w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2.5 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${icon ? 'pl-10' : 'pl-4'} ${props.className || ''}`}
          {...props}
        />
      </div>
    </div>
  );
}
