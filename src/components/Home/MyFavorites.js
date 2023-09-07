import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loading from '../Loading';
import { useFavoriteCocktails } from '../../FavoriteCocktailContext';


const MyFavorites = () => {

    const [favoriteDrinks, setFavoriteDrinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addFavorite, favorites } = useFavoriteCocktails();


    const favoriteDrinkNames = [
        'Whiskey Sour',
        'Mojito',
        'Sex on the Beach',
        'Long Island Iced Tea',
        'Daiquiri'
    ];

    useEffect(() => {
        const fetchFavoriteDrinks = async () => {
            const drinksData = [];

            for (const drinkName of favoriteDrinkNames) {
                try {
                    const response = await axios.get(
                        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
                    );

                    if (
                        response.data &&
                        response.data.drinks &&
                        response.data.drinks.length > 0
                    ) {
                        const drink = response.data.drinks[0];
                        drinksData.push(drink);
                    }
                } catch (error) {
                    console.error(`Error fetching ${drinkName} details:`, error);
                }
            }

            setFavoriteDrinks(drinksData);
            setIsLoading(false);
        };

        fetchFavoriteDrinks();
    }, []);

    const getIngredients = (drink) => {
        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${ingredient}${measure ? ` (${measure})` : ''}`);
            } else {
                // If there are no more ingredients, break the loop
                break;
            }
        }

        return ingredients;
    };


    const splitInstructions = (instructions) => {
        return instructions.split('.').filter((instruction) => instruction.trim() !== '');
    };

    const handleAddToFavorites = (drink) => {
        // Check if the cocktail is already in favorites
        const isAlreadyFavorite = favorites.some(
          (favorite) => favorite.idDrink === drink.idDrink
        );
    
        if (!isAlreadyFavorite) {
          addFavorite(drink);
          console.log(favorites)
          console.log('Cocktail added to favorites');
        } else {
          alert('Cocktail already in favorites');
        }
      };

    return (
        <Wrapper>
            <Title>Our Favorites</Title>
            {isLoading ? (
                <Loading /> // Render the loading indicator while fetching data
            ) : (
                <DrinkList>
                    {favoriteDrinks.map((drink, index) => (
                        <DrinkItem key={`${drink.idDrink}-${index}`}>
                            <DrinkImage src={drink.strDrinkThumb} alt={drink.strDrink} />
                            <DrinkInfo>
                                <DrinkName>{drink.strDrink}</DrinkName>
                                <Ingredients>
                                    <h4>Ingredients</h4>
                                    <ul>
                                        {getIngredients(drink).map((ingredient, i) => (
                                            <li key={`${ingredient}-${i}`}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </Ingredients>
                                <Instructions>
                                    <h4>Instructions</h4>
                                    {splitInstructions(drink.strInstructions).map((instruction, i) => (
                                        <Instruction key={`${instruction}-${i}`}>{instruction}</Instruction>
                                    ))}
                                </Instructions>
                                <AddToFavoritesButton onClick={() => handleAddToFavorites(drink)}>Add to Favorites</AddToFavoritesButton>

                            </DrinkInfo>
                        </DrinkItem>
                    ))}
                </DrinkList>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0; 
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const DrinkList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const DrinkItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 400px; 
  width: 100vw;
  align-items: center; 
`;

const DrinkImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
`;

const DrinkInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DrinkName = styled.h3`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const Ingredients = styled.div`
  margin-top: 10px;

  h4 {
    font-size: 18px;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    margin-top: 10px;
  }

  li {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

const Instructions = styled.div`
  margin-top: 20px;

  h4 {
    font-size: 18px;
  }
`;

const Instruction = styled.p`
  font-size: 16px;
`;

const AddToFavoritesButton = styled.button`
    background-color: #ff9800;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 18px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
    margin-top: 20px;
    width: 20vw;

    &:hover {
        background-color: #ff5722;
    }

`;


export default MyFavorites;