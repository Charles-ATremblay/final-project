import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth0Provider';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const CocktailGrid = () => {
    const [cocktails, setCocktails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cocktailsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                let response;

                if (selectedLetter) {
                    response = await axios.get(
                        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${selectedLetter}`
                    );
                } else {
                    response = await axios.get(
                        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`
                    );
                }

                if (
                    response.data &&
                    response.data.drinks &&
                    response.data.drinks.length > 0
                ) {
                    setCocktails(response.data.drinks);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cocktails:', error);
            }
        };

        fetchCocktails();
    }, [selectedLetter]);

    const handleAlphabetClick = (letter) => {
        setSelectedLetter(letter);
        setCurrentPage(1);
    };

    // Calculate the index range for the current page
    const indexOfLastCocktail = currentPage * cocktailsPerPage;
    const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
    const currentCocktails = cocktails.slice(indexOfFirstCocktail, indexOfLastCocktail);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Wrapper>
            <Title>Cocktails</Title>
            <AlphabetButtons>
                {Array.from(alphabet).map((letter) => (
                    <AlphabetButton
                        key={letter}
                        onClick={() => handleAlphabetClick(letter)}
                        active={selectedLetter === letter}
                    >
                        {letter}
                    </AlphabetButton>
                ))}
            </AlphabetButtons>
            {isLoading ? (
                <LoadingIndicator>Loading...</LoadingIndicator>
            ) : (
                <>
                    <CocktailList>
                        {currentCocktails.map((cocktail) => (
                            <CocktailItem key={cocktail.idDrink} onClick={() => navigate(`/cocktails/${cocktail.idDrink}`)}>
                            <CocktailImage src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                            <CocktailName>{cocktail.strDrink}</CocktailName>
                        </CocktailItem>
                        ))}
                    </CocktailList>
                    <Pagination>
                        <PaginationButton
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </PaginationButton>
                        <PaginationButton
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentCocktails.length < cocktailsPerPage}
                        >
                            Next
                        </PaginationButton>
                    </Pagination>
                </>
            )}
        </Wrapper>
    );
};

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

const AlphabetButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`;

const AlphabetButton = styled.button`
    background-color: ${({ active }) => (active ? '#ff5722' : '#ff9800')};
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
    margin: 10px 0px; 
    width: 40px; 
    text-align: center; 
    
    &:hover {
        background-color: #ff5722;
    }
`;

const LoadingIndicator = styled.div`
    font-size: 20px;
    margin-top: 20px;
`;

const CocktailList = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* Changed to 5 columns */
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

export default CocktailGrid;
