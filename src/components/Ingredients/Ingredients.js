import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-hooks-update-43e88-default-rtdb.firebaseio.com/ingredients.json')
      .then(res => res.json())
      .then(responseData => {
        const loadedData = [];
        for ( const key in responseData) {
          loadedData.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadedData);
      }
    );
  }, []);

  const addIngredientHandler = ingredient => {
    setUserIngredients( prevIngredients => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient }
    ]);
  };

  const removeItemHandler = (id) => {
    setUserIngredients( prevIngredients => prevIngredients.filter(p => p.id !== id));
  };

  return (
    <div className="App">
      <IngredientForm onAddIgredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeItemHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
