import React, { useState } from 'react';
import style from './list-nav.module.css';
import { ImPlus } from 'react-icons/im';
import ListLists from '../list-lists';
import ListIngredients from '../list-ingredients';

const ListNav = () => {
  const [openInputNewItem, setOpenInputNewItem] = useState(false);
  const [updateName, setUpdateName] = useState({});
  const [activePage, setActivePage] = useState('Lists');

  const [listOfLists, setListOfLists] = useState([]);

  const addNewLine = () => {
    setOpenInputNewItem(true);
  };

  console.log(listOfLists);

  const clickToAddNew = (keyDown) => {
    if (keyDown.key === 'Enter') {
      switch (activePage) {
        case 'Lists':
          setListOfLists((prevState) => {
            return [...prevState, { listName: updateName, ingredients: [] }];
          });
          setOpenInputNewItem(false);
          break;

        case activePage:
          setListOfLists((prevState) => {
            const updatedList = prevState.map((list) => {
              if (list.listName === activePage) {
                return {
                  ...list,
                  ingredients: [...list.ingredients, updateName],
                };
              } else {
                return list;
              }
            });

            return updatedList;
          });
          setOpenInputNewItem(false);
          break;
        default:
      }
    }
  };

  return (
    <section className={style.listContainerBox}>
      <h1 className={style.title}>Let's Build Your Shopping Lists!</h1>
      <nav className={style.listNav}>
        <button>Lists</button>
        <div onClick={addNewLine} className={style.addNewBox}>
          {openInputNewItem ? (
            <input
              onKeyDown={(event) => {
                clickToAddNew(event);
              }}
              onChange={(event) => {
                setUpdateName(event.target.value);
              }}
              autoFocus
              placeholder='Press enter to confirm'
            />
          ) : (
            <h3>Add New</h3>
          )}

          <ImPlus className={style.addNew} />
        </div>
      </nav>
      <div className={style.listContainer}>
        <ListLists setActivePage={setActivePage} listOfLists={listOfLists} />
        <ListIngredients listOfLists={listOfLists} activePage={activePage} />
      </div>
    </section>
  );
};

export default ListNav;
