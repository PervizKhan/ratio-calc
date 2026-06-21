// components/ResultTable.tsx - Updated with Surf colors
'use client';

import { CalculatedIngredient } from '@/types/product';
import { formatWeight } from '@/lib/calculator';

interface ResultTableProps {
  ingredients: CalculatedIngredient[];
  batchSize: number;
}

export default function ResultTable({ ingredients, batchSize }: ResultTableProps) {
  const solids = ingredients.filter(ing => !ing.isProcessingAid);
  const processingAids = ingredients.filter(ing => ing.isProcessingAid);
  
  return (
    <div className="space-y-4">
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {ingredients.map((ingredient, index) => (
          <div 
            key={index}
            className={`bg-white rounded-xl p-4 border ${
              ingredient.isProcessingAid 
                ? 'border-surf-violet-200 bg-surf-violet-50/20' 
                : 'border-pakistan-green-100'
            }`}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-medium text-slate-800 text-sm ${
                    ingredient.isProcessingAid ? 'text-surf-violet' : 'text-pakistan-green'
                  }`}>
                    {ingredient.name}
                  </span>
                  {ingredient.isProcessingAid && (
                    <span className="badge badge-violet text-[10px] px-2 py-0.5">Processing</span>
                  )}
                </div>
                {ingredient.note && (
                  <p className="text-xs text-slate-400 mt-0.5">{ingredient.note}</p>
                )}
                <p className="text-xs text-slate-400 mt-1">{ingredient.role}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-semibold text-surf-blue text-sm">
                  {formatWeight(ingredient.weight)}
                </div>
                <div className="text-xs text-slate-400">{ingredient.percentage.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-pakistan-green-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-pakistan-green uppercase tracking-wider">
                Ingredient
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-pakistan-green uppercase tracking-wider">
                Weight
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr
                key={index}
                className={`border-b border-pakistan-green-50 ${
                  ingredient.isProcessingAid 
                    ? 'bg-surf-violet-50/10' 
                    : 'hover:bg-pakistan-green-50/30'
                }`}
              >
                <td className="px-4 py-3.5">
                  <div>
                    <span className={`text-sm font-medium ${
                      ingredient.isProcessingAid ? 'text-surf-violet' : 'text-pakistan-green'
                    }`}>
                      {ingredient.name}
                    </span>
                    {ingredient.isProcessingAid && (
                      <span className="ml-2 text-xs text-surf-violet-400">(processing)</span>
                    )}
                    {ingredient.note && (
                      <div className="text-xs text-slate-400 mt-0.5">{ingredient.note}</div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <div className="font-semibold text-surf-blue text-sm">
                    {formatWeight(ingredient.weight)}
                  </div>
                  <div className="text-xs text-slate-400">{ingredient.percentage.toFixed(1)}%</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section with Surf Colors */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-gradient-to-br from-pakistan-green-50 to-white rounded-xl p-4 border border-pakistan-green-200">
          <div className="text-xs text-pakistan-green font-medium">Final Powder</div>
          <div className="text-xl font-bold text-pakistan-green mt-1">
            {formatWeight(solids.reduce((sum, ing) => sum + ing.weight, 0))}
          </div>
          <div className="text-xs text-pakistan-green-500">
            {solids.reduce((sum, ing) => sum + ing.percentage, 0).toFixed(1)}% of batch
          </div>
          <div className="text-[10px] text-pakistan-green-400 mt-0.5">
            After drying (water evaporates)
          </div>
        </div>
        
        {processingAids.length > 0 && (
          <div className="bg-gradient-to-br from-surf-violet-50 to-white rounded-xl p-4 border border-surf-violet-200">
            <div className="text-xs text-surf-violet font-medium">Processing Water</div>
            <div className="text-xl font-bold text-surf-violet mt-1">
              {formatWeight(processingAids.reduce((sum, ing) => sum + ing.weight, 0))}
            </div>
            <div className="text-xs text-surf-violet-500">
              {processingAids.reduce((sum, ing) => sum + ing.percentage, 0).toFixed(1)}% of batch
            </div>
            <div className="text-[10px] text-surf-violet-400 mt-0.5">
              Evaporates during drying
            </div>
          </div>
        )}
      </div>

      {/* Small batch warning */}
      {batchSize < 2 && (
        <div className="mt-4 p-3 bg-amber-50/80 border border-amber-100 rounded-xl text-xs text-amber-700">
          ⚠️ Small batch ({batchSize}kg) - some ingredients need precise measurement
        </div>
      )}
    </div>
  );
}