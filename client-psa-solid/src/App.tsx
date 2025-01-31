import PWABadge from "./PWABadge.tsx";
import { CurrentWeather } from "./weather/CurrentWeather.tsx";

function App() {
  return (
    <>
      <h1>Current weather</h1>
      <CurrentWeather />

      <PWABadge />
    </>
  );
}

export default App;
