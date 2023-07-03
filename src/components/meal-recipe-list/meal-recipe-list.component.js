import React from 'react';
import { useState, useContext } from 'react';
import { deleteRecipeStorage } from '../../services/recipe-list';

import { ImPencil, ImCross } from 'react-icons/im';
import style from './meal-recipe-list.module.css';
import { Context } from '../../App';

const MealRecipeList = (props) => {
  const { setOpenFormModal, setSelectedRecipe, selectedRecipe } = props;

  const [listOfRecipes, setListOfRecipes] = useContext(Context);
  const [recipeToDelete, setRecipeToDelete] = useState();
  const [deleteRecipeModal, setDeleteRecipeModal] = useState(false);
  const [editeNameModal, setEditeNameModal] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState();

  const [newRecipeName, setNewRecipeName] = useState('');

  const handleClickRecipe = (recipe) => {
    setOpenFormModal(false);
    setSelectedRecipe(recipe);
  };

  const deleteRecipe = (recipe) => {
    setDeleteRecipeModal(true);
    setRecipeToDelete(recipe);
  };

  const editRecipeName = (recipe) => {
    setEditeNameModal(true);
    setRecipeToEdit(recipe);
  };

  const handleDeleteRecipe = (recipe) => {
    const response = deleteRecipeStorage(recipe);

    if (response) {
      setListOfRecipes((prevState) => {
        const listOfRecipes = prevState.filter((rec) => {
          return rec.id !== recipe.id;
        });

        return listOfRecipes;
      });

      setSelectedRecipe('');
      setDeleteRecipeModal(false);
    }
  };

  const closeDeleteModule = () => {
    setRecipeToDelete('');
    setDeleteRecipeModal(false);
  };

  const modifyRecipeName = (event) => {
    setNewRecipeName(event.target.value);
  };

  const confirmNameChange = (event, recipe) => {
    if (event.key === 'Enter') {
      if (newRecipeName.length === 0) {
        setListOfRecipes((prevState) => {
          return prevState;
        });
        setEditeNameModal(false);
      } else {
        setListOfRecipes((prevState) => {
          return prevState.map((recp) => {
            if (recipe.id === recp.id) {
              return { ...recp, mealName: newRecipeName };
            } else {
              return recp;
            }
          });
        });

        setEditeNameModal(false);
      }
    }
  };

  return listOfRecipes.map((recipe, i) => {
    return (
      <li key={i} className={style.recipes}>
        {(deleteRecipeModal && recipeToDelete.id === recipe.id && (
          <div className={style.deleteModal}>
            <div className={style.deleteModalQuestion}>
              <h3>Are you sure you want to delete:</h3>
              <h2>{recipe.mealName}?</h2>
            </div>
            <button className={style.deleteQuestions}>
              <h5
                onClick={() => {
                  handleDeleteRecipe(recipe, i);
                }}
              >
                Yes
              </h5>
            </button>
            <button className={style.deleteQuestions}>
              <h5
                onClick={() => {
                  closeDeleteModule(recipe);
                }}
              >
                No
              </h5>
            </button>
          </div>
        )) || (
          <>
            <button
              onClick={() => {
                handleClickRecipe(recipe);
              }}
              className={
                selectedRecipe.id === recipe.id
                  ? style.selectedRecipe
                  : style.recipesBtn
              }
            >
              {editeNameModal && recipeToEdit.id === recipe.id ? (
                <input
                  type='text'
                  maxLength='20'
                  className={style.recipeNameEdit}
                  placeholder='New name and press enter'
                  autoFocus
                  onChange={(event) => {
                    modifyRecipeName(event);
                  }}
                  onKeyDown={(event) => {
                    confirmNameChange(event, recipe);
                  }}
                />
              ) : (
                <h3 className={style.recipeName}>{recipe.mealName}</h3>
              )}
            </button>
            <button
              className={style.editBox}
              onClick={() => {
                deleteRecipe(recipe);
              }}
            >
              <ImCross className={style.edit} />
            </button>
            <button
              className={style.editBox}
              onClick={() => {
                editRecipeName(recipe);
              }}
            >
              <ImPencil className={style.edit} />
            </button>
          </>
        )}
      </li>
    );
  });
};

export default MealRecipeList;
