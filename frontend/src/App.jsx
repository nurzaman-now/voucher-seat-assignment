import React, { useState } from 'react';
import { PlaneTakeoff } from 'lucide-react';
import VoucherForm from './components/VoucherForm';
import VoucherResult from './components/VoucherResult';

function App() {
  const [result, setResult] = useState(null);

  return (
    <>
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>

      <div className="app-container">
        {!result ? (
          <>
            <div className="material-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: 'var(--md-primary)', color: 'white' }}>
              <div style={{ padding: '1rem' }}>
                <PlaneTakeoff size={80} color="white" style={{ marginBottom: '1.5rem', dropShadow: '0 4px 6px rgba(0,0,0,0.3)' }} />
                <h3 className="title" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>AeroVoucher</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', marginTop: '1rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
                  A modern, reliable seat assignment system for airline voucher winners.
                  Fill out the crew information and flight details to generate 3 unique random seats instantly.
                </p>
              </div>
            </div>
            <VoucherForm onSuccess={(data) => setResult(data)} />
          </>
        ) : (
          <div style={{ gridColumn: '1 / -1', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
            <VoucherResult result={result} onReset={() => setResult(null)} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
