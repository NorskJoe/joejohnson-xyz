'use server';

import { prisma } from '@libs/db';
import { titleSlugify, stringToMeasurementType } from '@libs/utils';

export const createRecipe = async (formData: FormData) => {
  const result = await prisma.recipe.create({
    data: {
      title: formData.get('title') as string,
      slug: titleSlugify(formData.get('title') as string),
      description: formData.get('description') as string,
      recipeIngredients: {
        create: JSON.parse(formData.get('ingredients') as string).map(
          (ing: { name: string; quantity: number; measurement: string }) => ({
            quantity: ing.quantity,
            ingredient: { create: { name: ing.name } },
            measurement: {
              connectOrCreate: {
                where: { type: stringToMeasurementType(ing.measurement) },
                create: { type: stringToMeasurementType(ing.measurement) },
              },
            },
          })
        ),
      },
      instructions: (formData.get('instructions') as string)
        .split(',')
        .map((s) => s.trim()),
      prepTimeInMinutes: parseInt(formData.get('prepTimeInMinutes') as string),
      cookTimeInMinutes: parseInt(formData.get('cookTimeInMinutes') as string),
      servings: parseInt(formData.get('servings') as string),
      tags: (formData.get('tags') as string).split(',').map((s) => s.trim()),
    },
  });
  return result;
};
