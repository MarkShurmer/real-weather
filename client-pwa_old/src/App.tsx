import { Home } from '@home/Home';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './error/ErrorFallback';
import './App.css';

function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <section className="App" role="main">
                <div>Header</div>
                <Home />
            </section>
        </ErrorBoundary>
    );
}

export default App;
