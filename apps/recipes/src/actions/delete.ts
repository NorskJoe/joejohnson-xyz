'use server';

import { prisma } from '@libs/db';

export const deleteRecipe = async (slug: string) => {
  const result = await prisma.recipe.delete({
    where: { slug: slug },
  });
  return result;
};
