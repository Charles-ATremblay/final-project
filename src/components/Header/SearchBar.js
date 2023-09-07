import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('drink'); // Default to searching by drink

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = async () => {
    try {
      let response;
      if (searchType === 'drink') {
        // Search by drink name
        response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
        );
      } else {
        // Search by ingredient
        response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`
        );
      }

      if (
        response.data &&
        response.data.drinks &&
        response.data.drinks.length > 0
      ) {
        // If results are found, pass them to the parent component
        onSearch(response.data.drinks);
        console.log(response.data.drinks);
      } else {
        // If no results are found, pass an empty array to indicate no results
        onSearch([]);
      }
    } catch (error) {
      console.error('Error searching for cocktails:', error);
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Search for a cocktail by ..."
        value={query}
        onChange={handleInputChange}
      />
      <SearchSelect value={searchType} onChange={handleSearchTypeChange}>
        <option value="drink">Search by Drink Name</option>
        <option value="ingredient">Search by Ingredient</option>
      </SearchSelect>
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchBarContainer>
  );
};


const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  max-width: 400px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
  outline: none;

  &:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const SearchSelect = styled.select`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
  outline: none;
  cursor: pointer;
`;

const SearchButton = styled.button`
  background-color: #ff9800;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff5722;
  }
`;

export default SearchBar;