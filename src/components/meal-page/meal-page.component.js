import React, { useState } from 'react';
import style from './meal-page.module.css';
import listImg from '../../img/list.jpg';
import MealForm from '../meal-form';
import MealRecipeDetail from '../meal-recipe-detail';

import { Link } from 'react-router-dom';

const MealPage = () => {
  const [showBtn, setShowBtn] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState();

  const [listOfRecipes, setListOfRecipes] = useState([
    {
      mealName: 'Pizza',
      mealImg:
        'https://www.acouplecooks.com/wp-content/uploads/2019/06/Mushroom-Pizza-with-Herbs-011.jpg',
      ingList: [{ ingredient: 'mushrooms' }],
    },
  ]);

  const toggleForm = () => {
    setOpenFormModal(true);
    setSelectedRecipe(false);
  };

  const handleClickRecipe = (recipe) => {
    setOpenFormModal(false);
    setSelectedRecipe(recipe);
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
                <button
                  onClick={() => {
                    handleClickRecipe(recipe);
                  }}
                  className={style.recipesBtn}
                >
                  {recipe.mealName}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <section className={style.mealContainer}>
        {openFormModal && (
          <MealForm
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
