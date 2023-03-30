import { useState } from 'react';
import styles from './list.module.css';
import listImg from '../../img/list.jpg';

const List = () => {
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
      <img className={styles.img} src={listImg} alt='A jar with ingredients' />
      {onHover && (
        <button className={styles.enterListBtn}>
          Let's make a proper <strong>List</strong>
        </button>
      )}
    </section>
  );
};

export default List;
