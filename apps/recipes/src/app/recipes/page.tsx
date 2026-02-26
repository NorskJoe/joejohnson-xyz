import { fetchRecipes } from '@actions/get';
import ClientButton from '@components/client-button/client-button';
import { titleSlugify } from '@libs/utils';
import Link from 'next/link';
import React from 'react';

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
            <ClientButton
              buttonText="Delete Recipe"
              action="delete"
              recordId={recipe.slug}
              rerender={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesLandingPage;
