import React from 'react';
import styled from 'styled-components';

function About() {
  return (
    <AboutContainer>
      <Title>About CocktailHub</Title>
      <Paragraph>
        Welcome to CocktailHub, your go-to resource for discovering and
        exploring a world of cocktails! With CocktailHub, you can search for a
        wide variety of cocktails by name or ingredient, making it easy to find
        your favorite drinks or discover new ones.
      </Paragraph>
      <Paragraph>
        Whether you're a cocktail enthusiast, a bartender, or just looking to
        enjoy a refreshing beverage, CocktailHub has you covered. Our extensive
        database includes a diverse collection of cocktail recipes, complete
        with ingredients and instructions.
      </Paragraph>
      <Title>Key Features:</Title>
      <FeatureList>
        <FeatureListItem>Search for cocktails by name or ingredient.</FeatureListItem>
        <FeatureListItem>Explore a rich library of cocktail recipes.</FeatureListItem>
        <FeatureListItem>Save your favorite drinks for quick access.</FeatureListItem>
        <FeatureListItem>Learn how to make cocktails with step-by-step instructions.</FeatureListItem>
        <FeatureListItem>Discover new drinks with our random cocktail generator.</FeatureListItem>
      </FeatureList>
      <Paragraph>
        Whether you're hosting a party, looking for a signature drink, or simply
        curious about the world of cocktails, CocktailHub is your ultimate
        companion. Cheers to endless cocktail possibilities!
      </Paragraph>
    </AboutContainer>
  );
}

const AboutContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const FeatureList = styled.ul`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const FeatureListItem = styled.li`
  margin-left: 20px;
`;

export default About;
