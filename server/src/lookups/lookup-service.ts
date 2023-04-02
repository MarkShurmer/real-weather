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
  WeatherResponse,
} from './types';
import { getDistance } from 'geolib';

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

export async function getWeatherFromStation(refPoint: GPS) {
  const sitesResponse = await got
    .get(`${Observations_Sites_Url}`)
    .json<ObseervableSiteResponse>();

  //const sitesWithDistance = addDistanceToSites(sites, refPoint);

  // work out lowest
  //const sortedSites = sitesWithDistance.sort((lhs, rhs) => lhs.distance - rhs.distance);
  const nearestSite = getNearestSite(
    sitesResponse.Locations.Location,
    refPoint
  );

  // get observations for the site
  const obs = await got
    .get(
      `${Observations_Url.replace(':locationId', nearestSite.id.toString())}`
    )
    .json<WeatherResponse>();

  return obs.SiteRep;
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
