import React, { useState } from 'react';
import style from './meal-page.module.css';
import listImg from '../../img/list.jpg';

import { Link } from 'react-router-dom';

const MealPage = () => {
  const [showBtn, setShowBtn] = useState(false);

  return (
    <div className={style.mealPageContainer}>
      <sidebar className={style.listOfMealsContainer}>
        <button className={style.listOfMealsBtn}>Start a Recipe</button>
      </sidebar>
      <section className={style.mealContainer}></section>

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
