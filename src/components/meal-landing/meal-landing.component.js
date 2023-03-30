import mealImg from '../../img/meal.jpg';
import styles from './meal-landing.module.css';
import React from 'react';

const MealLanding = () => {
  return (
    <section className={styles.imgBox}>
      <img className={styles.img} src={mealImg} alt='A jar with ingredients' />
      <button className={styles.enterMealBtn}>
        Let's create delicious <strong>Meals</strong>
      </button>
    </section>
  );
};

export default MealLanding;
