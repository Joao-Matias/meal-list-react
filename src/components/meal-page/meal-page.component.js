import React, { useState } from 'react';
import style from './meal-page.module.css';
import listImg from '../../img/list.jpg';
import MealForm from '../meal-form';
import MealRecipeDetail from '../meal-recipe-detail';
import { ImCross } from 'react-icons/im';

import { Link } from 'react-router-dom';

const MealPage = () => {
  const [showBtn, setShowBtn] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState();

  const [listOfRecipes, setListOfRecipes] = useState([]);
  const [deleteRecipeModal, setDeleteRecipeModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState();

  const toggleForm = () => {
    setOpenFormModal(true);
    setSelectedRecipe(false);
  };

  const handleClickRecipe = (recipe) => {
    setOpenFormModal(false);
    setSelectedRecipe(recipe);
  };

  const deleteRecipe = (recipe) => {
    setDeleteRecipeModal(true);
    setRecipeToDelete(recipe);
  };

  const handleDeleteRecipe = (recipe) => {
    console.log(recipe);
    setListOfRecipes((prevState) => {
      const listOfRecipes = prevState.filter((rec) => {
        return rec.id !== recipe.id;
      });
      return listOfRecipes;
    });

    setSelectedRecipe('');
    setDeleteRecipeModal(false);
  };

  return (
    <div className={style.mealPageContainer}>
      <div className={style.listOfMealsContainer}>
        <button onClick={toggleForm} className={style.listOfMealsBtn}>
          Start a Recipe
        </button>
        <ul className={style.recipesContainer}>
          {listOfRecipes.map((recipe, i) => {
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
                    <h5>No</h5>
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
          })}
        </ul>
      </div>

      <section className={style.mealContainer}>
        {openFormModal && (
          <MealForm
            setSelectedRecipe={setSelectedRecipe}
            setOpenFormModal={setOpenFormModal}
            setListOfRecipes={setListOfRecipes}
          />
        )}
        {selectedRecipe && <MealRecipeDetail selectedRecipe={selectedRecipe} />}
      </section>

      <Link
        onMouseEnter={() => {
          setShowBtn(true);
        }}
        onMouseLeave={() => {
          setShowBtn(false);
        }}
        to='/lists'
        className={style.listPageSwitchBox}
      >
        <img
          className={style.listPageSwitchImg}
          src={listImg}
          alt='Someone writing in a book'
        />
        {showBtn && <h1 className={style.listSwitchBtn}>Lists</h1>}
      </Link>
    </div>
  );
};

export default MealPage;
