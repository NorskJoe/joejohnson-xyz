'use server';

import { prisma } from '@libs/db';
import { stringToMeasurementType, titleSlugify } from '@libs/utils';

/**
 * TODO: update function so that you can change the recipe name and slug when updating
 *  */
export const updateRecipe = async (formData: FormData) => {
  const slug = titleSlugify(formData.get('title') as string);
  const recipe = await prisma.recipe.findUnique({
    where: { slug: slug },
    select: { id: true },
  });
  const result = await prisma.recipe.update({
    where: { slug: slug },
    include: {
      recipeIngredients: {
        include: {
          ingredient: true,
          measurement: true,
        },
      },
    },
    data: {
      title: formData.get('title') as string,
      slug: slug,
      description: formData.get('description') as string,
      recipeIngredients: {
        deleteMany: { recipeId: recipe?.id },
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
      instructions: JSON.parse(formData.get('instructions') as string),
      prepTimeInMinutes: parseInt(formData.get('prepTime') as string),
      cookTimeInMinutes: parseInt(formData.get('cookTime') as string),
      servings: parseInt(formData.get('servings') as string),
      tags: (formData.get('tags') as string)
        .split(',')
        .map((tag) => tag.trim()),
    },
  });
  return result;
};
