import { fetchRecipe } from '@actions/get';

interface RecipeProps {
  // params is next.js dynamic route params
  params: Promise<{ title: string }>; // taken from folder name [title]
}

const RecipeDetailPage = async ({ params }: RecipeProps) => {
  const { title } = await params;
  const recipe = await fetchRecipe(title);
  const recipeName = recipe?.title || 'Recipe Not Found';

  return <div>Recipe: {recipeName}</div>;
};

export default RecipeDetailPage;
