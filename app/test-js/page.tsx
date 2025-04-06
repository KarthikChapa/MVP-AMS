'use client';

import { useState, useEffect } from 'react';

export default function TestJS() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">JavaScript Test Page</h1>
      
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <p>Client-side rendering status: {mounted ? 'Working!' : 'Not working'}</p>
      </div>
      
      <div className="mb-6">
        <p className="mb-2">Counter: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
      
      <p className="text-sm text-gray-500">
        If you can see this page with working buttons, client-side JavaScript is functioning correctly!
      </p>
    </div>
  );
} 