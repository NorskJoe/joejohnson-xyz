// import z from 'zod';
// import { useFieldArray, useForm } from 'react-hook-form';
import { fetchRecipe } from '@actions/get';
import RecipeForm from '@components/recipe-form/recipe-form';

import { titleSlugify } from '@libs/utils';

interface EditRecipePageProps {
  // params is next.js dynamic route params
  params: Promise<{ title: string }>; // taken from folder name [title]
}

const EditRecipePage = async (props: EditRecipePageProps) => {
  const title = (await props.params).title;
  const recipe = await fetchRecipe(titleSlugify(title));

  return (
    <>
      <div>Edit Recipe Page for {recipe?.title}</div>
      <RecipeForm recipe={recipe || undefined} mode="edit" />
    </>
  );
};

export default EditRecipePage;
