"use server";

import { prisma } from '../libs/db';

export const fetchRecipes = async () => {
    const results = await prisma.recipe.findMany();
    if (results.length > 0) {
        return results;
    } else {
        return [];
    }
}

export const fetchRecipeByName = async (name: string) => {
    const result = await prisma.recipe.findUnique({
        where: {
            title: name
        }
    });
    if (!result) {
        return null;
    }
    return result;
}