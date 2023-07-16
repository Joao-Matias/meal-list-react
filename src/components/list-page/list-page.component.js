import React from 'react';
import style from './list-page.module.css';
import mealImg from '../../img/meal.jpg';
import ListNav from '../list-nav';

import { Link } from 'react-router-dom';

const ListPage = () => {
  return (
    <div className={style.listPageContainer}>
      <div className={style.linkBox}>
        <Link to='/meals' className={style.mealPageSwitchBox}>
          <img
            className={style.mealPageSwitchImg}
            src={mealImg}
            alt='A jar with ingredients'
          />
        </Link>
      </div>
      <ListNav />
    </div>
  );
};

export default ListPage;
