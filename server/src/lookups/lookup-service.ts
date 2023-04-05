import {
  Observations_Sites_Url,
  Observations_Url,
  Postcode_Info_Url,
} from 'common/constants';
import got from 'got';
import {
  GPS,
  LocationWithDistance,
  ObseervableSiteResponse,
  ObservationLocation,
  PostCodeErrorResponse,
  PostCodeResponse,
  Weather,
  WeatherRangeVector,
  WeatherResponse,
  WeatherType,
  WeatherUnits,
} from './types';
import { getDistance } from 'geolib';
import { getSettings } from 'settings/settings';

export async function convertPostcodeToGps(postcode: string) {
  const info = await got
    .get(`${Postcode_Info_Url}/${postcode}`)
    .json<PostCodeResponse | PostCodeErrorResponse>();

  if (info.status === 404) {
    throw new Error(info.error);
  }

  return {
    latitude: info.result.latitude,
    longitude: info.result.longitude,
  } as GPS;
}

// function distance(lat1, lon1, lat2, lon2, unit) {
//     var radlat1 = Math.PI * lat1/180
//     var radlat2 = Math.PI * lat2/180
//     var theta = lon1-lon2
//     var radtheta = Math.PI * theta/180
//     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     if (dist > 1) {
//       dist = 1;
//     }
//     dist = Math.acos(dist)
//     dist = dist * 180/Math.PI
//     dist = dist * 60 * 1.1515
//     if (unit=="K") { dist = dist * 1.609344 }
//     if (unit=="N") { dist = dist * 0.8684 }
//     return dist
//   }

function translateVisibility(visibility: string): WeatherRangeVector {
  switch (visibility) {
    case 'UN':
      return { from: 0, to: 0, units: WeatherUnits.direction };
    case 'VP':
      return { from: 0, to: 1, units: WeatherUnits.direction };
    case 'PO':
      return { from: 1, to: 4, units: WeatherUnits.direction };
    case 'MO':
      return { from: 4, to: 10, units: WeatherUnits.direction };
    case 'GO':
      return { from: 10, to: 20, units: WeatherUnits.direction };
    case 'VG':
      return { from: 20, to: 40, units: WeatherUnits.direction };
    case 'EX':
      return { from: 40, to: 100, units: WeatherUnits.direction };
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
    date: dataView.dataDate,
    elevation: dataView.Location.elevation,
    locationId: dataView.Location.i,
    name: dataView.Location.name,
    units: response.SiteRep.Wx.Param,
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
  const sitesResponse = await got
    .get(`${Observations_Sites_Url}`, {
      searchParams: `key=${settings.apiKey}`,
    })
    .json<ObseervableSiteResponse>();

  // work out nearest
  const nearestSite = getNearestSite(
    sitesResponse.Locations.Location,
    refPoint
  );

  // get observations for the site
  const obs = await got
    .get(
      `${Observations_Url.replace(':locationId', nearestSite.id.toString())}`,
      {
        searchParams: new URLSearchParams({
          key: settings.apiKey,
          res: 'hourly',
        }),
      }
    )
    .json<WeatherResponse>();

  return mapWeatherData(obs);
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
    { distance: 1000000000, name: '', id: 0 }
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
