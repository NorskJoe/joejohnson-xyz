'use client';

import { MeasurementType } from '../../../../shared/measurements.model';
import z from 'zod';
import { fetchRecipe } from '../../../../actions/get';
import { useFieldArray, useForm } from 'react-hook-form';
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
      const data = await fetchRecipe(title);
      if (data) {
        setRecipe({
          title: data.title,
          description: data.description || '',
          ingredients: data.ingredients.map((ingredient) => ({
            ingredient: ingredient.name,
            quantity: ingredient.amount,
            measurement: ingredient.measurement as MeasurementType,
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
      const recipe = await fetchRecipe(title);
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  return (
    <>
      <div>EditRecipePage for {recipe?.title}</div>
      <form>
        <input
          {...register('title')}
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipe?.title || ''}
        />
        <textarea
          {...register('description')}
          name="description"
          placeholder="Recipe Description"
        ></textarea>
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
        />
        {fields.map((ing, index) => (
          <div key={ing.id}>
            <input
              {...register(`ingredients.${index}.ingredient`)}
              type="text"
              placeholder="Ingredient name"
            />
            <input
              {...register(`ingredients.${index}.quantity`)}
              type="number"
              placeholder="Quantity"
            />
            <select {...register(`ingredients.${index}.measurement`)}>
              {Object.values(MeasurementType).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        ))}
        <input
          {...register('instructions')}
          type="text"
          name="instructions"
          placeholder="Instructions"
        />
        <input
          {...register('prepTimeInMinutes')}
          type="number"
          name="prepTimeInMinutes"
          placeholder="Preparation Time (minutes)"
        />
        <input
          {...register('cookTimeInMinutes')}
          type="number"
          name="cookTimeInMinutes"
          placeholder="Cooking Time (minutes)"
        />
        <input
          {...register('servings')}
          type="number"
          name="servings"
          placeholder="Servings"
        />
        <input
          {...register('tags')}
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
        />
        <button type="submit">Add Recipe</button>
        <button
          type="button"
          onClick={() =>
            append({
              ingredient: '',
              quantity: 0,
              measurement: MeasurementType.OTHER,
            })
          }
        >
          Add Ingredient
        </button>
        <button type="button" onClick={() => remove(fields.length - 1)}>
          Remove Last Ingredient
        </button>
      </form>
    </>
  );
};

export default EditRecipePage;
