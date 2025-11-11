import Link from 'next/link';
import React from 'react'
import { fetchRecipes } from '../../actions/fetch';

const Recipes = async () => {
    const data = await fetchRecipes();
  return (
    <div>
        <h1>Recipes</h1>
        <ul>
            {data.map((recipe: any) => (
                <li key={recipe.id}>
                    <Link href={`/recipes/${recipe.name.toLowerCase().replaceAll(' ','-')}`}>{recipe.name}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Recipes;