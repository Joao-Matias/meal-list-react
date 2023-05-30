import React from 'react';
import style from './list-lists.module.css';

const ListLists = (props) => {
  const { listOfLists, setActivePage } = props;

  const selectList = (list) => {
    setActivePage(list);
  };

  return (
    <ul className={style.listOfLists}>
      {listOfLists.map((list, i) => {
        return (
          <li
            key={i}
            onClick={() => {
              selectList(list);
            }}
          >
            {list.listName}
          </li>
        );
      })}
    </ul>
  );
};

export default ListLists;
