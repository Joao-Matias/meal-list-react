import React, { useState } from 'react';
import style from './list-nav.module.css';
import { ImPlus } from 'react-icons/im';
import './list-nav.module.css';

const ListNav = () => {
  const [openInputNewItem, setOpenInputNewItem] = useState(false);
  const [updateName, setUpdateName] = useState(``);
  const [newElement, setNewElement] = useState([]);

  const addNewLine = () => {
    setOpenInputNewItem(true);
  };

  const clickToAddNew = (keyDown) => {
    if (keyDown.key === 'Enter') {
      setNewElement([updateName]);
      setOpenInputNewItem(false);
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
    </section>
  );
};

export default ListNav;
