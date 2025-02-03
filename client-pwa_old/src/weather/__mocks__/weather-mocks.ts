import { Weather } from '@/api/api-contracts';

export const mockWeather: Weather = {
    date: new Date().toISOString(),
    elevation: 100,
    latLong: { latitude: 12, longitude: 23 },
    locationId: 102,
    name: 'Long Ditton',
    report: {
        dewPoint: { amount: 10, units: 'dp' },
        humidity: { amount: 20, units: '%' },
        pressure: { amount: 1010, units: 'hpa' },
        pressureTendency: 'mostly',
        temperature: { amount: 23, units: 'C' },
        visibility: { from: 10, to: 20, units: 'm' },
        weatherType: 'windy',
        windDirection: 'NE',
        windGust: { amount: 25, units: 'mph' },
        windSpeed: { amount: 55, units: 'mph' },
    },
};
