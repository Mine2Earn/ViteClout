import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import Description from "./components/Description";
import Container from "./components/Container";
import FeaturedVuilders from "./components/FeaturedVuilders";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Title>ViteClout</Title>
      <Container>
        <Description></Description>
        <FeaturedVuilders></FeaturedVuilders>
      </Container>
    </div>
  );
}

export default App;
