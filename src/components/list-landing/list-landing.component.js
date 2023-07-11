import styles from './list-landing.module.css';
import listImg from '../../img/list.jpg';
import React from 'react';

const ListLanding = () => {
  const size = window.innerWidth;

  return (
    <section className={  styles.imgBox}>
      <img
        className={styles.img}
        src={listImg}
        alt='Someone writing in a book'
      />
      <button
        className={size < 976 ? styles.enterMealBtnMobile : styles.enterMealBtn}
      >
        Let's make proper <strong>Lists</strong>
      </button>
    </section>
  );
};

export default ListLanding;


