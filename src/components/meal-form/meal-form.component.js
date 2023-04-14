import React, { useState } from 'react';
import styles from './meal-form.module.css';

const MealForm = (props) => {
  const { setOpenFormModal, setListOfRecipes } = props;

  const [recipe, setRecipe] = useState({
    mealName: '',
    ingList: [],
  });
  const [newIng, setNewIng] = useState();

  const [openNewIngTab, setOpenNewIngTab] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    setListOfRecipes((prevState) => {
      return [...prevState, { ...recipe }];
    });

    setOpenFormModal(false);
  };

  const addExtraIngredient = () => {
    setOpenNewIngTab(true);
  };

  const handleChangeNewIng = (event) => {
    const {
      target: { name, value },
    } = event;

    setNewIng(() => {
      return { [name]: value, id: Date.now() };
    });
  };

  const saveNewIng = () => {
    setRecipe((prevState) => {
      return {
        ...prevState,
        ingList: [...prevState.ingList, newIng],
      };
    });

    setOpenNewIngTab(false);
  };

  const updateRecipeName = (event) => {
    const {
      target: { name, value },
    } = event;

    setRecipe((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <form onSubmit={submitForm} className={styles.form}>
      <label>
        Recipe Name:
        <input onChange={updateRecipeName} name='mealName' type='text' />
      </label>

      <ul>
        {recipe.ingList.map((ing, index) => {
          return (
            <li className={styles.itemsBox} key={index}>
              <label>Ingredient</label>
              <h3>{ing.ingredient}</h3>
            </li>
          );
        })}
      </ul>
      <button type='button' onClick={addExtraIngredient}>
        Add an Ingredient
      </button>
      <button
        type='submit'
        disabled={recipe.mealName.length === 0 || recipe.ingList.length === 0}
      >
        Submit
      </button>
      <button
        onClick={() => {
          setOpenFormModal(false);
        }}
      >
        Discard
      </button>
      {openNewIngTab && (
        <div>
          <input name='ingredient' type='text' onChange={handleChangeNewIng} />
          <button onClick={saveNewIng}>Save Ingredient</button>
          <button
            onClick={() => {
              setOpenNewIngTab(false);
            }}
          >
            Discard Ingredient
          </button>
        </div>
      )}
    </form>
  );
};

export default MealForm;
