import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <>
    <Navbar/>

    <Route exact path='/'> <Home/> </Route>
    <Route exact path='/Contact'> <Contact/> </Route>
    <Route exact path='/About'> <About/> </Route>
    <Route exact path='/Signup'> <Signup/> </Route>
    <Route exact path='/Login'> <Login/> </Route>
    
    </>
    
  )
}

export default App
