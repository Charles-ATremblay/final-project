import React, { createContext, useContext, useState } from 'react';

const SearchResultContext = createContext();

export function SearchResultProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchResultContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultContext.Provider>
  );
}

export function useSearchResults() {
  return useContext(SearchResultContext);
}