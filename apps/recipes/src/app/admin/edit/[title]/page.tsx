'use client';

import { MeasurementType } from '../../../../shared/measurements.model';
import z from 'zod';
import { fetchRecipeByName } from '../../../../actions/get';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

interface EditRecipePageProps {
  // params is next.js dynamic route params
  params: Promise<{ title: string }>; // taken from folder name [title]
}

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(
    z.object({
      ingredient: z.string(),
      quantity: z.number(),
      measurement: z.enum(MeasurementType),
    })
  ),
  instructions: z.array(z.string()),
  prepTimeInMinutes: z.coerce.number(),
  cookTimeInMinutes: z.coerce.number(),
  servings: z.coerce.number(),
  tags: z.string(),
});

const EditRecipePage = (props: EditRecipePageProps) => {
  const [recipe, setRecipe] = useState<z.infer<typeof formSchema> | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      const { title } = await props.params;
      const data = await fetchRecipeByName(title);
      if (data) {
        setRecipe({
          title: data.title,
          description: data.description || '',
          ingredients: data.ingredients.map((ingredient) => ({
            ingredient: ingredient.name,
            quantity: ingredient.amount,
            measurement: ingredient.measurement.type as MeasurementType,
          })),
          instructions: data.instructions,
          prepTimeInMinutes: data.prepTimeInMinutes || 0,
          cookTimeInMinutes: data.cookTimeInMinutes || 0,
          servings: data.servings || 0,
          tags:
            typeof data.tags === 'string' ? data.tags : data.tags.join(', '),
        });
      }
    };
    loadRecipe();
  }, []);

  const { register, control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const { title } = await props.params;
      const recipe = await fetchRecipeByName(title);
      return {
        title: recipe?.title || '',
        description: recipe?.description || '',
        ingredients: [
          { ingredient: '', quantity: 0, measurement: MeasurementType.OTHER },
        ],
        instructions: recipe?.instructions || [''],
        prepTimeInMinutes: recipe?.prepTimeInMinutes || 0,
        cookTimeInMinutes: recipe?.cookTimeInMinutes || 0,
        servings: recipe?.servings || 0,
        tags: recipe?.tags.join(', ') || '',
      };
    },
  });

  return (
    <>
      <div>EditRecipePage for {recipe?.title}</div>
      <form></form>
    </>
  );
};

export default EditRecipePage;
