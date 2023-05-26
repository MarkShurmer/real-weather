import { WeatherResponse } from 'lookups/types';

const param = [
  {
    name: 'G',
    units: 'mph',
    $: 'Wind Gust',
  },
  {
    name: 'T',
    units: 'C',
    $: 'Temperature',
  },
  {
    name: 'V',
    units: 'm',
    $: 'Visibility',
  },
  {
    name: 'D',
    units: 'compass',
    $: 'Wind Direction',
  },
  {
    name: 'S',
    units: 'mph',
    $: 'Wind Speed',
  },
  {
    name: 'W',
    units: '',
    $: 'Weather Type',
  },
  {
    name: 'P',
    units: 'hpa',
    $: 'Pressure',
  },
  {
    name: 'Pt',
    units: 'Pa/s',
    $: 'Pressure Tendency',
  },
  {
    name: 'Dp',
    units: 'C',
    $: 'Dew Point',
  },
  {
    name: 'H',
    units: '%',
    $: 'Screen Relative Humidity',
  },
];

export const weatherObservation: WeatherResponse = {
  SiteRep: {
    Wx: {
      Param: param,
    },
    DV: {
      dataDate: new Date('2023-03-26T16:00:00Z'),
      type: 'Obs',
      Location: {
        i: 3002,
        lat: 60.749,
        lon: -0.854,
        name: 'BALTASOUND',
        country: 'SCOTLAND',
        continent: 'EUROPE',
        elevation: 15.0,
        Period: [
          {
            type: 'Day',
            value: new Date('2023-03-25Z'),
            Rep: [
              {
                D: 'NNE',
                G: 29,
                H: 62.9,
                P: 1004,
                S: 18,
                T: 4.1,
                V: '55000',
                W: 7,
                Pt: 'R',
                Dp: -2.3,
                $: 960,
              },
              {
                D: 'N',
                G: 26,
                H: 54.5,
                P: 1004,
                S: 16,
                T: 4.0,
                V: 'MO',
                W: 7,
                Pt: 'R',
                Dp: -4.3,
                $: 1020,
              },
              {
                D: 'NNE',
                G: 30,
                H: 79.4,
                P: 1005,
                S: 13,
                T: 2.8,
                V: '35000',
                W: 8,
                Pt: 'R',
                Dp: -0.4,
                $: 1080,
              },
              {
                D: 'N',
                G: 24,
                H: 71.9,
                P: 1005,
                S: 11,
                T: 1.6,
                V: 'EX',
                W: 0,
                Pt: 'R',
                Dp: -2.9,
                $: 1140,
              },
              {
                D: 'N',
                G: 21,
                H: 73.2,
                P: 1006,
                S: 13,
                T: 2.3,
                V: '50000',
                W: 12,
                Pt: 'R',
                Dp: -2.0,
                $: 1200,
              },
              {
                D: 'N',
                G: 24,
                H: 74.0,
                P: 1006,
                S: 17,
                T: 1.7,
                V: 'VP',
                W: 2,
                Pt: 'R',
                Dp: -2.4,
                $: 1260,
              },
              {
                D: 'N',
                G: 26,
                H: 86.4,
                P: 1007,
                S: 15,
                T: 1.4,
                V: 'UN',
                W: 24,
                Pt: 'R',
                Dp: -0.6,
                $: 1320,
              },
              {
                D: 'N',
                G: 26,
                H: 79.7,
                P: 1007,
                S: 13,
                T: 1.2,
                V: '60000',
                W: 0,
                Pt: 'R',
                Dp: -1.9,
                $: 1380,
              },
            ],
          },
          {
            type: 'Day',
            value: new Date('2023-03-26Z'),
            Rep: [
              {
                D: 'N',
                G: 30,
                H: 57.7,
                P: 1008,
                S: 18,
                T: 1.3,
                V: '60000',
                W: 8,
                Pt: 'R',
                Dp: -5.4,
                $: 180,
              },
              {
                D: 'N',
                G: 29,
                H: 68.1,
                P: 1009,
                S: 16,
                T: 0.2,
                V: '60000',
                W: 12,
                Pt: 'R',
                Dp: -4.4,
                $: 240,
              },
              {
                D: 'N',
                G: 24,
                H: 67.5,
                P: 1009,
                S: 13,
                T: 0.9,
                V: '30000',
                W: 8,
                Pt: 'R',
                Dp: -3.9,
                $: 300,
              },

              {
                D: 'N',
                G: 30,
                H: 55.8,
                P: 1012,
                S: 22,
                T: 3.3,
                V: '75000',
                W: 3,
                Pt: 'R',
                Dp: -4.6,
                $: 720,
              },
              {
                D: 'N',
                G: 36,
                H: 68.2,
                P: 1013,
                S: 22,
                T: 2.6,
                V: '40000',
                W: 7,
                Pt: 'R',
                Dp: -2.6,
                $: 780,
              },

              {
                D: 'NNW',
                G: 32,
                H: 72.6,
                P: 1014,
                S: 21,
                T: 3.2,
                V: '55000',
                W: 8,
                Pt: 'R',
                Dp: -1.2,
                $: 960,
              },
            ],
          },
        ],
      },
    },
  },
};

export const weatherObsUnknownVisibility: WeatherResponse = {
  SiteRep: {
    Wx: {
      Param: param,
    },
    DV: {
      dataDate: new Date('2023-03-26T16:00:00Z'),
      type: 'Obs',
      Location: {
        i: 3002,
        lat: 60.749,
        lon: -0.854,
        name: 'BALTASOUND',
        country: 'SCOTLAND',
        continent: 'EUROPE',
        elevation: 15.0,
        Period: [
          {
            type: 'Day',
            value: new Date('2023-03-26Z'),
            Rep: [
              {
                D: 'NNW',
                G: 32,
                H: 72.6,
                P: 1014,
                S: 21,
                T: 3.2,
                V: 'UN',
                W: 8,
                Pt: 'R',
                Dp: -1.2,
                $: 960,
              },
            ],
          },
        ],
      },
    },
  },
};

