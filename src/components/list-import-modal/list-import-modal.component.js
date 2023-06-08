import React, { useContext, useState } from 'react';
import style from './list-import-modal.module.css';
import { Context } from '../../App';

const ListImportModal = () => {
  const [listOfRecipes] = useContext(Context);
  const [ingModal, setIngModal] = useState(false);

  const [selectedList, setSelectedList] = useState([]);

  const listClickHandler = (list) => {
    setSelectedList(list);
    setIngModal(true);
  };

  return (
    <section className={style.importModal}>
      <div className={style.importContainer}>
        <section className={style.listContainer}>
          <h1>Lists</h1>
          {listOfRecipes.map((list, i) => {
            return (
              <div
                onClick={() => {
                  listClickHandler(list);
                }}
                className={style.listBox}
                key={i}
              >
                <h3>{list.mealName}</h3>
              </div>
            );
          })}
        </section>
        <section className={style.ingContainer}>
          <h1>Ingredients</h1>
          {ingModal &&
            selectedList.ingList.map((ing, i) => {
              return (
                <div className={style.ingBox} key={i}>
                  <h3>{ing.ingredient}</h3>
                </div>
              );
            })}
        </section>
        <section>
          <div className={style.btnContainer}>
            <button>Import All Ingredients</button>
            <button>Import Selected Ingredients</button>
            <button>Ola</button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ListImportModal;
