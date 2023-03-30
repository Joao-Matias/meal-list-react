import { useState } from 'react';
import mealImg from '../../img/meal.jpg';
import styles from './meal.module.css';

const Meal = () => {
  const [onHover, setOnHover] = useState(false);

  return (
    <section
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
      className={styles.imgBox}
    >
      <img className={styles.img} src={mealImg} alt='A jar with ingredients' />
      {onHover && (
        <button className={styles.enterMealBtn}>
          Let's create delicious <strong>Meal</strong>
        </button>
      )}
    </section>
  );
};

export default Meal;
