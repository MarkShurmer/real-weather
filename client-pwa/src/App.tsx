import React from 'react';
import './App.css';
import { Home } from '@home/Home';
import CurrentWeather from './weather/CurrentWeather';

function App() {
  return (
    <section className="App">
      <div>Header</div>
      <Home />
    </section>
  );
}

export default App;
