import React from 'react';
import style from './meal-recipe-detail.module.css';

const MealRecipeDetail = (props) => {
  const {
    selectedRecipe: { mealName, ingList, mealImg },
  } = props;

  return (
    <div className={style.recipeDetails}>
      <div className={style.recipeImgContainer}>
        <h1 className={style.recipeName}>{mealName}</h1>
        <img alt='' className={style.recipeImg} src={mealImg} />
      </div>
      <div className={style.recipeContainer}>
        <h4>Ingredients:</h4>
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
