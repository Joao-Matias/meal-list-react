import React, { useContext } from 'react';
import style from './list-import-modal.module.css';
import { Context } from '../../App';

const ListImportModal = () => {
  const [listOfRecipes] = useContext(Context);

  console.log(listOfRecipes);

  return (
    <section className={style.importModal}>
      <div className={style.importContainer}></div>
    </section>
  );
};

export default ListImportModal;
