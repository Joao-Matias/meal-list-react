import React, { useContext, useState } from 'react';
import style from './list-nav.module.css';
import { ImPlus } from 'react-icons/im';
import ListLists from '../list-lists';
import ListIngredients from '../list-ingredients';
import ListImportModal from '../list-import-modal';
import { addList } from '../../services/recipe-list';
import { Context } from '../../App';

const ListNav = () => {
  const [openInputNewItem, setOpenInputNewItem] = useState(false);
  const [importRecipesModal, setImportRecipesModal] = useState(false);
  const [updateName, setUpdateName] = useState({});
  const [activePage, setActivePage] = useState({
    listName: 'Lists',
  });

  const [, , listOfLists, setListOfLists] = useContext(Context);

  const addNewLine = () => {
    setOpenInputNewItem(true);
  };

  const clickToAddNew = (keyDown) => {
    if (keyDown.key === 'Enter') {
      switch (activePage.listName) {
        case 'Lists':
          const id = Date.now();

          setListOfLists((prevState) => {
            const newList = {
              listName: updateName,
              ingredientsList: [],
              id: id,
            };

            return [...prevState, newList];
          });

          addList({ listName: updateName, ingredientsList: [], id: id });
          setOpenInputNewItem(false);
          break;

        case activePage.listName:
          setListOfLists((prevState) => {
            const updatedList = prevState.map((list) => {
              if (list.id === activePage.id) {
                return {
                  ...list,
                  ingredientsList: [
                    ...list.ingredientsList,
                    { ingredient: updateName, id: Date.now() },
                  ],
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

  const importRecipes = () => {
    setImportRecipesModal(true);
  };

  return (
    <section className={style.listContainerBox}>
      {importRecipesModal && (
        <ListImportModal
          setImportRecipesModal={setImportRecipesModal}
          activePage={activePage}
          setListOfLists={setListOfLists}
        />
      )}
      <h1 className={style.title}>Let's Build Your Shopping Lists!</h1>
      <nav className={style.listNav}>
        <div
          className={
            activePage.listName === 'Lists'
              ? style.listBtnContActive
              : style.listBtnCont
          }
        >
          <button
            className={style.listBtn}
            onClick={() => {
              setActivePage({
                listName: 'Lists',
              });
            }}
          >
            <h5>Lists</h5>
          </button>
        </div>
        <div className={style.btnContainer}>
          {listOfLists.length > 0 && activePage.listName !== 'Lists' && (
            <div hidden onClick={importRecipes} className={style.btnImport}>
              <h3 className={style.importBtnText}>Import Ingredients</h3>
              <ImPlus className={style.addNew} />
            </div>
          )}

          <div onClick={addNewLine} className={style.addNewBox}>
            {openInputNewItem ? (
              <input
                maxLength={activePage.listName === 'Lists' ? '22' : '65'}
                onKeyDown={(event) => {
                  clickToAddNew(event);
                }}
                onChange={(event) => {
                  setUpdateName(event.target.value);
                }}
                autoFocus
                placeholder='Press enter to confirm'
                className={style.newInput}
              />
            ) : (
              <div>
                <h3>
                  {activePage.listName === 'Lists'
                    ? 'Add New List'
                    : 'Add New Item'}
                </h3>
              </div>
            )}

            <ImPlus className={style.addNew} />
          </div>
        </div>
      </nav>
      <div className={style.listContainer}>
        <ListLists
          setListOfLists={setListOfLists}
          setActivePage={setActivePage}
          activePage={activePage}
          listOfLists={listOfLists}
        />
        <ListIngredients
          listOfLists={listOfLists}
          activePage={activePage}
          setListOfLists={setListOfLists}
        />
      </div>
    </section>
  );
};

export default ListNav;
