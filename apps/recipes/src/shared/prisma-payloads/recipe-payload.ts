import { RecipeGetPayload } from "@generated/models/Recipe";

export type RecipePayload = RecipeGetPayload<{
  include: {
    recipeIngredients: { include: { ingredient: true; measurement: true } };
  };
}>;