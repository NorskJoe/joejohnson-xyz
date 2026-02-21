"use server";

/**
 * Fetches recipes from the API. Mocked for now using json-server
 */

const API_URL = 'http://localhost:3030/recipes';

export const fetchRecipes = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error('Failed to fetch recipes');
    }
    return res.json();
}

export const fetchRecipeByName = async (name: string) => {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error('Failed to fetch recipe');
    }
    const allRecipes = await res.json();
    return allRecipes.find((recipe: any) => recipe.name.toLowerCase().replaceAll(' ','-') === name);
}