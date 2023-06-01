import React, { useState } from 'react';
import style from './list-page.module.css';
import mealImg from '../../img/meal.jpg';
import ListNav from '../list-nav';

import { Link } from 'react-router-dom';

const ListPage = (props) => {
  const { listOfRecipes } = props;

  console.log(listOfRecipes);

  const [showBtn, setShowBtn] = useState(false);

  return (
    <div className={style.listPageContainer}>
      <Link
        onMouseEnter={() => {
          setShowBtn(true);
        }}
        onMouseLeave={() => {
          setShowBtn(false);
        }}
        to='/meals'
        className={style.mealPageSwitchBox}
      >
        <img
          className={style.mealPageSwitchImg}
          src={mealImg}
          alt='A jar with ingredients'
        />
        {showBtn && <h1 className={style.mealSwitchBtn}>Meals</h1>}
      </Link>
      <ListNav />
    </div>
  );
};

export default ListPage;
