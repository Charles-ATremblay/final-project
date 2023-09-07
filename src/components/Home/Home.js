import React, { useState } from 'react';
import MyFavorites from './MyFavorites';
import styled from 'styled-components';
import axios from 'axios';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [randomCocktail, setRandomCocktail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchRandomCocktail = async () => {
    // Set isLoading to true when the button is clicked
    setIsLoading(true);

    try {
      const response = await axios.get(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      );

      if (response.data && response.data.drinks && response.data.drinks.length > 0) {
        const randomCocktail = response.data.drinks[0];
        setRandomCocktail(randomCocktail);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching random cocktail:', error);
    }
  };

  const handleMoreDetailsClick = () => {
    if (randomCocktail) {
      const cocktailId = randomCocktail.idDrink;
      navigate(`/cocktails/${cocktailId}`);
    }
  };

  return (
    <Wrapper>
      <Heading>Welcome to CocktailHub</Heading>
      <Description>
        Discover, create, and enjoy a wide variety of cocktails and mocktails. 
        Explore new drinks, save your favorites, and become a mixology expert!
      </Description>

      <FeelingLucky onClick={fetchRandomCocktail}>Feeling Lucky?</FeelingLucky>

       {isLoading && <Loading />} {/* Show loading only when isLoading is true */}

      {!isLoading && randomCocktail && (
        <CocktailSection>
          <CocktailName>Your Random Cocktail:</CocktailName>
          <CocktailDesc>{randomCocktail.strDrink}</CocktailDesc>
          <CocktailImg src={randomCocktail.strDrinkThumb} alt={randomCocktail.strDrink}></CocktailImg>
          <SeeMore onClick={handleMoreDetailsClick}>More Details</SeeMore>
        </CocktailSection>
      )}

      <MyFavorites />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0; /* Light background color */
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333; /* Dark text color */
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555; /* Slightly darker text color */
  margin-bottom: 20px;
`;

const FeelingLucky = styled.button`
  background-color: #ff9800; /* Orange button color */
  color: #fff; /* White text color */
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 20px;

  &:hover {
    background-color: #ff5722; /* Slightly darker orange on hover */
  }
`;

const CocktailSection = styled.div`
  background-color: #fff; /* White background color */
  padding: 20px;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow effect */
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow on hover */
  }
`;

const CocktailName = styled.h3`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const CocktailDesc = styled.p`
  font-size: 18px;
  color: #555;
  text-align: center;
`;

const CocktailImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 20px 0;
  border-radius: 50%; /* Circular image */
`;

const SeeMore = styled.button`
  background-color: #ff9800;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff5722; /* Slightly darker orange on hover */
  }
`;


export default Home;
