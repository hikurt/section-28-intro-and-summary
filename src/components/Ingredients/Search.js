import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');

  const filterHandler = (event) => {
    console.log(enteredFilter);
    setEnteredFilter(event.target.value);
  };

  useEffect(()=> {
    const query = 
      enteredFilter.length === 0 
        ? '' 
        : `?orderBy="title"&equalTo="${enteredFilter}"`;

    fetch('https://react-hooks-update-43e88-default-rtdb.firebaseio.com/ingredients.json' + query)
      .then(res => res.json())
      .then(responseData => {
        const loadedIngredients = [];
        for ( const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        onLoadIngredients(loadedIngredients);
      }
    );
  }, [enteredFilter, onLoadIngredients]);


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" onChange={filterHandler} value={enteredFilter}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
