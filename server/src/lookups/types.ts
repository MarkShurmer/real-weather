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
        DV: {
            dataDate: Date;
            type: 'Obs' | 'Forecast';
            Location: WeatherLocation;
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
    V: string;
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

export interface WeatherQueryInterface {
    postcode: string;
}

export const WeatherType: Record<number, string> = {
    0: 'Clear Night',
    1: 'Sunny Day',
    2: 'Partly Cloudy Night',
    3: 'Partly Cloudy Day',
    5: 'Mist',
    6: 'Fog',
    7: 'Cloudy',
    8: 'Overcast',
    9: 'Light Rain Shower (Night)',
    10: 'Light Rain Shower (Day)',
    11: 'Drizzle',
    12: 'Light Rain',
    13: 'Heavy Rain Shower (Night)',
    14: 'Heavy Rain Shower Day',
    15: 'Heavy Rain',
    16: 'Sleet Shower (Night)',
    17: 'Sleet Shower (Day)',
    18: 'Sleet',
    19: 'Hail Shower (Night)',
    20: 'Hail Shower (Day)',
    21: 'Hail',
    22: 'Light Snow Shower (Night)',
    23: 'Light Snow Shower (Day)',
    24: 'Light Snow',
    25: 'Heavy Snow Shower (Night)',
    26: 'Heavy Snow Shower (Day)',
    27: 'Heavy Snow',
    28: 'Thunder Shower (Night)',
    29: 'Thunder Shower (Day)',
    30: 'Thunder',
};

export const WeatherUnits = {
    distance: 'km',
    speed: 'mph',
    temperature: 'C',
    direction: 'compass',
    pressure: 'hpa',
};

export type WeatherVector = {
    amount: number;
    units: string;
};

export type WeatherRangeVector = {
    from: number;
    to: number;
    units: string;
};

export type WeatherReport = {
    windGust: WeatherVector;
    temperature: WeatherVector;
    visibility: WeatherRangeVector;
    windDirection: string;
    windSpeed: WeatherVector;
    weatherType: string;
    pressure: WeatherVector;
    pressureTendency: string;
    dewPoint: WeatherVector;
    humidity: WeatherVector;
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
    report: WeatherReport;
};
