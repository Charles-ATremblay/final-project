import React from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import Home from './Home/Home';
import About from './About/About';
import CocktailGrid from './Cocktails/CocktailGrid';
import SingleCocktail from './Cocktails/SingleCocktail';
import Profile from './User/Profile/Profile';
import SignIn from './User/SignIn';
import SignUp from './User/SignUp';
import Favorites from './User/Profile/Favorites';
import ErrorPage from './ErrorPage';
import GlobalStyles from './GlobalStyles';
import { SearchResultProvider } from '../SearchResultContext';
import Auth0ProviderWithHistory from '../Auth0Provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchResults from './SearchResults';
// import EditProfile from './User/Profile/EditProfile';
import { FavoriteCocktailProvider } from '../FavoriteCocktailContext';



const App = () => {

  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <FavoriteCocktailProvider>
          <SearchResultProvider>
            <GlobalStyles />
            <Header />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/cocktails' element={<CocktailGrid />} />
              <Route path='/cocktails/:cocktailId' element={<SingleCocktail />} />
              <Route path='/searchResults' element={<SearchResults />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>

            <Footer />
          </SearchResultProvider>
        </FavoriteCocktailProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter >
  )
}
export default App;
