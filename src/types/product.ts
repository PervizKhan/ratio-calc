// types/product.ts
export interface Ingredient {
  name: string;
  percentage: number;
  role: string;
  alternatives?: string[];
  note?: string;
  isProcessingAid?: boolean;
}

export interface ProductFormula {
  id: string;
  name: string;
  brand: string;
  description: string;
  targetQuality: string;
  labsaPercentage: number;
  ingredients: Ingredient[];
  totalPercentage: number;
  notes?: string;
  safetyWarnings?: string[];
  equipmentNeeded?: string[];
}

export interface CalculatedIngredient {
  name: string;
  percentage: number;
  weight: number;
  role: string;
  alternatives?: string[];
  note?: string;
  isProcessingAid?: boolean;
}