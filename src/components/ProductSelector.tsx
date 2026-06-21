// components/ProductSelector.tsx - Updated with Surf colors
'use client';

import { ProductFormula } from '@/types/product';

interface ProductSelectorProps {
  products: ProductFormula[];
  selectedProduct: ProductFormula | null;
  onSelect: (productId: string) => void;
}

export default function ProductSelector({ products, selectedProduct, onSelect }: ProductSelectorProps) {
  return (
    <div className="relative">
      <select
        className="select-field"
        value={selectedProduct?.id || ''}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select a product...</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} - {product.brand}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-pakistan-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}