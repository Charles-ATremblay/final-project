import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useFavoriteCocktails } from '../../../FavoriteCocktailContext';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { favorites } = useFavoriteCocktails();
  console.log('favorites:', favorites);

  return (
    <ProfileWrapper>
      {isAuthenticated ? (
        <>
          <ProfileHeading>Your Profile</ProfileHeading>
          <ProfileContent>
            <div>
              <strong>Name:</strong> {user?.name}
            </div>
            <div>
              <strong>Username:</strong> {user?.username}
            </div>
            <div>
              <strong>Email:</strong> {user?.email}
            </div>
          </ProfileContent>
          <FavoritesSection>
            <h2>Favorites</h2>
            {favorites.length > 0 ? (
              <CocktailGrid>
                {favorites.map((favorite) => (
                  <CocktailBox key={favorite.idDrink}>
                    <CocktailName>{favorite.strDrink}</CocktailName>
                    {/* Add other details about the cocktail here */}
                  </CocktailBox>
                ))}
              </CocktailGrid>
            ) : (
              <p>No favorites found.</p>
            )}
          </FavoritesSection>
        </>
      ) : (
        <p>Please log in to access your profile.</p>
      )}
    </ProfileWrapper>
  );
};

// Styled components for styling
const ProfileWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const ProfileHeading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ProfileContent = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 20px;
`;

const FavoritesSection = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const CocktailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const CocktailBox = styled.div`
  background-color: #f0f0f0; /* Light background color */
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CocktailName = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

export default Profile;