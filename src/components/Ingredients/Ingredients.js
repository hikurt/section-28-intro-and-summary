import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-43e88-default-rtdb.firebaseio.com/ingredients.json',{
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 
        'Content-Type': "application/json"
      }
    }).then(response => response.json())
      .then(responseData => {
        setUserIngredients( prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ]);
      });
  };

  const removeItemHandler = (id) => {
    setUserIngredients( prevIngredients => prevIngredients.filter(p => p.id !== id));
  };

  return (
    <div className="App">
      <IngredientForm onAddIgredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeItemHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
