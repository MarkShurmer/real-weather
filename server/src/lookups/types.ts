import { FastifyRequest } from 'fastify';

export type PostCodeErrorResponse = {
  status: 404;
  error: string;
};

export type PostCodeResult = {
  postcode: string;
  quality: number;
  eastings: number;
  northings: number;
  country: string;
  nhs_ha: string;
  longitude: number;
  latitude: number;
};

export type PostCodeResponse = {
  status: 200;
  result: PostCodeResult;
};

export type GPS = {
  latitude: number;
  longitude: number;
};

export type ObservationLocation = {
  elevation: number;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  region: string;
  unitaryAuthArea: string;
};

export type ObseervableSiteResponse = {
  Locations: {
    Location: Array<ObservationLocation>;
  };
};

export type LocationWithDistance = {
  name: string;
  distance: number;
  id: number;
};

export type WeatherParam = {
  name: string;
  units: string;
  $: string;
};

export type WeatherResponse = {
  SiteRep: {
    Wx: {
      Param: Array<WeatherParam>;
    };
    Dv: {
      dataDate: Date;
      type: 'Obs' | 'Forecast';
      Location: Array<WeatherLocation>;
    };
  };
};

export type WeatherLocationPeriod = {
  type: string;
  value: Date;
  Rep: Array<LocationPeriodRep>;
};

export type LocationPeriodRep = {
  D: string;
  G: number;
  H: number;
  P: number;
  S: number;
  T: number;
  V: number;
  W: number;
  Pt: string;
  Dp: number;
  $: number;
};

export type WeatherLocation = {
  i: number;
  lat: number;
  lon: number;
  name: string;
  country: string;
  continent: string;
  elevation: number;
  Period: Array<WeatherLocationPeriod>;
};

export interface ParamsInterface {
  postcode: string;
}
export type WeatherRequest = FastifyRequest<{ Params: ParamsInterface }>;

export type WeatherPeriod = {
  windGust: number;
  temperature: number;
  visibility: number;
  windDirection: CompassPoints;
  windSpeed: number;
  weatherType: string;
  pressure: number;
  pressureTendency: number;
  dewPoint: number;
  humidity: number;
};

export enum CompassPoints {
  N,
  NNE,
  NE,
  ENE,
  E,
  ESE,
  SE,
  SSE,
  S,
  SSW,
  SW,
  WSW,
  W,
  WNW,
  NW,
  NNW,
}

export type Weather = {
  locationId: number;
  date: Date;
  latLong: GPS;
  name: string;
  elevation: number;
  periods: Array<WeatherPeriod>;
  units: Array<WeatherParam>;
};
