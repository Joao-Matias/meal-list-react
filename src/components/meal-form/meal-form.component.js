import React, { useState } from 'react';

const MealForm = () => {
  const [recipe, setRecipe] = useState({ mealName: '', mealImg: '' });
  const [ingredientNumber, setIngredientNumber] = useState(1);

  const [listOfIng, setListOfIng] = useState([]);

  const submitMealForm = (event) => {
    event.preventDefault();
  };

  const addExtraIngredient = () => {
    const ing = 'ingredient' + ingredientNumber;
    setListOfIng((prevState) => [
      ...prevState,
      <>
        <input onChange={updateRecipe} name={ing} type='text' />
        <input name='counter' type='number' defaultValue='1' />
      </>,
    ]);

    setIngredientNumber((prevState) => prevState + 1);
  };

  console.log(listOfIng);
  const updateRecipe = (event) => {
    const {
      target: { name, value },
    } = event;

    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <form onSubmit={submitMealForm}>
      <label>
        Recipe Name:
        <input onChange={updateRecipe} name='mealName' type='text' />
      </label>
      <label>Ingredient: </label>
      <input onChange={updateRecipe} name='ingredient' type='text' />
      <input name='counter' type='number' defaultValue='1' />
      {listOfIng.map((ingredient) => ingredient)}

      <button onClick={addExtraIngredient}>Add an Ingredient</button>

      <input name='mealImg' />

      <button>Save</button>
      <button>Discard</button>
    </form>
  );
};

export default MealForm;
