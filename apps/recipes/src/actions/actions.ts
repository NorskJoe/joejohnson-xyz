"use server";

import { prisma } from "../lib/db";


export const fetchRecipes = async () => {
    const res = await prisma.recipe.findMany();
    if (!res) {
        throw new Error('Failed to fetch recipes');
    }
    return res;
}

export const fetchRecipeByName = async (name: string) => {
    const res = await prisma.recipe.findFirst({
        where: {
            name: name
        }
    });
    if (!res) {
        throw new Error('Failed to fetch recipe');
    }
    return res;
}