import React from 'react';
import './App.css';
import { Home } from '@home/Home';
import CurrentWeather from './weather/CurrentWeather';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './error/ErrorFallback';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className="App">
        <div>Header</div>
        <Home />
      </section>
    </ErrorBoundary>
  );
}

export default App;
