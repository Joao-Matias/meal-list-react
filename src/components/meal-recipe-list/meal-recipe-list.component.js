import React from 'react';
import { useState } from 'react';
import { deleteRecipeStorage } from '../../services/recipe-list';

import { ImCross } from 'react-icons/im';
import style from './meal-recipe-list.module.css';

const RecipeList = (props) => {
  const {
    listOfRecipes,
    setOpenFormModal,
    setSelectedRecipe,
    setListOfRecipes,
    selectedRecipe,
  } = props;

  const [recipeToDelete, setRecipeToDelete] = useState();
  const [deleteRecipeModal, setDeleteRecipeModal] = useState(false);

  const handleClickRecipe = (recipe) => {
    setOpenFormModal(false);
    setSelectedRecipe(recipe);
  };

  const deleteRecipe = (recipe) => {
    setDeleteRecipeModal(true);
    setRecipeToDelete(recipe);
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

  return listOfRecipes.map((recipe, i) => {
    return (
      <li key={i} className={style.recipes}>
        {(deleteRecipeModal && recipeToDelete.id === recipe.id && (
          <div className={style.deleteModal}>
            <div className={style.deleteModalQuestion}>
              <h3>Are you sure you want to delete:</h3>
              <h2>{recipe.mealName}?</h2>
            </div>
            <h5
              onClick={() => {
                handleDeleteRecipe(recipe, i);
              }}
            >
              Yes
            </h5>
            <h5
              onClick={() => {
                closeDeleteModule(recipe);
              }}
            >
              No
            </h5>
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
              {recipe.mealName}
            </button>
            <i
              className={style.deleteBox}
              onClick={() => {
                deleteRecipe(recipe);
              }}
            >
              <ImCross className={style.delete} />
            </i>
          </>
        )}
      </li>
    );
  });
};

export default RecipeList;
