import React from 'react';

export default function Button({ children, loading, icon, variant = 'primary', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light hover:shadow-lg",
    secondary: "bg-secondary text-gray-800 hover:bg-gray-300",
  };

  return (
    <button className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <div className="w-5 h-5 border-[3px] border-white/30 rounded-full border-t-white animate-spin"></div>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
