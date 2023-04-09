import React, { useState } from 'react';

const MealForm = () => {
  const [recipe, setRecipe] = useState({
    mealName: '',
    mealImg: '',
    ingList: [{}],
  });
  const [ingredientNumber, setIngredientNumber] = useState(1);

  const [listOfIng, setListOfIng] = useState([]);

  const submitMealForm = (event) => {
    event.preventDefault();
  };

  const addExtraIngredient = () => {
    setRecipe((prevState) => {
      return {
        ...prevState,
        ingList: [
          ...prevState.ingList,
          { ingredient: '', id: Data.now(), quantity: 1 },
        ],
      };
    });
  };

  const updateRecipe = (event) => {
    const {
      target: { name, value, id },
    } = event;
    setRecipe((prevState) => {
      if (name === 'ingredient') {
        const ingList = recipe.ingList.map((ing) => {
          if (id === ing.id) {
            return { [name]: value, id: id };
          } else {
            return ing;
          }
        });
        return { ...prevState, ingList };
      } else {
        return { ...prevState, [name]: value };
      }
    });
  };

  return (
    <form onSubmit={submitMealForm}>
      <label>
        Recipe Name:
        <input onChange={updateRecipe} name='mealName' type='text' />
      </label>

      {recipe.ingList.map((ing) => {
        return (
          <div key={ing.id}>
            <input
              onChange={updateRecipe}
              type='text'
              id={ing.id}
              name='ingredient'
            />
          </div>
        );
      })}

      <button onClick={addExtraIngredient}>Add an Ingredient</button>

      <input name='mealImg' />

      <button>Save</button>
      <button>Discard</button>
    </form>
  );
};

export default MealForm;
