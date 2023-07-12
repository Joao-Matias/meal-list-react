import React, { useContext, useState } from 'react';
import styles from './meal-form.module.css';
import { ImBin, ImPencil } from 'react-icons/im';
import { addRecipeStorage } from '../../services/recipe-list';
import { Context } from '../../App';

const MealForm = (props) => {
  const { setOpenFormModal, setSelectedRecipe } = props;

  const [recipe, setRecipe] = useState({
    mealName: '',
    mealImg: '',
    ingList: [],
  });
  const [newIng, setNewIng] = useState('');
  const [openNewIngTab, setOpenNewIngTab] = useState(false);
  const [ingNameChange, setIngNameChange] = useState();
  const [handleIngDelete, setHandleIngDelete] = useState();
  const [, setListOfRecipes] = useContext(Context);

  const [selectedIng, setSelectedIng] = useState();

  const submitForm = (event) => {
    event.preventDefault();
    const finalRecipe = { ...recipe, id: Date.now() };
    setListOfRecipes((prevState) => {
      return [...prevState, finalRecipe];
    });
    setSelectedRecipe(finalRecipe);
    addRecipeStorage(finalRecipe);
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

  const clickSaveNewIng = (e) => {
    if (e.key === 'Enter' && newIng.length !== 0) {
      saveNewIng();
    }
  };

  const updateRecipeName = (event) => {
    const {
      target: { name, value },
    } = event;

    setRecipe((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClickEditIng = (ing) => {
    setSelectedIng(ing);
    setIngNameChange(true);
  };

  const editIngredient = (ing, event) => {
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

  const handleClickDeleteIng = (ing) => {
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
      <div className={styles.formCont}>
        <div className={styles.inputBoxes}>
          <label className={styles.recipeNameBox}>
            <h3 className={styles.recipeName}> Recipe Name:</h3>
            <input
              className={styles.recipeNameInput}
              maxLength='20'
              onChange={updateRecipeName}
              name='mealName'
              type='text'
            />
          </label>

          <label className={styles.recipeImageBox}>
            <h3 className={styles.recipeImage}>Recipe Image:</h3>
            <input
              className={styles.recipeImageInput}
              onChange={updateRecipeName}
              name='mealImg'
              type='text'
            />
          </label>
        </div>
        <div className={styles.containerNewIng}>
          <ul className={styles.recipeListCont}>
            {recipe.ingList.map((ing, index) => {
              return (
                <li className={styles.itemsBox} key={index}>
                  {ingNameChange && selectedIng.id === ing.id ? (
                    <input
                      autoFocus
                      type='text'
                      maxLength='32'
                      placeholder='Enter new ingredient and press enter'
                      className={styles.inputNameChange}
                      onKeyDown={(event) => {
                        editIngredient(ing, event);
                      }}
                    />
                  ) : (
                    <h3>{ing.ingredient}</h3>
                  )}
                  {/* <h3>{ing.ingredient}</h3> */}
                  <div
                    className={styles.edit}
                    onClick={() => {
                      handleClickEditIng(ing);
                    }}
                  >
                    <ImPencil />
                  </div>
                  {/* {ingNameChange && selectedIng.id === ing.id && (
                    <input
                      onKeyDown={(event) => {
                        editIngredient(ing, event);
                      }}
                    />
                  )} */}
                  <div
                    className={styles.delete}
                    onClick={() => {
                      handleClickDeleteIng(ing);
                    }}
                  >
                    <ImBin />
                  </div>
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
          <div className={styles.inputsCont}>
            <div className={styles.btns}>
              <button
                className={styles.add}
                type='button'
                onClick={addExtraIngredient}
              >
                <h3>Add Ingredient</h3>
              </button>
              <button
                type='submit'
                className={
                  recipe.mealName.length === 0 || recipe.ingList.length === 0
                    ? styles.submitDisable
                    : styles.submit
                }
                disabled={
                  recipe.mealName.length === 0 || recipe.ingList.length === 0
                }
              >
                <h3>Submit</h3>
              </button>
              <button
                className={styles.discard}
                onClick={() => {
                  setOpenFormModal(false);
                }}
              >
                <h3>Discard</h3>
              </button>
            </div>
            {openNewIngTab && (
              <div className={styles.newIngBox}>
                <input
                  className={styles.newIngInput}
                  autoFocus
                  maxLength='32'
                  name='ingredient'
                  type='text'
                  onChange={handleChangeNewIng}
                  onKeyDown={(e) => {
                    clickSaveNewIng(e);
                  }}
                />
                <div className={styles.newIngCont}>
                  <button
                    className={styles.saveIng}
                    disabled={newIng.length === 0}
                    onClick={saveNewIng}
                  >
                    <h3>Save Ingredient</h3>
                  </button>
                  <button
                    className={styles.discardIng}
                    onClick={() => {
                      setOpenNewIngTab(false);
                    }}
                  >
                    <h3>Discard Ingredient</h3>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealForm;
