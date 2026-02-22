import { useState } from "react";
import { createRecipe } from "../../../actions/post";

const AddRecipePage = () => { 
  const [ingredients, setIngredients] = useState([{ ingredient: "", quantity: "", measurement: "" }]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", quantity: "", measurement: "" }]);
  };
  return (
    <form action={createRecipe}>
      <h1>Add Recipe</h1>
      <input type="text" name="title" placeholder="Recipe Title" />
      <textarea name="description" placeholder="Recipe Description"></textarea>
      <input type="text" name="ingredients" placeholder="Ingredients (comma separated)" />
      <input type="text" name="instructions" placeholder="Instructions (comma separated)" />
      <input type="number" name="prepTime" placeholder="Preparation Time (minutes)" />
      <input type="number" name="cookTime" placeholder="Cooking Time (minutes)" />
      <input type="number" name="servings" placeholder="Servings" />
      <input type="text" name="tags" placeholder="Tags (comma separated)" />
      <button type="submit">Add Recipe</button>
    </form>
  )
};

export default AddRecipePage;
