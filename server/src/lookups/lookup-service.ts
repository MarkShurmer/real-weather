import {
    GPS,
    LocationWithDistance,
    ObseervableSiteResponse,
    ObservationLocation,
    PostCodeResponse,
    Weather,
    WeatherRangeVector,
    WeatherResponse,
    WeatherType,
    WeatherUnits,
} from './types';
import { getDistance } from 'geolib';
import { toPascalCase } from '@common/helpers';
import axios from 'axios';
import { getSettings } from '@settings/settings';
import { logger } from '@/common/logger';

const settings = getSettings();

export async function convertPostcodeToGps(postcode: string) {
    const response = await axios.get<PostCodeResponse>(`${settings.postCodeInfoUrl}/${postcode}`);

    if (response.status === 404) {
        throw new Error(response.statusText);
    }

    return {
        latitude: response.data.result.latitude,
        longitude: response.data.result.longitude,
    } as GPS;
}

function translateVisibility(visibility: string): WeatherRangeVector {
    switch (visibility) {
        case 'UN':
            return { from: 0, to: 0, units: WeatherUnits.distance };
        case 'VP':
            return { from: 0, to: 1, units: WeatherUnits.distance };
        case 'PO':
            return { from: 1, to: 4, units: WeatherUnits.distance };
        case 'MO':
            return { from: 4, to: 10, units: WeatherUnits.distance };
        case 'GO':
            return { from: 10, to: 20, units: WeatherUnits.distance };
        case 'VG':
            return { from: 20, to: 40, units: WeatherUnits.distance };
        case 'EX':
            return { from: 40, to: 100, units: WeatherUnits.distance };
        default:
            return {
                from: parseInt(visibility) / 1000,
                to: parseInt(visibility) / 1000,
                units: WeatherUnits.distance,
            };
    }
}

export function mapWeatherData(response: WeatherResponse) {
    const dataView = response.SiteRep.DV;
    const period = dataView.Location.Period[dataView.Location.Period.length - 1];
    const report = period.Rep[period.Rep.length - 1];
    const units = response.SiteRep.Wx.Param;

    const mapped: Weather = {
        date: new Date(dataView.dataDate),
        elevation: dataView.Location.elevation,
        locationId: dataView.Location.i,
        name: toPascalCase(dataView.Location.name),
        latLong: {
            latitude: dataView.Location.lat,
            longitude: dataView.Location.lon,
        },
        report: {
            dewPoint: {
                amount: report.Dp,
                units: units.find((u) => u.name === 'Dp')?.units ?? '',
            },
            humidity: {
                amount: report.H,
                units: units.find((u) => u.name === 'H')?.units ?? '',
            },
            pressure: {
                amount: report.P,
                units: units.find((u) => u.name === 'P')?.units ?? '',
            },
            pressureTendency: report.Pt,
            temperature: {
                amount: report.T,
                units: units.find((u) => u.name === 'T')?.units ?? '',
            },
            visibility: translateVisibility(report.V),
            weatherType: WeatherType[report.W],
            windDirection: report.D,
            windGust: { amount: report.G, units: WeatherUnits.speed },
            windSpeed: {
                amount: report.S,
                units: WeatherUnits.speed,
            },
        },
    };

    return mapped;
}

export async function getWeatherFromStation(refPoint: GPS) {
    const settings = await getSettings();

    const sitesResponse = await axios.get<ObseervableSiteResponse>(`${settings.observationsSitesUrl}`, {
        params: { key: `${settings.apiKey}` },
    });

    // work out nearest
    const nearestSite = getNearestSite(sitesResponse.data.Locations.Location, refPoint);

    const url = `${settings.observationsUrl.replace(':locationId', nearestSite.id.toString())}`;
    logger.info(`Getting weather observations using url ${url}`);

    const obs = await axios.get<WeatherResponse>(url, { params: { key: settings.apiKey, res: 'hourly' } });

    return mapWeatherData(obs.data);
}

function getNearestSite(sites: ObservationLocation[], refPoint: GPS) {
    return sites.reduce<LocationWithDistance>(
        (accum, curr) => {
            const distance = getDistance(refPoint, {
                latitude: curr.latitude,
                longitude: curr.longitude,
            });
            if (distance < accum.distance) {
                return { ...curr, distance };
            }
            return accum;
        },
        { distance: 1000000000, name: '', id: 0 },
    );
}

// function addDistanceToSites(sites: ObseervableSiteResponse, refPoint: GPS) {
//   return sites.Locations.Location.map((site) => {
//     const distance = getDistance(refPoint, {
//       latitude: site.latitude,
//       longitude: site.longitude,
//     });
//     return { name: site.name, distance, id: site.id } as LocationWithDistance;
//   });
// }
