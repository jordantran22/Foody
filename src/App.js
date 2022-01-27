import './App.css';
import Login from './components/Login'
import Footer from './components/Footer'
import Register from './components/Register';
import { Route, Link } from 'react-router-dom'
import { useState } from 'react';
import HomePage from './components/HomePage';
import {useEffect} from 'react';
import RestaurantPage from './components/RestaurantPage';

function App() {

  const [randomBackground, setRandomBackground] = useState('')

  const getRandomBackground = (backgroundImageClass) => {
    const randomBackground = backgroundImageClass[Math.floor(Math.random() * backgroundImageClass.length)]
    setRandomBackground(randomBackground)
    console.log(randomBackground);
  }

  const backgroundImageClass = ['login-background-1', 'login-background-2', 'login-background-3']

  useEffect(() => {

    getRandomBackground(backgroundImageClass)
  }, [])

  return (
    <div className="App">
        <Route exact path="/" component={() => <Login background={randomBackground} />} />
        <Route exact path="/components/Register.js" component={() => <Register background={randomBackground} />} />
        <Route exact path="/components/HomePage.js" component={HomePage} />
        <Route exact path="/components/Footer.js" component={Footer} />
        <Route exact path="/components/RestaurantPage.js" component={RestaurantPage} />

        {/* <Login /> */}

      
    </div>
  );
}

export default App;
