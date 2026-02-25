import Link from 'next/link';
import React from 'react';
import { fetchRecipes } from '../../actions/get';
import { titleSlugify } from '../../libs/utils';

const RecipesLandingPage = async () => {
  const data = await fetchRecipes();
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {data.map((recipe) => (
          <li key={recipe.id}>
            <Link href={`/recipes/${titleSlugify(recipe.title)}`}>
              {recipe.title}
            </Link>
            <Link href={`/admin/edit/${titleSlugify(recipe.title)}`}>
              Edit Recipe
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesLandingPage;
