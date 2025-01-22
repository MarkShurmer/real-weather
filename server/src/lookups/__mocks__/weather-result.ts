import { Weather } from '@lookups/types';

export const getWeatherResult = (): Weather => ({
    date: new Date(),
    elevation: 15.0,
    latLong: {
        latitude: 60.749,
        longitude: -0.854,
    },
    locationId: 3002,
    name: 'Baltasound',
    report: {
        dewPoint: {
            amount: -1.2,
            units: 'C',
        },
        humidity: {
            amount: 72.6,
            units: '%',
        },
        pressure: {
            amount: 1014,
            units: 'hpa',
        },
        pressureTendency: 'R',
        temperature: {
            amount: 3.2,
            units: 'C',
        },
        visibility: {
            from: 55,
            to: 55,
            units: 'km',
        },
        weatherType: 'Overcast',
        windDirection: 'NNW',
        windGust: {
            amount: 32,
            units: 'mph',
        },
        windSpeed: {
            amount: 21,
            units: 'mph',
        },
    },
});

export const getWeatherResultHighVis = (): Weather => ({
    date: new Date(),
    elevation: 15.0,
    latLong: {
        latitude: 60.749,
        longitude: -0.854,
    },
    locationId: 3002,
    name: 'Baltasound',
    report: {
        dewPoint: {
            amount: -1.2,
            units: 'C',
        },
        humidity: {
            amount: 72.6,
            units: '%',
        },
        pressure: {
            amount: 1014,
            units: 'hpa',
        },
        pressureTendency: 'R',
        temperature: {
            amount: 3.2,
            units: 'C',
        },
        visibility: {
            from: 40,
            to: 100,
            units: 'km',
        },
        weatherType: 'Overcast',
        windDirection: 'NNW',
        windGust: {
            amount: 32,
            units: 'mph',
        },
        windSpeed: {
            amount: 21,
            units: 'mph',
        },
    },
});
