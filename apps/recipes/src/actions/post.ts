'use server';

import { prisma } from '../libs/db';
import { MeasurementType } from '../shared/measurements.model';

function stringToMeasurementType(str: string): MeasurementType {
  return MeasurementType[
    str as keyof typeof MeasurementType
  ] as MeasurementType;
}

export const createRecipe = async (formData: FormData) => {
  const result = await prisma.recipe.create({
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      ingredients: {
        create: (
          JSON.parse(formData.get('ingredients') as string) as {
            ingredient: string;
            quantity: number;
            measurement: string;
          }[]
        ).map((ing) => ({
          name: ing.ingredient,
          amount: ing.quantity,
          measurement: stringToMeasurementType(ing.measurement),
        })),
      },
      steps: (formData.get('instructions') as string)
        .split(',')
        .map((s) => s.trim()),
      prepTimeInMinutes: parseInt(formData.get('prepTime') as string),
      cookTimeInMinutes: parseInt(formData.get('cookTime') as string),
      servings: parseInt(formData.get('servings') as string),
      tags: (formData.get('tags') as string).split(',').map((s) => s.trim()),
    },
  });
  return result;
};
