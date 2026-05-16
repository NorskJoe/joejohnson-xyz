import { fetchRecipe } from '@actions/get';

import styles from './recipe-detail.module.scss';
import { measurementTypeToString } from '@libs/utils';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

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
      {recipe ? (
        <>
          <div className={styles['header']}>
            <div className={styles['top-bar']}>
              <ul className={styles['tags']}>
                {recipe.tags.map((tag, index) => (
                  <li className={styles['tag-item']} key={index}>
                    {tag.toUpperCase()}
                  </li>
                ))}
              </ul>
              <div className={styles['edit-button-container']}>
                <Link
                  href={`/admin/edit/${title}`}
                  className={styles['edit-button']}
                >
                  <Pencil size={'1rem'} /> <span>Edit Recipe</span>
                </Link>
              </div>
            </div>
            <div className={styles['recipe-name']}>{recipeName}</div>
            <div className={styles['recipe-info']}>
              <div className={styles['recipe-info-item']}>
                <span>Servings</span>
                <span>{recipe.servings} People</span>
              </div>
              <div className={styles['recipe-info-item']}>
                <span>Prep Time</span>
                <span>{recipe.prepTimeInMinutes} mins</span>
              </div>
              <div className={styles['recipe-info-item']}>
                <span>Cook Time</span>
                <span>{recipe.cookTimeInMinutes} mins</span>
              </div>
            </div>
          </div>
          <div className={styles['recipe-body']}>
            <div className={styles['left-column']}>
              <h3 className={styles['section-title']}>Ingredients</h3>
              <div className={styles['ingredients-list']}>
                {recipe.recipeIngredients.map((ingredient, index) => (
                  <span className={styles['ingredient-item']} key={index}>
                    <input type="checkbox" className={styles['checkbox']} />
                    {ingredient.quantity}{' '}
                    {measurementTypeToString(ingredient.measurement.type)}{' '}
                    {ingredient.ingredient?.name}
                  </span>
                ))}
              </div>
              <div className={styles['quantity-stepper']}>{/* TODO */}</div>
            </div>
            <div className={styles['right-column']}>
              <h3 className={styles['section-title']}>Instructions</h3>
              <div className={styles['instruction-list']}>
                {recipe.instructions.map((instruction, index) => (
                  <div className={styles['instruction-item']} key={index}>
                    <div className={styles['instruction-step']}>
                      {index + 1}
                      <span className={styles['line']}> </span>
                    </div>
                    <div className={styles['instruction']}>{instruction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
};

export default RecipeDetailPage;
