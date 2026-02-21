import { fetchRecipeByName } from '../../../actions/fetch';

interface RecipeProps {
  // params is next.js dynamic route params
  params: Promise<{ name: string }>; // taken from folder name [name]
}

const RecipeDetailPage = async ({ params }: RecipeProps) => {
  const { name } = await params;
  const recipe = await fetchRecipeByName(name);
  const recipeName = recipe?.name || 'Recipe Not Found';

  return <div>Recipe: {recipeName}</div>;
};

export default RecipeDetailPage;
