import React from 'react';
import style from './meal-page.module.css';

import { Link } from 'react-router-dom';

const MealPage = () => {
  return (
    <>
      {/* <Link to='/'>Home</Link> */}
      <section className={style.mealContainer}></section>
    </>
  );
};

export default MealPage;
