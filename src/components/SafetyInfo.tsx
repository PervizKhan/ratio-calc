// components/SafetyInfo.tsx
'use client';

interface SafetyInfoProps {
  warnings: string[];
  equipment?: string[];
}

export default function SafetyInfo({ warnings, equipment }: SafetyInfoProps) {
  return (
    <div className="bg-red-50 rounded-xl shadow-lg p-6 border border-red-200">
      <h2 className="text-xl font-semibold text-red-800 mb-4">⚠️ Safety Information</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-red-700 mb-2">Safety Warnings</h3>
          <ul className="space-y-2">
            {warnings.map((warning, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-500 font-bold">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {equipment && (
          <div>
            <h3 className="font-semibold text-blue-700 mb-2">Equipment Needed</h3>
            <ul className="space-y-2">
              {equipment.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-300">
        <p className="text-sm text-red-800 font-semibold">
          ⚡ Emergency: For skin contact with NaOH or LABSA - rinse immediately with water for 15 minutes.
          For eye contact - flush with water for 15-20 minutes and seek medical attention.
        </p>
      </div>
    </div>
  );
}