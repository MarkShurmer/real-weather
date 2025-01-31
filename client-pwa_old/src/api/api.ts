import { WEATHER_API, WEATHER_API_LOCAL } from './api-constants';

export function getApiUrl() {
    return window.location.hostname.indexOf('localhost') > -1 ? WEATHER_API_LOCAL : WEATHER_API;
}

export async function fetchWeather(postcode: string) {
    const url = new URL(getApiUrl());
    url.search = new URLSearchParams({ postcode }).toString();

    const response = await fetch(url);
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }

    return response.json();
}

//export type ResourceType = { read: () => Weather | Error | undefined };

// export const fetchWeather = (postcode: string): ResourceType => {
//     return wrapPromise<Weather>(getWeather(postcode));
// };
