import React, { useContext, useState } from 'react';
import style from './list-nav.module.css';
import { ImPlus } from 'react-icons/im';
import ListLists from '../list-lists';
import ListIngredients from '../list-ingredients';
import ListImportModal from '../list-import-modal';
import { addShoppingList, addNewItem } from '../../services/recipe-list';
import { Context } from '../../App';

const ListNav = () => {
  const [openInputNewItem, setOpenInputNewItem] = useState(false);
  const [importRecipesModal, setImportRecipesModal] = useState(false);
  const [updateName, setUpdateName] = useState('');
  const [activePage, setActivePage] = useState({
    listName: 'Lists',
  });

  const [listOfRecipes, , listOfLists, setListOfLists] = useContext(Context);

  const addNewLine = () => {
    setOpenInputNewItem(true);
  };

  const clickToAddNew = (keyDown) => {
    if (keyDown.key === 'Enter') {
      if (updateName.trim().length < 1) {
        setOpenInputNewItem(false);
        return;
      } else {
        switch (activePage.listName) {
          case 'Lists':
            const listId = Date.now();

            setListOfLists((prevState) => {
              const newList = {
                listName: updateName,
                ingredientsList: [],
                id: listId,
              };

              return [...prevState, newList];
            });

            addShoppingList({
              listName: updateName,
              ingredientsList: [],
              id: listId,
            });
            setOpenInputNewItem(false);
            setUpdateName('');
            break;

          case activePage.listName:
            if (updateName.trim().length < 1) {
              setOpenInputNewItem(false);
              return;
            } else {
              const itemId = Date.now();

              const response = addNewItem(activePage, updateName, itemId);

              if (response)
                setListOfLists((prevState) => {
                  const updatedList = prevState.map((list) => {
                    if (list.id === activePage.id) {
                      return {
                        ...list,
                        ingredientsList: [
                          ...list.ingredientsList,
                          { ingredient: updateName, id: itemId },
                        ],
                      };
                    } else {
                      return list;
                    }
                  });

                  return updatedList;
                });

              setOpenInputNewItem(false);
              setUpdateName('');
              break;
            }
          default:
        }
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
      <h1 className={style.title}>
        Click Lists and create new. When a List is selected create an
        ingredient!
      </h1>
      <nav className={style.listNav}>
        <div className={style.listBtnContActive}>
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
          {listOfLists.length > 0 &&
            listOfRecipes.length > 0 &&
            activePage.listName !== 'Lists' && (
              <div hidden onClick={importRecipes} className={style.btnImport}>
                <h3 className={style.importBtnText}>Import Ingredients</h3>
                <ImPlus className={style.addNew} />
              </div>
            )}

          <div onClick={addNewLine} className={style.addNewBox}>
            {openInputNewItem ? (
              <input
                maxLength={activePage.listName === 'Lists' ? '30' : '65'}
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
