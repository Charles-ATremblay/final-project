import React, { useState } from 'react';
import styled from 'styled-components';
import { useSearchResults } from '../SearchResultContext';
import { useNavigate } from 'react-router-dom';

const itemsPerPage = 10; // Number of items to display per page

function SearchResults() {
  const { searchResults } = useSearchResults();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Wrapper>
      <Title>Search Results</Title>
      <CocktailList>
        {currentItems.map((result, index) => (
          <CocktailItem key={result.idDrink} onClick={() => navigate(`/cocktails/${result.idDrink}`)}>
            <CocktailImage src={result.strDrinkThumb} alt={result.strDrink} />
            <CocktailName>{result.strDrink}</CocktailName>
          </CocktailItem>
        ))}
      </CocktailList>
      <Pagination>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= searchResults.length}
        >
          Next
        </PaginationButton>
      </Pagination>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const CocktailList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columns */
  grid-auto-rows: 1fr; /* 2 rows */
  gap: 20px;
`;

const CocktailItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CocktailImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const CocktailName = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #ff9800;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
  margin: 0 10px;

  &:hover {
    background-color: #ff5722;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default SearchResults;
