import React, { useState } from 'react';
import style from './meal-page.module.css';
import listImg from '../../img/list.jpg';
import MealForm from '../meal-form';
import MealRecipeDetail from '../meal-recipe-detail';
import MealRecipeList from '../meal-recipe-list';

import { Link } from 'react-router-dom';

const MealPage = (props) => {
  const { selectedRecipe, setSelectedRecipe } = props;

  const [openFormModal, setOpenFormModal] = useState(false);

  const toggleForm = () => {
    setOpenFormModal(true);
    setSelectedRecipe(false);
  };

  return (
    <div className={style.mealPageContainer}>
      <div className={style.listOfMealsContainer}>
        <button onClick={toggleForm} className={style.listOfMealsBtn}>
          Start a Recipe
        </button>
        <ul className={style.recipesContainer}>
          <MealRecipeList
            setOpenFormModal={setOpenFormModal}
            setSelectedRecipe={setSelectedRecipe}
            selectedRecipe={selectedRecipe}
          />
        </ul>
      </div>

      <section className={style.mealContainer}>
        {openFormModal && (
          <MealForm
            setSelectedRecipe={setSelectedRecipe}
            setOpenFormModal={setOpenFormModal}
          />
        )}
        {selectedRecipe && <MealRecipeDetail selectedRecipe={selectedRecipe} />}
      </section>
      <div className={style.linkBox}>
        <Link to='/lists' className={style.listPageSwitchBox}>
          <img
            className={style.listPageSwitchImg}
            src={listImg}
            alt='Someone writing in a book'
          />
        </Link>
      </div>
    </div>
  );
};

export default MealPage;
