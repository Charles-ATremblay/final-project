import React, { createContext, useContext, useState } from 'react';

// Create a context
const FavoriteCocktailContext = createContext();

// Create a context provider component
export function FavoriteCocktailProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Function to add a cocktail to favorites
  const addFavorite = (cocktail) => {
    setFavorites([...favorites, cocktail]);
  };

  // Define the context value
  const contextValue = {
    favorites,
    addFavorite,
  };

  return (
    <FavoriteCocktailContext.Provider value={contextValue}>
      {children}
    </FavoriteCocktailContext.Provider>
  );
}

// Custom hook to use the context
export function useFavoriteCocktails() {
  const context = useContext(FavoriteCocktailContext);
  if (!context) {
    throw new Error('useFavoriteCocktails must be used within a FavoriteCocktailProvider');
  }
  return context;
}