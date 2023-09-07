import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; {new Date().getFullYear()} Charles-Antoine Tremblay</FooterText>
      <FooterText>Contact: your@email.com</FooterText>
      <FooterText>Address: 1234 Street Name, City, Country</FooterText>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 14px;
`;

export default Footer;