import React, { useState } from 'react';
import style from './list-nav.module.css';
import { ImPlus } from 'react-icons/im';
import ListLists from '../list-lists';
import ListIngredients from '../list-ingredients';
import ListImportModal from '../list-import-modal';

const ListNav = () => {
  const [openInputNewItem, setOpenInputNewItem] = useState(false);
  const [importRecipesModal, setImportRecipesModal] = useState(false);
  const [updateName, setUpdateName] = useState({});
  const [activePage, setActivePage] = useState({
    listName: 'Lists',
  });

  const [listOfLists, setListOfLists] = useState([]);

  const addNewLine = () => {
    setOpenInputNewItem(true);
  };

  const clickToAddNew = (keyDown) => {
    if (keyDown.key === 'Enter') {
      switch (activePage.listName) {
        case 'Lists':
          setListOfLists((prevState) => {
            return [
              ...prevState,
              { listName: updateName, ingredientsList: [], id: Date.now() },
            ];
          });
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
        <button
          onClick={() => {
            setActivePage({
              listName: 'Lists',
            });
          }}
        >
          Lists
        </button>
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
