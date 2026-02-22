'use server';

import { prisma } from '../libs/db';

export const createRecipe = async (formData: FormData) => {
  const result = await prisma.recipe.create({
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      ingredients: (formData.get('ingredients') as string)
        .split(',')
        .map((s) => s.trim()),
      steps: (formData.get('instructions') as string)
        .split(',')
        .map((s) => s.trim()),
      prepTime: parseInt(formData.get('prepTime') as string),
      cookTime: parseInt(formData.get('cookTime') as string),
      servings: parseInt(formData.get('servings') as string),
      tags: (formData.get('tags') as string).split(',').map((s) => s.trim()),
    },
  });
  return result;
};
