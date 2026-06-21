// app/page.tsx - Updated with Pakistani Green + Surf Blue/Violet
'use client';

import { useState } from 'react';
import ProductSelector from '@/components/ProductSelector';
import BatchInput from '@/components/BatchInput';
import ResultTable from '@/components/ResultTable';
import { ProductFormula, CalculatedIngredient } from '@/types/product';
import { calculateIngredients } from '@/lib/calculator';

import surfExcelFormula from '@/data/surf-excel.json';

const products: ProductFormula[] = [
  surfExcelFormula as ProductFormula,
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<ProductFormula>(products[0]);
  const [batchSize, setBatchSize] = useState<number>(10);
  const [calculatedIngredients, setCalculatedIngredients] = useState<CalculatedIngredient[]>(
    calculateIngredients(products[0], 10)
  );

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId) || products[0];
    setSelectedProduct(product);
    setCalculatedIngredients(calculateIngredients(product, batchSize));
  };

  const handleBatchSizeChange = (size: number) => {
    setBatchSize(size);
    setCalculatedIngredients(calculateIngredients(selectedProduct, size));
  };

  return (
    <main className="container-custom">
      {/* Header with Pakistani Green */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-4xl">🧼</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-pakistan-green">
            Pakeza<span className="text-surf-blue">™</span>
          </h1>
        </div>
        <p className="text-sm text-slate-500 font-medium">
          Detergent Formula Calculator
        </p>
        <div className="inline-block mt-3 px-4 py-1.5 bg-pakistan-green-50 text-pakistan-green rounded-full text-xs font-medium border border-pakistan-green-200">
          🇵🇰 Made in Pakistan — Surf Excel Grade
        </div>
      </div>

      {/* Product Info - Pakistani Green theme */}
      {selectedProduct && (
        <div className="card-glass mb-6 border-pakistan-green-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-pakistan-green text-base sm:text-lg">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-slate-400">{selectedProduct.brand}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-green">LABSA {selectedProduct.labsaPercentage}%</span>
              <span className="badge badge-blue">{selectedProduct.targetQuality}</span>
            </div>
          </div>
          {selectedProduct.notes && (
            <p className="mt-3 text-xs text-slate-600 bg-pakistan-green-50 p-2.5 rounded-lg border border-pakistan-green-100">
              {selectedProduct.notes}
            </p>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="grid gap-4 mb-6">
        <div className="card">
          <label className="block text-xs font-medium text-pakistan-green uppercase tracking-wider mb-2.5">
            Select Product
          </label>
          <ProductSelector
            products={products}
            selectedProduct={selectedProduct}
            onSelect={handleProductSelect}
          />
        </div>

        <div className="card">
          <label className="block text-xs font-medium text-pakistan-green uppercase tracking-wider mb-2.5">
            Batch Size
          </label>
          <BatchInput
            batchSize={batchSize}
            onChange={handleBatchSizeChange}
          />
        </div>
      </div>

      {/* Results */}
      {calculatedIngredients && calculatedIngredients.length > 0 && (
        <div className="card-glass">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-pakistan-green text-sm">
              📊 Ingredients for {batchSize} kg
            </h3>
            <span className="text-xs text-slate-400">
              {calculatedIngredients.length} items
            </span>
          </div>
          <ResultTable ingredients={calculatedIngredients} batchSize={batchSize} />
        </div>
      )}

      {/* Quick Stats with Surf Colors */}
      {selectedProduct && calculatedIngredients && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white rounded-xl p-3 text-center border border-pakistan-green-200 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">Total Weight</div>
            <div className="font-bold text-pakistan-green text-base mt-0.5">
              {(calculatedIngredients.reduce((sum, ing) => sum + ing.weight, 0) / 1000).toFixed(2)} kg
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border border-surf-blue-200 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">Solids</div>
            <div className="font-bold text-surf-blue text-base mt-0.5">
              {(calculatedIngredients.filter(ing => !ing.isProcessingAid).reduce((sum, ing) => sum + ing.weight, 0) / 1000).toFixed(2)} kg
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border border-surf-violet-200 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">Water</div>
            <div className="font-bold text-surf-violet text-base mt-0.5">
              {(calculatedIngredients.filter(ing => ing.isProcessingAid).reduce((sum, ing) => sum + ing.weight, 0) / 1000).toFixed(2)} kg
            </div>
          </div>
        </div>
      )}

      {/* Safety */}
      {selectedProduct?.safetyWarnings && (
        <details className="mt-6">
          <summary className="cursor-pointer text-sm font-medium text-amber-700 bg-amber-50 rounded-xl px-4 py-3 border border-amber-100 hover:bg-amber-100/50 transition-colors">
            ⚠️ Safety Information
          </summary>
          <div className="mt-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <ul className="space-y-2">
              {selectedProduct.safetyWarnings.map((warning, index) => (
                <li key={index} className="text-xs text-slate-700 flex gap-2 items-start">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-slate-400 border-t border-pakistan-green-100 pt-4">
        <span className="text-pakistan-green">🇵🇰 Pakeza™</span> — Made in Pakistan
      </div>
    </main>
  );
}