import { fetchRecipes } from '@actions/get';
import { titleSlugify } from '@libs/utils';
import Link from 'next/link';
import React from 'react';

import styles from './recipes.module.scss';
import { Clock, Utensils } from 'lucide-react';

const RecipesLandingPage = async () => {
  const data = await fetchRecipes();

  const formatTotalCookTime = (
    prepTime: number | null,
    cookTime: number | null
  ) => {
    const totalCookTime = (prepTime || 0) + (cookTime || 0);
    const hours = Math.floor(totalCookTime / 60);
    const minutes = totalCookTime % 60;
    return `${hours > 0 ? `${hours}hrs ` : ''}${minutes}mins`;
  };

  return (
    <div className={styles['container']}>
      <h1>Recipes</h1>
      {/* TODO: add pagination and search functionality here */}
      <ul className={styles['recipe-list']}>
        {data.length > 0 ? (
          data.map((recipe) => (
            <li key={recipe.id}>
              <Link
                href={`/recipes/${titleSlugify(recipe.title)}`}
                className={styles['recipe-title']}
              >
                {recipe.title}
              </Link>
              <div className={styles['metadata']}>
                <span>
                  <Clock className={styles['icon']} />
                  {formatTotalCookTime(
                    recipe.prepTimeInMinutes,
                    recipe.cookTimeInMinutes
                  )}
                </span>
                <span>
                  <Utensils className={styles['icon']} />
                  Serves {recipe.servings}
                </span>
              </div>
            </li>
          ))
        ) : (
          <h4>No Recipes found</h4>
        )}
      </ul>
    </div>
  );
};

export default RecipesLandingPage;
