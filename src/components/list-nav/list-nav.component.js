import React from 'react';
import style from './list-nav.module.css';

const ListNav = () => {
  return (
    <section className={style.listContainerBox}>
      <h1>Let's Build Your Shopping Lists!</h1>
      <nav className={style.listNav}>
        <button>Lists</button>
        <input className={style.addNew} placeholder='Add New and press enter' />
      </nav>
    </section>
  );
};

export default ListNav;
