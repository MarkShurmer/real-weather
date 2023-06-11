import { WEATHER_API, WEATHER_API_LOCAL } from './api-constants';

export function getApiUrl() {
    return window.location.hostname.indexOf('localhost') > -1 ? WEATHER_API_LOCAL : WEATHER_API;
}
