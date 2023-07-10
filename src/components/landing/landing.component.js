import React from 'react';
import style from './landing.module.css';
import { Link } from 'react-router-dom';
import MealLanding from '../meal-landing';
import ListLanding from '../list-landing';

const Landing = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>MeaList</h1>
      <div className={style.app}>
        <Link className={style.link} to='/meals'>
          <MealLanding />
        </Link>
        <Link className={style.link} to='/lists'>
          <ListLanding />
        </Link>
      </div>
    </div>
  );
};

export default Landing;
