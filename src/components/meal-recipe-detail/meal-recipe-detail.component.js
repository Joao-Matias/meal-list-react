import React, { useState } from 'react';
import style from './meal-recipe-detail.module.css';
import { ImPencil, ImBin, ImPlus } from 'react-icons/im';

const MealRecipeDetail = (props) => {
  const { selectedRecipe, setListOfRecipes, listOfRecipes } = props;

  const { mealName, ingList, mealImg, id } = listOfRecipes.find((list) => {
    return list.id === selectedRecipe.id;
  });

  const [editBtnSlide, setEditBtnSlide] = useState(false);
  const [openEditInpt, setOpenEditInpt] = useState(false);
  const [newIngInpt, setNewIngInpt] = useState(false);

  const [updatedIng, setUpdatedIng] = useState();
  const [selectedIng, setSelectedIng] = useState();

  const editRecipeItems = () => {
    setEditBtnSlide((prevState) => {
      return !prevState;
    });

    setOpenEditInpt(false);
  };

  const deleteIngredient = (ing) => {
    setListOfRecipes((prevState) => {
      return prevState.map((recipe) => {
        if (recipe.id === id) {
          const ingList = recipe.ingList.filter((ingredient) => {
            return ingredient.id !== ing.id;
          });
          return { ...recipe, ingList };
        } else {
          return recipe;
        }
      });
    });
  };

  const modalEditIngredient = (ing) => {
    setOpenEditInpt(true);
    setSelectedIng(ing.id);
  };

  const editIngredient = (event) => {
    setUpdatedIng(event.target.value);
  };

  const saveNewIng = (ing, event) => {
    if (event.key === 'Enter') {
      setListOfRecipes((prevState) => {
        return prevState.map((recipe) => {
          if (recipe.id === id) {
            const ingList = recipe.ingList.map((ingredient) => {
              if (ingredient.id === ing.id) {
                return { ...ingredient, ingredient: updatedIng };
              } else {
                return ingredient;
              }
            });

            return { ...recipe, ingList };
          } else {
            return recipe;
          }
        });
      });

      setUpdatedIng('Choose an Ingredient');
      setOpenEditInpt(false);
    }
  };

  const newIngModal = () => {
    setNewIngInpt(true);
  };

  const newIngredient = (event) => {
    if (event.key === 'Enter') {
      ingList.unshift({ ingredient: updatedIng, id: Date.now() });

      setUpdatedIng('Choose an Ingredient');
      setNewIngInpt(false);
    }
  };

  return (
    <div className={style.recipeDetails}>
      <div className={style.recipeImgContainer}>
        <h1 name='mealName' className={style.recipeName}>
          {mealName}
        </h1>

        <img alt='' className={style.recipeImg} src={mealImg} />
      </div>
      <div className={style.recipeContainer}>
        <div className={style.recipeIngHeaderCont}>
          <h4 className={style.recipeIngTitle}>Ingredients:</h4>
          <button onClick={newIngModal} className={style.recipeIngAddBtnOn}>
            <div className={style.recipeIngAdd}>
              <ImPlus
                style={{ margin: '0', fontSize: '1.6rem' }}
                className={style.recipeEditImg}
              />
            </div>
          </button>

          <button
            onClick={editRecipeItems}
            className={style.recipeIngEditBtnOn}
          >
            <div
              className={
                editBtnSlide ? style.recipeIngEditOn : style.recipeIngEditOff
              }
            >
              <ImPencil className={style.recipeEditImg} />
            </div>
          </button>
        </div>
        <ul className={style.recipeIngContainer}>
          {newIngInpt && (
            <input
              placeholder='Enter new ingredient and press enter'
              autoFocus
              className={style.newIng}
              onChange={(event) => {
                editIngredient(event);
              }}
              onKeyDown={(event) => {
                newIngredient(event);
              }}
            />
          )}
          {ingList.map((ing, i) => {
            return (
              <li className={style.recipeIng} key={i}>
                {openEditInpt && selectedIng === ing.id && editBtnSlide ? (
                  <input
                    placeholder='Enter new ingredient and press enter'
                    autoFocus
                    className={style.newIng}
                    onChange={(e) => {
                      editIngredient(e);
                    }}
                    onKeyDown={(event) => {
                      saveNewIng(ing, event);
                    }}
                  />
                ) : (
                  ing.ingredient
                )}
                {editBtnSlide && (
                  <div className={style.ingredientBtn}>
                    <ImPencil
                      onClick={() => {
                        modalEditIngredient(ing);
                      }}
                      className={style.btn}
                    />
                    <ImBin
                      onClick={() => {
                        deleteIngredient(ing);
                      }}
                      className={style.btn}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MealRecipeDetail;
