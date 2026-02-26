import { fetchRecipe } from '@actions/get';

interface RecipeProps {
  // params is next.js dynamic route params
  params: Promise<{ title: string }>; // taken from folder name [title]
}

const RecipeDetailPage = async ({ params }: RecipeProps) => {
  const { title } = await params;
  const recipe = await fetchRecipe(title);
  const recipeName = recipe?.title || 'Recipe Not Found';

  return (
    <div>
      <h1>{recipeName}</h1>
      {recipe ? (
        <div>
          <p>{recipe.description}</p>
          <ul>
            {recipe.recipeIngredients.map((ingredient, index) => (
              <div key={index}>
                <li>
                  {ingredient.ingredient?.name} {ingredient.quantity}{' '}
                  {ingredient.measurement.type}
                </li>
              </div>
            ))}
          </ul>
          <ul>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <p>Prep Time: {recipe.prepTimeInMinutes} minutes</p>
          <p>Cook Time: {recipe.cookTimeInMinutes} minutes</p>
          <p>Servings: {recipe.servings}</p>
          <ul>
            {recipe.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
};

export default RecipeDetailPage;
