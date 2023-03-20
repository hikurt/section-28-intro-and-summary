import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  const filterHandler = (event) => {
    console.log(enteredFilter);
    setEnteredFilter(event.target.value);
  };

  useEffect(()=> {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
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
      } 
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [enteredFilter, onLoadIngredients]);


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
            ref={inputRef}
            type="text"
            onChange={filterHandler}
            value={enteredFilter}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
