import React from 'react';
import style from './meal-page.module.css';
import listImg from '../../img/list.jpg';

import { Link } from 'react-router-dom';

const MealPage = () => {
  return (
    <div className={style.mealPageContainer}>
      <section>
        <div className={style.mealContainer}></div>
      </section>
      <Link to='/lists' className={style.mealPageSwitchBox}>
        <img
          className={style.mealPageSwitchImg}
          src={listImg}
          alt='A jar with ingredients'
        />
        <h1 className={style.listSwitchBtn}>Lists</h1>
      </Link>
    </div>
  );
};

export default MealPage;
