"use server";

import { prisma } from '../libs/db';

export const fetchRecipes = async () => {
    const results = await prisma.recipe.findMany({
        orderBy: {
            title: 'asc'
        },
        // TODO: implement pagination
        take: 10,
        skip: 0
    });
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