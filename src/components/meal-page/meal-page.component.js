import React, { useContext, useEffect, useState } from 'react';
import style from './meal-page.module.css';
import listImg from '../../img/list.jpg';
import MealForm from '../meal-form';
import MealRecipeDetail from '../meal-recipe-detail';
import MealRecipeList from '../meal-recipe-list';
import { getRecipeList } from '../../services/recipe-list';
import { Context } from '../../App';

import { Link } from 'react-router-dom';

const MealPage = () => {
  const [, setListOfRecipes] = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecipeList();
      setListOfRecipes(response);
      setSelectedRecipe(response[0]);
    };

    fetchData();
  }, []);

  const [showBtn, setShowBtn] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState();

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
