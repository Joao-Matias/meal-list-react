import React from 'react';

import { Link } from 'react-router-dom';
import MealLanding from '../meal-landing';
import ListLanding from '../list-landing';

const Landing = () => {
  return (
    <>
      <h1 className='title'>MeaList</h1>
      <div className='app'>
        <Link to='/meals'>
          <MealLanding />
        </Link>
        <Link to='/lists'>
          <ListLanding />
        </Link>
      </div>
    </>
  );
};

export default Landing;
