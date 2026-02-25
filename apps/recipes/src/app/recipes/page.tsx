import Link from 'next/link';
import React from 'react';
import { fetchRecipes } from '../../actions/get';

const RecipesLandingPage = async () => {
  const data = await fetchRecipes();
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {data.map((recipe) => (
          <li key={recipe.id}>
            <Link
              href={`/recipes/${recipe.title
                .toLowerCase()
                .replaceAll(' ', '-')}`}
            >
              {recipe.title}
            </Link>
            <Link href={`/admin/edit/${recipe.title}`}>Edit Recipe</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesLandingPage;
