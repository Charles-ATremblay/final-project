import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { CgProfile } from 'react-icons/cg';
import { useNavigate, useHistory } from 'react-router-dom'; 
import { useSearchResults } from '../../SearchResultContext';
import { useAuth0 } from '@auth0/auth0-react';

function Header() {
  const { setSearchResults } = useSearchResults();
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleSearch = (results) => {
    if(isAuthenticated){
      setSearchResults(results);
      navigate('/searchResults');
    }
    else{
      loginWithRedirect();
    }
    
  };

  const handleLogoClick = () => {
    if(isAuthenticated){
      setSearchResults(null);
      navigate('/');
    }else
    {
      loginWithRedirect();
    }    
  };

  const handleProfileClick = () => {
    if(isAuthenticated){
      navigate('/profile');
    }
    else{
      loginWithRedirect();
    }
  };

  const handleSignInClick = () => {
    if (isAuthenticated) {
      // If the user is authenticated, log them out
      logout();
    } else {
      // If the user is not authenticated, show the login dialog
      const currentPath = window.location.pathname;
      sessionStorage.setItem('previousPath', currentPath); // Store the previous path
      loginWithRedirect();
    }
  };

  const handleCocktailsClick = () => {
    if(isAuthenticated){
      navigate('/cocktails');
    }
    else{
      loginWithRedirect();
    }
  };

  const handleNavigationClick = (path) => {
    if(isAuthenticated){
      navigate(path);
    }
    else{
      loginWithRedirect();
    }
  };
  

  return (
    <Wrapper>
      <Logo onClick={handleLogoClick}>
        <Cocktail>Cocktail</Cocktail>
        <Hub>Hub</Hub>
      </Logo>
      <Navigation>
        <NavList>
        <NavItem>
            <NavButton onClick={() => handleNavigationClick('/')}>Home</NavButton>
          </NavItem>
          <NavItem>
            <NavButton onClick={() => handleNavigationClick('/about')}>About</NavButton>
          </NavItem>
          <NavItem>
            <NavButton onClick={handleCocktailsClick}>Cocktails</NavButton>
          </NavItem>
        </NavList>
      </Navigation>
      <SearchBarSection>
        <SearchBar onSearch={handleSearch} />
      </SearchBarSection>
      <UserSection>
        <SignIn onClick={handleSignInClick}>
          {isAuthenticated ? 'Log Out' : 'Sign In'}
        </SignIn>
        <Profile onClick={handleProfileClick}><CgProfile size={20} /></Profile>
      </UserSection>
    </Wrapper>
  );
}


const Wrapper = styled.header`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled.button`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-right: 20px;  
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Navigation = styled.nav`
  ul {
    list-style-type: none;
    display: flex;
    gap: 20px;
  }
`;

const NavItem = styled.li`
  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 20px;
`;

const SearchBarSection = styled.div`
  flex-grow: 1;
  margin: 0 20px;  
`;

const UserSection = styled.div`
  button {
    background-color: #444;
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      background-color: #555;
    }
  }
`;

const SignIn = styled.button`
  background-color: #444;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 10px;
  
  &:hover {
    background-color: #555;
    }
`;

const Profile = styled.button`
  background-color: #444;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 10px;
  
  &:hover {
    background-color: #555;
    }
`;

const Cocktail = styled.span`
  color: #ff9800;
`;

const Hub = styled.span`
  color: #fff;
`;



export default Header;