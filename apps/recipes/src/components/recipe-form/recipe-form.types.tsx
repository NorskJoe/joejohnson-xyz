import { RecipePayload } from '@shared/prisma-payloads/recipe-payload';

export interface RecipeFormProps {
  recipe?: RecipePayload;
  mode: 'create' | 'edit';
}
