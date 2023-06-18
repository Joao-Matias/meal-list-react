import React, { useState } from 'react';
import style from './list-lists.module.css';
import { ImPencil, ImBin } from 'react-icons/im';

const ListLists = (props) => {
  const { listOfLists, setActivePage, setListOfLists, activePage } = props;

  const [inputModal, setInputModal] = useState(false);
  const [toEdit, setToEdit] = useState();
  const [updatedListName, setUpdatedListName] = useState();

  const selectList = (list) => {
    setActivePage(list);
  };

  const handleEditIngClick = (list) => {
    setInputModal(true);
    setToEdit(list);
  };

  const confirmNameChange = (event, list) => {
    const { id } = list;

    if (event.key === 'Enter') {
      setListOfLists((prevState) => {
        return prevState.map((lst) => {
          if (lst.id === id) {
            return { ...lst, listName: updatedListName };
          } else {
            return lst;
          }
        });
      });

      setInputModal(false);
    }
  };

  console.log(listOfLists);

  const handleDeleteIngClick = (list) => {
    setListOfLists((prevState) => {
      return prevState.filter((lst) => {
        return lst.id !== list.id;
      });
    });

    if (activePage.id === list.id) {
      setActivePage({
        listName: 'Lists',
      });
    }
  };

  return (
    <ul className={style.listOfLists}>
      {listOfLists.map((list, i) => {
        return (
          <li className={style.list} key={i}>
            {inputModal && list.id === toEdit.id ? (
              <input
                className={style.inputNewName}
                onChange={(event) => {
                  setUpdatedListName(event.target.value);
                }}
                onKeyDown={(event) => {
                  confirmNameChange(event, list);
                }}
                autoFocus
                placeholder='Press enter to confirm'
              />
            ) : (
              <div
                className={
                  activePage.listName === list.listName
                    ? style.listNameContActive
                    : style.listNameCont
                }
                onClick={() => {
                  selectList(list);
                }}
              >
                <h3 className={style.listName}>{list.listName}</h3>
              </div>
            )}

            <div className={style.ingContEdit}>
              <div
                className={style.pencil}
                onClick={() => {
                  handleEditIngClick(list);
                }}
              >
                <ImPencil />
              </div>
              <div
                className={style.bin}
                onClick={() => {
                  handleDeleteIngClick(list);
                }}
              >
                <ImBin />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListLists;
