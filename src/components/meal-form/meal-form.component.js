import React, { useState } from 'react';
import styles from './meal-form.module.css';

const MealForm = () => {
  const [recipe, setRecipe] = useState({
    mealName: '',
    mealImg: '',
    ingList: [{}],
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
        default:
          return false;
      }
    });
  };

  return (
    <form onSubmit={submitMealForm} className={styles.form}>
      <label>
        Recipe Name:
        <input onChange={updateRecipe} name='mealName' type='text' />
      </label>
      <ul>
        {recipe.ingList.map((ing) => {
          return (
            <li key={Date.now()} className={styles.items}>
              <label>
                Ingredient:
                <input
                  key={ing.id}
                  onChange={updateRecipe}
                  type='text'
                  name='ingredient'
                  id={ing.id}
                />
              </label>
              <label>
                Quantity:
                <input type='number' name='quantity' />
              </label>
            </li>
          );
        })}
      </ul>
      <button onClick={addExtraIngredient}>Add an Ingredient</button>
      <button>Save</button>
      <button>Discard</button>
    </form>
  );
};

export default MealForm;
