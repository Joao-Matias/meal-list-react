import mealImg from '../../img/meal.jpg';
import styles from './meal-landing.module.css';
import React from 'react';

const MealLanding = () => {
  return (
    <section className={styles.imgBox}>
      <img
        className={styles.img}
        src={mealImg}
        alt='Someone writing in a book'
      />
      <button className={styles.enterMealBtn}>
        Let's create some <strong>Meals</strong>
      </button>
    </section>
  );
};

export default MealLanding;
