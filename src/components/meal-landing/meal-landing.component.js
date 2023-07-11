import mealImg from '../../img/meal.jpg';
import styles from './meal-landing.module.css';
import React from 'react';

const MealLanding = () => {
  const size = window.innerWidth;

  return (
    <section className={ styles.imgBox} >
      <img
        className={styles.img}
        src={mealImg}
        alt='Someone writing in a book'
      />
      <button
        className={size < 976 ? styles.enterMealBtnMobile : styles.enterMealBtn}
      >
        Let's create some <strong>Meals</strong>
      </button>
    </section>
  );
};

export default MealLanding;
