import React from 'react';
import 'normalize.css';
import styled, { createGlobalStyle } from 'styled-components';
import Aviasales from './aviasales';
import { ReactComponent as Logo } from '../Logo.svg';

const GlobalStyled = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap&subset=cyrillic');

  *{
    box-sizing: border-box;
  }

  body {
    background-color: #E5E5E5;
    overflow-x:hidden;
    font-family: 'Open Sans', sans-serif;
    transition: height 0.3s ease-in-out;
    min-height: 1000px;
  }
`;

const Container = styled.div`
  max-width: 960px;
  padding: 0 103px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const App = () => {
  return (
    <>
      <GlobalStyled />
      <Container>
        <Header>
          <Logo />
        </Header>
        <Row>
          <Aviasales />
        </Row>
      </Container>
    </>
  );
};

export default App;
