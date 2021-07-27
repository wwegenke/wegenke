import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div id="root">
        <Navbar/>
        <Home/>
        <Footer/>
    </div>
  );
}

export default App;