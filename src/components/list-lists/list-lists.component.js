import React from 'react';
import style from './list-lists.module.css';

const ListLists = (props) => {
  const { listOfLists, setActivePage } = props;
  console.log(listOfLists);

  const selectList = (listName) => {
    setActivePage(listName);
  };

  return (
    <ul className={style.listOfLists}>
      {listOfLists.map((list, i) => {
        console.log(list);
        return (
          <li
            key={i}
            onClick={() => {
              selectList(list.listName);
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
