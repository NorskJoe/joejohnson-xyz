'use server';

import { prisma } from '../libs/db';
import { titleSlugify } from '../libs/utils';

export const fetchRecipes = async () => {
  const results = await prisma.recipe.findMany({
    orderBy: {
      title: 'asc',
    },
    // TODO: implement pagination
    take: 10,
    skip: 0,
  });
  if (results.length > 0) {
    return results;
  } else {
    return [];
  }
};

export const fetchRecipe = async (name: string) => {
  const result = await prisma.recipe.findUnique({
    where: {
      slug: titleSlugify(name),
    },
    include: {
      recipeIngredients: true,
    },
  });
  if (!result) {
    return null;
  }
  return result;
};
