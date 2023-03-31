import React from 'react';
import style from './list-page.module.css';

import { Link } from 'react-router-dom';

const ListPage = () => {
  return (
    <>
      <Link to='/'>Ola</Link>
      <section className={style.listContainer}></section>
    </>
  );
};

export default ListPage;
