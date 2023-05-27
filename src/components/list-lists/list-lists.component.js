import React from 'react';
import style from './list-lists.module.css';

const ListLists = (props) => {
  const { listOfLists } = props;
  console.log(listOfLists);

  return (
    <ul className={style.listOfLists}>
      {listOfLists.map((list, i) => {
        return <li key={i}>{list.name}</li>;
      })}
    </ul>
  );
};

export default ListLists;
