import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { Alert, Paper, SimpleGrid } from '@mantine/core';
import { fetchWeather } from '@/api/api';
import type { LatLong, Weather } from '@/api/api-types';
import { Loading } from '@/components/Loading';
import { Visibility } from '@/Weather/Visibility';
import classes from './CurrentWeather.module.css';

/**
 * Given a date string, returns a string of the format 'HH:mm:ss'.
 * @param date a date string in any format that can be parsed by the Date constructor
 * @returns a string of the format 'HH:mm:ss'
 */
function formatDate(date: string) {
  const asDate = new Date(date);
  return format(asDate, 'HH:mm:ss'); // `${asDate.getHours()}:${asDate.getMinutes().toString()}:${asDate.getSeconds()}`;
}

const DEGREE_SYMBOL = '\u00B0';

export type CurrentWeatherProps = {
  latLong?: LatLong;
};

export default function CurrentWeather(props: CurrentWeatherProps) {
  const { latLong } = props;
  const [data, setData] = useState<Weather | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getWeather() {
      setData(undefined);
      if (latLong) {
        setIsLoading(true);
        const response = await fetchWeather(latLong);
        if (response.status === 'ok') {
          setData(response.data);
          setError(undefined);
        } else {
          setError(response.message);
        }
        setIsLoading(false);
      }
    }

    getWeather();
  }, [latLong]);

  if (error) {
    return (
      <Paper shadow="md" radius="md" withBorder role="contentinfo" className={classes.container}>
        <Alert
          variant="light"
          color="red"
          title="Error retreiving weather"
          icon={<IoMdInformationCircleOutline />}
        >
          There was an error trying to get the weather.
        </Alert>
      </Paper>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Paper shadow="md" radius="md" withBorder role="contentinfo" className={classes.container}>
      {!data ? (
        <Alert variant="light" color="blue">
          No data loaded
        </Alert>
      ) : (
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
      )}
    </Paper>
  );
}
