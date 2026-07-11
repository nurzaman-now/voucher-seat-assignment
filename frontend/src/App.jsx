import React, { useState } from 'react';
import { PlaneTakeoff } from 'lucide-react';
import VoucherForm from './components/VoucherForm';
import VoucherResult from './components/VoucherResult';

function App() {
  const [result, setResult] = useState(null);

  return (
    <>
      <div className="fixed bg-white/80 rounded-full -z-10 shadow-sm w-[200px] h-[60px] top-[15%] -left-[200px] animate-[moveClouds_40s_linear_infinite] before:absolute before:bg-white before:rounded-full before:w-[100px] before:h-[100px] before:-top-[40px] before:left-[20px] after:absolute after:bg-white after:rounded-full after:w-[70px] after:h-[70px] after:-top-[30px] after:right-[20px]"></div>
      <div className="fixed bg-white/80 rounded-full -z-10 shadow-sm w-[150px] h-[50px] top-[40%] -left-[200px] animate-[moveClouds_30s_linear_infinite] -animate-delay-15s scale-75 before:absolute before:bg-white before:rounded-full before:w-[80px] before:h-[80px] before:-top-[30px] before:left-[20px] after:absolute after:bg-white after:rounded-full after:w-[50px] after:h-[50px] after:-top-[20px] after:right-[20px]"></div>

      <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
        {!result ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-5/12 relative bg-[url('/airplane-bg.png')] bg-cover bg-center p-10 flex flex-col justify-center items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/30"></div>
              <div className="relative z-10 flex flex-col items-center">
                <PlaneTakeoff size={80} className="mb-6 drop-shadow-lg text-white" />
                <h3 className="text-white text-4xl font-bold tracking-tight mb-4 drop-shadow-md">AeroVoucher</h3>
                <p className="text-blue-50 mt-2 leading-relaxed text-lg drop-shadow-md font-medium">
                  A modern, reliable seat assignment system for airline voucher winners. Fill out the flight details to generate unique random seats instantly.
                </p>
              </div>
            </div>
            
            <div className="md:w-7/12 p-8 md:p-10">
              <VoucherForm onSuccess={(data) => setResult(data)} />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl mx-auto">
            <VoucherResult result={result} onReset={() => setResult(null)} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
