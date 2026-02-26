'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createRecipe } from '@actions/post';
import { MeasurementType } from '@generated/enums';

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  instructions: z.array(z.object({ content: z.string() })), // no array of primitive allowed
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.coerce.number(),
      measurement: z.enum(MeasurementType),
    })
  ),
  prepTime: z.coerce.number(),
  cookTime: z.coerce.number(),
  servings: z.coerce.number(),
  tags: z.string(),
});

const AddRecipePage = () => {
  const { register, control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      instructions: [{ content: 'one' }, { content: 'two' }],
      ingredients: [
        { name: '', quantity: 0, measurement: MeasurementType.OTHER },
      ],
      prepTime: 0,
      cookTime: 0,
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
    formData.append('prepTime', data.prepTime.toString());
    formData.append('cookTime', data.cookTime.toString());
    formData.append('servings', data.servings.toString());
    formData.append('tags', data.tags);
    console.warn(
      'creating recipe with formData: ',
      Object.fromEntries(formData.entries())
    );
    await createRecipe(formData);
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
        {...register('prepTime')}
        type="number"
        name="prepTime"
        placeholder="Preparation Time (minutes)"
      />
      <input
        {...register('cookTime')}
        type="number"
        name="cookTime"
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
