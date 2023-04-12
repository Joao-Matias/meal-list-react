import React, { useState } from 'react';
import styles from './meal-form.module.css';

const MealForm = () => {
  const [recipe, setRecipe] = useState({
    mealName: '',
    ingList: [],
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
          return;
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
            <li key={Math.random()} className={styles.items}>
              <label>
                Ingredient:
                <input
                  onChange={(event) => {
                    updateRecipe(event);
                  }}
                  type='text'
                  name='ingredient'
                  id={ing.id}
                  value={ing.ingredient}
                  autoFocus
                />
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
