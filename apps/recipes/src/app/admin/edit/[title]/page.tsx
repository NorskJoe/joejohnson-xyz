'use client';

import z from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { fetchRecipe } from '@actions/get';
import { MeasurementType } from '@generated/enums';
import { updateRecipe } from '@actions/put';

interface EditRecipePageProps {
  // params is next.js dynamic route params
  params: Promise<{ title: string }>; // taken from folder name [title]
}

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.coerce.number(),
      measurement: z.enum(MeasurementType),
    })
  ),
  instructions: z.array(z.object({ content: z.string() })), // no array of primitive allowed
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
          ingredients: data.recipeIngredients.map((recipeIngredient) => ({
            name: recipeIngredient.ingredient.name,
            quantity: recipeIngredient.quantity,
            measurement: recipeIngredient.measurement.type as MeasurementType,
          })),
          instructions: data.instructions.map((instruction) => ({
            content: instruction,
          })),
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
        ingredients:
          recipe?.recipeIngredients.map((ri) => ({
            name: ri.ingredient.name,
            quantity: ri.quantity,
            measurement: ri.measurement.type as MeasurementType,
          })) || [],
        instructions:
          recipe?.instructions.map((instruction) => ({
            content: instruction,
          })) || [],
        prepTimeInMinutes: recipe?.prepTimeInMinutes || 0,
        cookTimeInMinutes: recipe?.cookTimeInMinutes || 0,
        servings: recipe?.servings || 0,
        tags: recipe?.tags.join(', ') || '',
      };
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: 'instructions',
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.warn('submitted edit ', data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('ingredients', JSON.stringify(data.ingredients));
    formData.append(
      'instructions',
      data.instructions.map((i) => i.content).join(',')
    );
    formData.append('prepTime', data.prepTimeInMinutes.toString());
    formData.append('cookTime', data.cookTimeInMinutes.toString());
    formData.append('servings', data.servings.toString());
    formData.append('tags', data.tags);
    console.warn('formData ', [...formData]);
    await updateRecipe(formData);
  };

  return (
    <>
      <div>Edit Recipe Page for {recipe?.title}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {ingredientFields.map((ing, index) => (
          <div key={ing.id}>
            <input
              {...register(`ingredients.${index}.name`)}
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
        {instructionFields.map((inst, index) => (
          <div key={inst.id}>
            <input
              {...register(`instructions.${index}.content`)}
              type="text"
              placeholder={`Step ${index + 1}`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendInstruction({ content: '' })}
        >
          Add Instruction
        </button>
        <button
          type="button"
          onClick={() => removeInstruction(instructionFields.length - 1)}
        >
          Remove Last Instruction
        </button>
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
        <button type="submit">Update Recipe</button>
        <button
          type="button"
          onClick={() =>
            appendIngredient({
              name: '',
              quantity: 0,
              measurement: MeasurementType.OTHER,
            })
          }
        >
          Add Ingredient
        </button>
        <button
          type="button"
          onClick={() => removeIngredient(ingredientFields.length - 1)}
        >
          Remove Last Ingredient
        </button>
      </form>
    </>
  );
};

export default EditRecipePage;
