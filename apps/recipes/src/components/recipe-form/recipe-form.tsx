'use client';

import { RecipeFormProps } from './recipe-form.types';
import z from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MeasurementType } from '@generated/enums';
import { updateRecipe } from '@actions/put';
import { RecipePayload } from '@shared/prisma-payloads/recipe-payload';
import { createRecipe } from '@actions/post';
import { X, Plus } from 'lucide-react';

import styles from './recipe-form.module.scss';

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

/**
 * TODO: fix fonts in text-area
 * TODO: route to recipe detail after save
 */
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
        })) || [
          { name: '', quantity: 0, measurement: MeasurementType.GRAM },
          { name: '', quantity: 0, measurement: MeasurementType.GRAM },
        ],
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-container']}
    >
      <label className={styles['input-group']}>
        <span>RECIPE TITLE</span>
        <input
          {...register('title')}
          className={styles['text-input']}
          type="text"
          name="title"
          placeholder="Enter title"
        />
        {errors.title?.message && <p>{errors.title.message}</p>}
      </label>

      <label className={styles['input-group']}>
        <span>RECIPE DESCRIPTION</span>
        <textarea
          {...register('description')}
          className={styles['text-area-input']}
          name="description"
          placeholder="Enter description"
        ></textarea>
      </label>
      <label className={styles['input-group']}>
        <span>RECIPE TAGS</span>
        <input
          {...register('tags')}
          className={styles['text-input']}
          type="text"
          name="tags"
          placeholder="e.g. Dinner, Easy, Chicken"
        />
      </label>
      <div className={styles['metadata']}>
        <label className={styles['input-group']}>
          <span>NUMBER OF SERVINGS</span>
          <input
            {...register('servings')}
            className={styles['number-input']}
            type="number"
            name="servings"
          />
          {errors.servings?.message && <p>{errors.servings.message}</p>}
        </label>
        <label className={styles['input-group']}>
          <span>PREP TIME</span>
          <input
            {...register('prepTimeInMinutes')}
            className={styles['number-input']}
            type="number"
            name="prepTimeInMinutes"
          />
          {errors.prepTimeInMinutes?.message && (
            <p>{errors.prepTimeInMinutes.message}</p>
          )}
        </label>
        <label className={styles['input-group']}>
          <span>COOK TIME</span>
          <input
            {...register('cookTimeInMinutes')}
            className={styles['number-input']}
            type="number"
            name="cookTimeInMinutes"
          />
          {errors.cookTimeInMinutes?.message && (
            <p>{errors.cookTimeInMinutes.message}</p>
          )}
        </label>
      </div>
      <div className={styles['section']}>
        <h3 className={styles['section-title']}>Ingredients</h3>
        {ingredientFields.map((ing, index) => (
          <div key={ing.id} className={styles['section-item']}>
            <label className={styles['input-group']}>
              <span className={styles['small']}>QUANTITY</span>
              <input
                {...register(`ingredients.${index}.quantity`)}
                className={styles['number-input-small']}
                type="number"
              />
            </label>
            <label className={styles['input-group']}>
              <span className={styles['small']}>MEASURE</span>
              <select
                {...register(`ingredients.${index}.measurement`)}
                className={styles['select-input']}
              >
                {Object.values(MeasurementType).map((m) => (
                  <option key={m} value={m}>
                    {m.toLowerCase()}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles['input-group']}>
              <span className={styles['small']}>INGREDIENT NAME</span>
              <input
                {...register(`ingredients.${index}.name`)}
                type="text"
                className={styles['text-input-small']}
              />
              {errors.ingredients?.[index]?.name?.message && (
                <p>{errors.ingredients[index].name.message}</p>
              )}
            </label>
            <button
              type="button"
              className={styles['remove-button']}
              onClick={() => removeIngredient(index)}
            >
              <X />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles['add-button']}
          onClick={() =>
            appendIngredient(
              {
                name: '',
                quantity: 0,
                measurement: MeasurementType.OTHER,
              },
              { shouldFocus: true }
            )
          }
        >
          <Plus /> ADD ANOTHER INGREDIENT
        </button>
      </div>
      <div className={styles['section']}>
        <h3 className={styles['section-title']}>Instructions</h3>

        {instructionFields.map((inst, index) => (
          <div key={inst.id} className={styles['section-item']}>
            <div className={styles['instruction-step']}>{index + 1}</div>
            <input
              {...register(`instructions.${index}`)}
              type="text"
              className={styles['text-input-large']}
            />
            {errors.instructions?.[index]?.message && (
              <p>{errors.instructions[index].message}</p>
            )}
            <button
              type="button"
              className={styles['remove-button']}
              onClick={() => removeInstruction(index)}
            >
              <X />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles['add-button']}
          onClick={() => appendInstruction('', { shouldFocus: true })}
        >
          <Plus /> ADD ANOTHER STEP
        </button>
      </div>
      <button className={styles['save-button']} type="submit">
        {isCreateMode ? 'Save Recipe' : 'Update Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;
