'use server';

import { prisma } from '../libs/db';
import { stringToMeasurementType } from '../libs/utils';

export const createRecipe = async (formData: FormData) => {
  const result = await prisma.recipe.create({
    data: {
      title: formData.get('title') as string,
      slug: (formData.get('title') as string)
        .toLowerCase()
        .replace(/\s+/g, '-'),
      description: formData.get('description') as string,
      recipeIngredients: {
        create: JSON.parse(formData.get('ingredients') as string).map(
          (ing: { name: string; quantity: number; measurement: string }) => ({
            quantity: ing.quantity,
            ingredient: { create: { name: ing.name } },
            measurement: {
              create: { type: stringToMeasurementType(ing.measurement) },
            },
          })
        ),
      },
      instructions: (formData.get('instructions') as string)
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
