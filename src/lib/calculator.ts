// lib/calculator.ts
import { ProductFormula, CalculatedIngredient } from '@/types/product';

export function calculateIngredients(
  formula: ProductFormula,
  batchSize: number // in kg
): CalculatedIngredient[] {
  const batchWeightInGrams = batchSize * 1000;
  
  return formula.ingredients.map(ingredient => ({
    name: ingredient.name,
    percentage: ingredient.percentage,
    weight: parseFloat(((ingredient.percentage / 100) * batchWeightInGrams).toFixed(2)),
    role: ingredient.role,
    alternatives: ingredient.alternatives,
    note: ingredient.note,
    isProcessingAid: ingredient.name.includes('Water') || ingredient.role.includes('processing')
  }));
}

export function getBatchSizes(): number[] {
  return [0.5, 1, 2, 5, 10, 25, 50];
}

export function formatWeight(weight: number): string {
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(3)} kg`;
  }
  return `${weight.toFixed(2)} g`;
}

export function getTotalWeight(ingredients: CalculatedIngredient[]): number {
  return parseFloat(ingredients.reduce((sum, ing) => sum + ing.weight, 0).toFixed(2));
}

export function getTotalPercentage(ingredients: CalculatedIngredient[]): number {
  return parseFloat(ingredients.reduce((sum, ing) => sum + ing.percentage, 0).toFixed(1));
}

export function getSolidIngredients(ingredients: CalculatedIngredient[]): CalculatedIngredient[] {
  return ingredients.filter(ing => !ing.isProcessingAid);
}

export function getProcessingAids(ingredients: CalculatedIngredient[]): CalculatedIngredient[] {
  return ingredients.filter(ing => ing.isProcessingAid);
}