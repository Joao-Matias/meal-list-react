import React, { useState } from 'react';
import styles from './meal-form.module.css';
import { ImBin, ImPencil } from 'react-icons/im';

const MealForm = (props) => {
  const { setOpenFormModal, setListOfRecipes } = props;

  const [recipe, setRecipe] = useState({
    mealName: '',
    ingList: [],
  });
  const [newIng, setNewIng] = useState('');

  const [openNewIngTab, setOpenNewIngTab] = useState(false);
  const [ingNameChange, setIngNameChange] = useState();

  const submitForm = (event) => {
    event.preventDefault();
    setListOfRecipes((prevState) => {
      return [...prevState, { ...recipe, id: Date.now() }];
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

  const keyDownIngNameChange = (event) => {
    if (event.key === 'Enter') {
      console.log('ola');
    }
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
              <ImPencil
                onClick={() => {
                  setIngNameChange(true);
                }}
              />
              {ingNameChange && <input onKeyDown={keyDownIngNameChange} />}
              <ImBin />
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
          <button disabled={newIng.length === 0} onClick={saveNewIng}>
            Save Ingredient
          </button>
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
