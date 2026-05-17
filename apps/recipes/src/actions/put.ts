'use server';

import { prisma } from '@libs/db';
import { stringToMeasurementType, titleSlugify } from '@libs/utils';

/**
 * TODO: update function so that you can change the recipe name and slug when updating
 *  Creates a new ingredient record every update
 *  */
export const updateRecipe = async (formData: FormData) => {
  const slug = titleSlugify(formData.get('title') as string);
  const newIngredients = JSON.parse(formData.get('ingredients') as string);

  const recipe = await prisma.recipe.findUnique({
    where: { slug: slug },
    include: {
      recipeIngredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  // Find ingredients to remove (in current but not in new list)
  const newIngredientNames = new Set(
    newIngredients.map((ing: { name: string }) => ing.name)
  );
  const ingredientsToRemove = recipe.recipeIngredients
    .filter((ri) => !newIngredientNames.has(ri.ingredient.name))
    .map((ri) => ri.id);

  // Remove ingredients no longer associated
  if (ingredientsToRemove.length > 0) {
    await prisma.recipeIngredient.deleteMany({
      where: { id: { in: ingredientsToRemove } },
    });
  }

  // Upsert ingredients (create new or update existing)
  for (const ing of newIngredients) {
    const existing = recipe.recipeIngredients.find(
      (ri) => ri.ingredient.name === ing.name
    );

    if (existing) {
      // Update existing ingredient association if quantity or measurement changed
      await prisma.recipeIngredient.update({
        where: { id: existing.id },
        data: {
          quantity: ing.quantity,
          measurement: {
            connectOrCreate: {
              where: { type: stringToMeasurementType(ing.measurement) },
              create: { type: stringToMeasurementType(ing.measurement) },
            },
          },
        },
      });
    } else {
      // Create new ingredient association
      await prisma.recipeIngredient.create({
        data: {
          quantity: ing.quantity,
          ingredient: {
            create: { name: ing.name },
          },
          measurement: {
            connectOrCreate: {
              where: { type: stringToMeasurementType(ing.measurement) },
              create: { type: stringToMeasurementType(ing.measurement) },
            },
          },
          recipe: {
            connect: { id: recipe.id },
          },
        },
      });
    }
  }

  // Update recipe details
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
