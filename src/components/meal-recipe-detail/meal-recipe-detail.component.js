import React from 'react';
import style from './meal-recipe-detail.module.css';

const MealRecipeDetail = (props) => {
  const {
    selectedRecipe: { mealName, ingList, mealImg },
  } = props;

  return (
    <div className={style.recipeDetails}>
      <img alt='' className={style.recipeImg} src={mealImg} />
      <div className={style.recipeContainer}>
        <h1 className={style.recipeName}>{mealName}</h1>
        <ul className={style.recipeIngContainer}>
          {ingList.map((ing, i) => {
            return (
              <li className={style.recipeIng} key={i}>
                {ing.ingredient}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MealRecipeDetail;