export const weatherObsVeryPoorVisibility: WeatherResponse = {
  SiteRep: {
    Wx: {
      Param: param,
    },
    DV: {
      dataDate: new Date('2023-03-26T16:00:00Z'),
      type: 'Obs',
      Location: {
        i: 3002,
        lat: 60.749,
        lon: -0.854,
        name: 'BALTASOUND',
        country: 'SCOTLAND',
        continent: 'EUROPE',
        elevation: 15.0,
        Period: [
          {
            type: 'Day',
            value: new Date('2023-03-26Z'),
            Rep: [
              {
                D: 'NNW',
                G: 32,
                H: 72.6,
                P: 1014,
                S: 21,
                T: 3.2,
                V: 'VP',
                W: 8,
                Pt: 'R',
                Dp: -1.2,
                $: 960,
              },
            ],
          },
        ],
      },
    },
  },
};

export const weatherObsPoorVisibility: WeatherResponse = {
  SiteRep: {
    Wx: {
      Param: param,
    },
    DV: {
      dataDate: new Date('2023-03-26T16:00:00Z'),
      type: 'Obs',
      Location: {
        i: 3002,
        lat: 60.749,
        lon: -0.854,
        name: 'BALTASOUND',
        country: 'SCOTLAND',
        continent: 'EUROPE',
        elevation: 15.0,
        Period: [
          {
            type: 'Day',
            value: new Date('2023-03-26Z'),
            Rep: [
              {
                D: 'NNW',
                G: 32,
                H: 72.6,
                P: 1014,
                S: 21,
                T: 3.2,
                V: 'PO',
                W: 8,
                Pt: 'R',
                Dp: -1.2,
                $: 960,
              },
            ],
          },
        ],
      },
    },
  },
};

export const weatherObsModerateVisibility: WeatherResponse = {
  SiteRep: {
    Wx: {
      Param: param,
    },
    DV: {
      dataDate: new Date('2023-03-26T16:00:00Z'),
      type: 'Obs',
      Location: {
        i: 3002,
        lat: 60.749,
        lon: -0.854,
        name: 'BALTASOUND',
        country: 'SCOTLAND',
        continent: 'EUROPE',
        elevation: 15.0,
        Period: [
          {
            type: 'Day',
            value: new Date('2023-03-26Z'),
            Rep: [
              {
                D: 'NNW',
                G: 32,
                H: 72.6,
                P: 1014,
                S: 21,
                T: 3.2,
                V: 'MO',
                W: 8,
                Pt: 'R',
                Dp: -1.2,
                $: 960,
              },
            ],
          },
        ],
      },
    },
  },
};

export const weatherObsGoodVisibility: WeatherResponse = {
  SiteRep: {
    Wx: {
      Param: param,
    },
    DV: {
      dataDate: new Date('2023-03-26T16:00:00Z'),
      type: 'Obs',
      Location: {
        i: 3002,
        lat: 60.749,
        lon: -0.854,
        name: 'BALTASOUND',
        country: 'SCOTLAND',
        continent: 'EUROPE',
        elevation: 15.0,
        Period: [
          {
            type: 'Day',
            value: new Date('2023-03-26Z'),
            Rep: [
              {
                D: 'NNW',
                G: 32,
                H: 72.6,
                P: 1014,
                S: 21,
                T: 3.2,
                V: 'GO',
                W: 8,
                Pt: 'R',
                Dp: -1.2,
                $: 960,
              },
            ],
          },
        ],
      },
    },
  },
};

export const weatherObsVeryGoodVisibility: WeatherResponse = {
  SiteRep: {
    Wx: {
      Param: param,
    },
    DV: {
      dataDate: new Date('2023-03-26T16:00:00Z'),
      type: 'Obs',
      Location: {
        i: 3002,
        lat: 60.749,
        lon: -0.854,
        name: 'BALTASOUND',
        country: 'SCOTLAND',
        continent: 'EUROPE',
        elevation: 15.0,
        Period: [
          {
            type: 'Day',
            value: new Date('2023-03-26Z'),
            Rep: [
              {
                D: 'NNW',
                G: 32,
                H: 72.6,
                P: 1014,
                S: 21,
                T: 3.2,
                V: 'VG',
                W: 8,
                Pt: 'R',
                Dp: -1.2,
                $: 960,
              },
            ],
          },
        ],
      },
    },
  },
};

export const weatherObsExcellentVisibility: WeatherResponse = {
  SiteRep: {
    Wx: {
      Param: param,
    },
    DV: {
      dataDate: new Date('2023-03-26T16:00:00Z'),
      type: 'Obs',
      Location: {
        i: 3002,
        lat: 60.749,
        lon: -0.854,
        name: 'Baltasound',
        country: 'SCOTLAND',
        continent: 'EUROPE',
        elevation: 15.0,
        Period: [
          {
            type: 'Day',
            value: new Date('2023-03-26Z'),
            Rep: [
              {
                D: 'NNW',
                G: 32,
                H: 72.6,
                P: 1014,
                S: 21,
                T: 3.2,
                V: 'EX',
                W: 8,
                Pt: 'R',
                Dp: -1.2,
                $: 960,
              },
            ],
          },
        ],
      },
    },
  },
};
