import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { Alert, Paper, SimpleGrid } from '@mantine/core';
import { fetchWeather } from '@/api/api';
import type { Weather } from '@/api/api-types';
import Loading from '@/components/Loading';
import classes from '@/weather/CurrentWeather.module.css';
import { Visibility } from '@/Weather/Visibility';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Given a date string, returns a string of the format 'HH:mm:ss'.
 * @param date a date string in any format that can be parsed by the Date constructor
 * @returns a string of the format 'HH:mm:ss'
 */
/******  ecb5e7ae-75a5-4804-ac19-371ecae2a60b  *******/ function formatDate(date: string) {
  const asDate = new Date(date);
  return format(asDate, 'HH:mm:ss'); // `${asDate.getHours()}:${asDate.getMinutes().toString()}:${asDate.getSeconds()}`;
}

const DEGREE_SYMBOL = '\u00B0';

export type CurrentWeatherProps = {
  postcode?: string;
};

export default function CurrentWeather(props: CurrentWeatherProps) {
  const { postcode } = props;
  const [data, setData] = useState<Weather | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (postcode) {
      fetchWeather(postcode)
        .then((data) => {
          console.log('>>> ', data);
          setData(data);
        })
        .catch((error) => {
          const err = error as Error;
          setError(err.message);
        });
    }
  }, [postcode]);

  if (error) {
    return (
      <Alert
        variant="light"
        color="red"
        title="Error retreiving weather"
        icon={<IoMdInformationCircleOutline />}
      >
        There was an error trying to get the weather for {postcode} - {error}.
      </Alert>
    );
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <Paper shadow="md" radius="md" withBorder role="contentinfo">
      <SimpleGrid cols={2} className={classes.cardMain}>
        <div className={classes.cardItem}>Temperature</div>
        <div className={classes.cardItem}>
          {data.report.temperature.amount} {DEGREE_SYMBOL}
          {data.report.temperature.units}
        </div>

        <div className={classes.cardItem}>Type</div>
        <div className={classes.cardItem}>{data.report.weatherType}</div>

        <div className={classes.cardItem}>Location</div>
        <div className={classes.cardItem}>{data.name}</div>

        <div className={classes.cardItem}>Visibility</div>
        <div className={classes.cardItem}>
          <Visibility visibility={data.report.visibility} />
        </div>

        <div className={classes.cardItem}>Time</div>
        <div className={classes.cardItem}>{formatDate(data.date)}</div>

        <div className={classes.cardItem}>Pressure</div>
        <div className={classes.cardItem}>
          {data.report.pressure.amount} {data.report.pressure.units}
        </div>

        <div className={classes.cardItem}>Humidity</div>
        <div className={classes.cardItem}>
          {data.report.humidity.amount} {data.report.humidity.units}
        </div>

        <div className={classes.cardItem}>Wind</div>
        <div className={classes.cardItem}>
          {data.report.windDirection} {', '}
          {data.report.windSpeed.amount} {data.report.windSpeed.units} {' to '}
          {data.report.windGust.amount} {data.report.windGust.units}
        </div>
      </SimpleGrid>
    </Paper>
  );
}
