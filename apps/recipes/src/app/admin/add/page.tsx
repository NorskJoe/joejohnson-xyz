'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createRecipe } from '@actions/post';
import { MeasurementType } from '@generated/enums';

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
  // no array of primitive allowed
  instructions: z
    .array(z.object({ content: z.string() }))
    .min(1, 'At least one instruction is required'),
  prepTimeInMinutes: z.coerce.number().min(0, 'Preparation time must be set'),
  cookTimeInMinutes: z.coerce.number().min(0, 'Cooking time must be set'),
  servings: z.coerce.number().min(1, 'Servings must be at least 1'),
  tags: z.string(),
});

const AddRecipePage = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      instructions: [{ content: '' }],
      ingredients: [
        { name: '', quantity: 0, measurement: MeasurementType.OTHER },
      ],
      prepTimeInMinutes: 0,
      cookTimeInMinutes: 0,
      servings: 0,
      tags: '',
    },
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: 'instructions',
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.warn('submitted add ', data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('ingredients', JSON.stringify(data.ingredients));
    formData.append(
      'instructions',
      data.instructions.map((i) => i.content).join(',')
    );
    formData.append('prepTimeInMinutes', data.prepTimeInMinutes.toString());
    formData.append('cookTimeInMinutes', data.cookTimeInMinutes.toString());
    formData.append('servings', data.servings.toString());
    formData.append('tags', data.tags);
    console.warn(
      'creating recipe with formData: ',
      Object.fromEntries(formData.entries())
    );
    await createRecipe(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Add Recipe</h1>
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
            {...register(`instructions.${index}.content`)}
            type="text"
            placeholder={`Step ${index + 1}`}
          />
          {errors.instructions?.[index]?.content?.message && (
            <p>{errors.instructions[index].content.message}</p>
          )}
        </div>
      ))}
      <button type="button" onClick={() => appendInstruction({ content: '' })}>
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
      <button type="submit">Add Recipe</button>
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

export default AddRecipePage;
