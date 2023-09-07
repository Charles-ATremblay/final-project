import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Loading from '../Loading';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Auth0Provider';
import { useFavoriteCocktails } from '../../FavoriteCocktailContext';


const SingleCocktail = () => {
    const [cocktail, setCocktail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { addFavorite, favorites } = useFavoriteCocktails();

    // const { user } = useAuth();

    const { cocktailId } = useParams();

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

    useEffect(() => {
        console.log('cocktailId:', cocktailId);
        const fetchCocktail = async () => {
            try {
                const response = await axios.get(
                    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
                );

                if (
                    response.data &&
                    response.data.drinks &&
                    response.data.drinks.length > 0
                ) {
                    const cocktailData = response.data.drinks[0];
                    setCocktail(cocktailData);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching cocktail details:', error);
            }
        };

        fetchCocktail();

    }, [cocktailId]);

    if (!cocktail) {
        return <Loading />;
    }

    const splitInstructions = (instructions) => {
        return instructions.split('.').filter((instruction) => instruction.trim() !== '');
    };

    const { strDrink, strDrinkThumb, strInstructions } = cocktail;
    const ingredients = getIngredients(cocktail);
    const instructions = splitInstructions(strInstructions);

    const handleAddToFavorites = (cocktail) => {
        // Check if the cocktail is already in favorites
        const isAlreadyFavorite = favorites.some(
          (favorite) => favorite.idDrink === cocktail.idDrink
        );
    
        if (!isAlreadyFavorite) {
          addFavorite(cocktail);
          console.log(favorites)
          console.log('Cocktail added to favorites');
        } else {
          alert('Cocktail already in favorites');
        }
      };
        // make a simple version that adds the cocktail to the list of favorites
        // no need to use fetch
        // just use setFavorites([...favorites, cocktail])

        

        // const requestBody = {
        //     name: strDrink,
        //     image: strDrinkThumb,
        //     instructions: strInstructions,
        //     ingredients: ingredients,
        // };

        // console.log(user, 'userId')

        // if (user) {
        //     fetch(`/favorites/${user}`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(requestBody),
        //     })
        //         .then((response) => response.json())
        //         .then((data) => {
        //             console.log('Success in adding cocktail:', data);
        //             setFavorites([...favorites, data])
        //         }
        //         )
        //         .catch((error) => {
        //             console.error('Error:', error);
        //         }
        //         );
        // } else {
        //     console.error('User not logged in');

        // }




return (
    <Wrapper>
        {
            isLoading ? (
                <Loading />
            ) : (
                <>
                    <CocktailImage src={strDrinkThumb} alt={strDrink} />
                    <CocktailInfo>
                        <CocktailName>{strDrink}</CocktailName>
                        <Ingredients>
                            <h4>Ingredients</h4>
                            <ul>
                                {ingredients.map((ingredient, i) => (
                                    <li key={`${ingredient}-${i}`}>{ingredient}</li>
                                ))}
                            </ul>
                        </Ingredients>
                        <Instructions>
                            <h4>Instructions</h4>
                            {instructions.map((instruction, i) => (
                                <p key={`${instruction}-${i}`}>{instruction}</p>
                            ))}
                        </Instructions>
                        <AddToFavoritesButton onClick={handleAddToFavorites}>
                            Add to Favorites
                        </AddToFavoritesButton>
                    </CocktailInfo>
                </>
            )
        }

    </Wrapper>
);
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f0f0f0; /* Light background color */
`;

const CocktailImage = styled.img`
  width: 50%;
  height: auto;
`;

const CocktailInfo = styled.div`
  width: 45%;
  text-align: left;
`;

const CocktailName = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
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

  p {
    font-size: 16px;
  }
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

  &:hover {
    background-color: #ff5722; /* Slightly darker orange on hover */
  }
`;

export default SingleCocktail;
