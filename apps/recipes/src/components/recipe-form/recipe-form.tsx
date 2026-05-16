'use client';

import { RecipeFormProps } from './recipe-form.types';
import z from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MeasurementType } from '@generated/enums';
import { updateRecipe } from '@actions/put';
import { RecipePayload } from '@shared/prisma-payloads/recipe-payload';
import { createRecipe } from '@actions/post';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, 'Ingredient name is required'),
        quantity: z.coerce.number(),
        measurement: z.enum(MeasurementType),
      })
    )
    .min(1, 'At least one ingredient is required'),
  instructions: z
    .array(z.string())
    .min(1, 'At least one instruction is required'),
  prepTimeInMinutes: z.coerce.number().min(0, 'Preparation time must be set'),
  cookTimeInMinutes: z.coerce.number().min(0, 'Cooking time must be set'),
  servings: z.coerce.number().min(1, 'Servings must be at least 1'),
  tags: z.string(),
});

const RecipeForm = (props: RecipeFormProps) => {
  const isCreateMode = props.mode === 'create';
  let recipe: RecipePayload | undefined = undefined;
  if (props.recipe) {
    recipe = props.recipe;
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      return {
        title: recipe?.title || '',
        description: recipe?.description || '',
        ingredients: recipe?.recipeIngredients.map((ri) => ({
          name: ri?.ingredient?.name || '',
          quantity: ri?.quantity || 0,
          measurement: ri?.measurement.type,
        })) || [{ name: '', quantity: 0, measurement: MeasurementType.OTHER }],
        instructions: recipe?.instructions || [''],
        prepTimeInMinutes: recipe?.prepTimeInMinutes || 0,
        cookTimeInMinutes: recipe?.cookTimeInMinutes || 0,
        servings: recipe?.servings || 0,
        tags:
          typeof recipe?.tags === 'string'
            ? recipe.tags
            : recipe?.tags?.join(', ') || '',
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

  const transformRecipeToFormData = (
    data: z.infer<typeof formSchema>
  ): FormData => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('ingredients', JSON.stringify(data.ingredients));
    formData.append('instructions', JSON.stringify(data.instructions));
    formData.append('prepTime', data.prepTimeInMinutes.toString());
    formData.append('cookTime', data.cookTimeInMinutes.toString());
    formData.append('servings', data.servings.toString());
    formData.append('tags', data.tags);
    return formData;
  };

  const handleReset = (updatedRecipe: RecipePayload) => {
    if (isCreateMode) {
      // TODO: direct to recipe detail page for new recipe
      reset();
    } else {
      reset({
        title: updatedRecipe.title,
        description: updatedRecipe.description || '',
        ingredients: updatedRecipe.recipeIngredients.map((i) => ({
          name: i.ingredient?.name,
          quantity: i.quantity,
          measurement: i.measurement.type,
        })) || [{ name: '', quantity: 0, measurement: MeasurementType.OTHER }],
        instructions: updatedRecipe.instructions || [''],
        prepTimeInMinutes: updatedRecipe.prepTimeInMinutes || 0,
        cookTimeInMinutes: updatedRecipe.cookTimeInMinutes || 0,
        servings: updatedRecipe.servings || 0,
        tags:
          typeof updatedRecipe.tags === 'string'
            ? updatedRecipe.tags
            : updatedRecipe.tags.join(', '),
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = transformRecipeToFormData(data);
    const updatedRecipe = await (isCreateMode
      ? createRecipe(formData)
      : updateRecipe(formData));
    handleReset(updatedRecipe);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title')}
        type="text"
        name="title"
        placeholder="Recipe Title"
      />
      {errors.title?.message && <p>{errors.title.message}</p>}
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
          {errors.ingredients?.[index]?.name?.message && (
            <p>{errors.ingredients[index].name.message}</p>
          )}
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
            {...register(`instructions.${index}`)}
            type="text"
            placeholder={`Step ${index + 1}`}
          />
          {errors.instructions?.[index]?.message && (
            <p>{errors.instructions[index].message}</p>
          )}
        </div>
      ))}
      <button type="button" onClick={() => appendInstruction('')}>
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
      {errors.prepTimeInMinutes?.message && (
        <p>{errors.prepTimeInMinutes.message}</p>
      )}
      <input
        {...register('cookTimeInMinutes')}
        type="number"
        name="cookTimeInMinutes"
        placeholder="Cooking Time (minutes)"
      />
      {errors.cookTimeInMinutes?.message && (
        <p>{errors.cookTimeInMinutes.message}</p>
      )}
      <input
        {...register('servings')}
        type="number"
        name="servings"
        placeholder="Servings"
      />
      {errors.servings?.message && <p>{errors.servings.message}</p>}
      <input
        {...register('tags')}
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
      />
      <button type="submit">
        {isCreateMode ? 'Create Recipe' : 'Update Recipe'}
      </button>
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
  );
};

export default RecipeForm;
