import { fetchRecipe } from '@actions/get';

import styles from './recipe-detail.module.scss';
import { measurementTypeToString } from '@libs/utils';

interface RecipeProps {
  // params is next.js dynamic route params
  params: Promise<{ title: string }>; // taken from folder name [title]
}

const RecipeDetailPage = async ({ params }: RecipeProps) => {
  const { title } = await params;
  const recipe = await fetchRecipe(title);
  const recipeName = recipe?.title || 'Recipe Not Found';

  return (
    <div className={styles['container']}>
      <h1 className={styles['recipe-name']}>{recipeName}</h1>
      {recipe ? (
        <>
          <div className={styles['recipe-info']}>
            <p>Prep Time: {recipe.prepTimeInMinutes} minutes</p>
            <p>Cook Time: {recipe.cookTimeInMinutes} minutes</p>
            <p>Servings: {recipe.servings}</p>
          </div>
          {recipe.description && (
            <p className={styles['recipe-description']}>{recipe.description}</p>
          )}
          <div className={styles['recipe-details']}>
            <div className={styles['list']}>
              <h3>Ingredients</h3>
              <ul>
                {recipe.recipeIngredients.map((ingredient, index) => (
                  <div key={index}>
                    <li>
                      {ingredient.quantity}
                      {measurementTypeToString(
                        ingredient.measurement.type
                      )}{' '}
                      {ingredient.ingredient?.name}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
            <div className={styles['list']}>
              <h3>Instructions</h3>
              <ul>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>

          <ul className={styles['tags']}>
            {recipe.tags.map((tag, index) => (
              <li className={styles['tag-item']} key={index}>
                {tag}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
};

export default RecipeDetailPage;
