// components/BatchInput.tsx - Updated with Pakistani Green
'use client';

import { getBatchSizes } from '@/lib/calculator';

interface BatchInputProps {
  batchSize: number;
  onChange: (size: number) => void;
}

export default function BatchInput({ batchSize, onChange }: BatchInputProps) {
  const batchSizes = getBatchSizes();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-pakistan-green uppercase tracking-wider mb-2.5">
          Quick Select
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
          {batchSizes.map((size) => (
            <button
              key={size}
              onClick={() => onChange(size)}
              className={`px-2 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                batchSize === size
                  ? 'bg-pakistan-green text-white shadow-sm'
                  : 'bg-pakistan-green-50 text-pakistan-green hover:bg-pakistan-green-100 border border-pakistan-green-200'
              }`}
            >
              {size}kg
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-medium text-pakistan-green uppercase tracking-wider mb-2.5">
          Custom Size
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            className="input-field"
            min="0.1"
            step="0.1"
            value={batchSize}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value > 0) {
                onChange(value);
              }
            }}
            placeholder="Enter custom size..."
          />
          <span className="inline-flex items-center px-4 bg-pakistan-green-50 rounded-xl text-pakistan-green font-medium text-sm border border-pakistan-green-200">
            kg
          </span>
        </div>
      </div>
    </div>
  );
}