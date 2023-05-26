import { getDateNow } from '@common/date-service';
import { Weather } from '@lookups/types';

export const weatherResult: Weather = {
    date: getDateNow(),
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
};

//     {
//         D: 'NNW',
//         G: '32',
//         H: '72.6',
//         P: '1014',
//         S: '21',
//         T: '3.2',
//         V: '55000',
//         W: '8',
//         Pt: 'R',
//         Dp: '-1.2',
//         $: '960',
//       },

//   units: [
//     {
//       name: 'G',
//       units: 'mph',
//       $: 'Wind Gust',
//     },
//     {
//       name: 'T',
//       units: 'C',
//       $: 'Temperature',
//     },
//     {
//       name: 'V',
//       units: 'm',
//       $: 'Visibility',
//     },
//     {
//       name: 'D',
//       units: 'compass',
//       $: 'Wind Direction',
//     },
//     {
//       name: 'S',
//       units: 'mph',
//       $: 'Wind Speed',
//     },
//     {
//       name: 'W',
//       units: '',
//       $: 'Weather Type',
//     },
//     {
//       name: 'P',
//       units: 'hpa',
//       $: 'Pressure',
//     },
//     {
//       name: 'Pt',
//       units: 'Pa/s',
//       $: 'Pressure Tendency',
//     },
//     {
//       name: 'Dp',
//       units: 'C',
//       $: 'Dew Point',
//     },
//     {
//       name: 'H',
//       units: '%',
//       $: 'Screen Relative Humidity',
//     },
//   ],
// };
