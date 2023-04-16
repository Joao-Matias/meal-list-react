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
  const [handleIngDelete, setHandleIngDelete] = useState();

  const [selectedIng, setSelectedIng] = useState();

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

  const keyDownIngNameChange = (ing, event) => {
    if (event.key === 'Enter' && event.target.value.length > 0) {
      setRecipe((prevState) => {
        const ingList = prevState.ingList.map((ingredient) => {
          if (ingredient.id === ing.id) {
            return { ...ingredient, ingredient: event.target.value };
          } else {
            return ingredient;
          }
        });
        return { ...prevState, ingList };
      });

      setIngNameChange(false);
    }
  };

  const editIng = (ing) => {
    setSelectedIng(ing);
    setIngNameChange(true);
  };

  const deleteIng = (ing) => {
    setSelectedIng(ing);
    setHandleIngDelete(true);
  };

  const deleteIngredient = (ing) => {
    setRecipe((prevState) => {
      const ingList = prevState.ingList.filter((ingredient) => {
        return ingredient.id !== ing.id;
      });

      return { ...prevState, ingList };
    });
    setHandleIngDelete(false);
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
                  editIng(ing);
                }}
              />
              {ingNameChange && selectedIng.id === ing.id && (
                <input
                  onKeyDown={(event) => {
                    keyDownIngNameChange(ing, event);
                  }}
                />
              )}
              <ImBin
                onClick={() => {
                  deleteIng(ing);
                }}
              />
              {handleIngDelete && selectedIng.id === ing.id && (
                <>
                  <h3>Are you sure you want to delete?</h3>
                  <button
                    onClick={() => {
                      deleteIngredient(ing);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setHandleIngDelete(false);
                    }}
                  >
                    No
                  </button>
                </>
              )}
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
