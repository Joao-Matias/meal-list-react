import React, { useState } from 'react';

const MealForm = () => {
  const [recipe, setRecipe] = useState({
    mealName: '',
    mealImg: '',
    ingList: [{ ingredient: '', id: Date.now() }],
  });

  const submitMealForm = (event) => {
    event.preventDefault();
  };

  const addExtraIngredient = () => {
    setRecipe((prevState) => {
      return {
        ...prevState,
        ingList: [...prevState.ingList, { ingredient: '', id: Date.now() }],
      };
    });
  };
  console.log(recipe);
  const updateRecipe = (event) => {
    const {
      target: { name, value, id },
    } = event;

    setRecipe((prevState) => {
      switch (name) {
        case 'mealName':
          return { ...prevState, [name]: value };
        case 'ingredient':
          const ingList = recipe.ingList.map((task) => {
            if (task.id === +id) {
              return { ...task, [name]: value };
            } else {
              return task;
            }
          });
          return { ...prevState, ingList };
      }
    });
  };

  return (
    <form onSubmit={submitMealForm}>
      <label>
        Recipe Name:
        <input onChange={updateRecipe} name='mealName' type='text' />
      </label>
      <div>
        {recipe.ingList.map((ing) => {
          return (
            <input
              key={ing.id}
              onChange={updateRecipe}
              type='text'
              name='ingredient'
              id={ing.id}
            />
          );
        })}
      </div>
      <button onClick={addExtraIngredient}>Add an Ingredient</button>
      <button>Save</button>
      <button>Discard</button>
    </form>
  );
};

export default MealForm;
