import React from 'react';
import { useRecoilValue } from 'recoil';
import { weatherState } from './weather-atoms';
import { Weather, WeatherReport } from '@/api/api-contracts';
import { weatherStyles } from '@weather/CurrentWeather.styles';
import { css } from '@emotion/react';
import Visibility from './Visibility';
import { format } from 'date-fns';

function formatDate(date: string) {
  const asDate = new Date(date);
  return format(asDate, 'HH:mm:ss'); // `${asDate.getHours()}:${asDate.getMinutes().toString()}:${asDate.getSeconds()}`;
}

export default function CurrentWeather() {
  const weatherValue = useRecoilValue(weatherState) as Weather;

  if (!weatherValue) {
    return (
      <section css={css(weatherStyles.container)}>
        <div>Unable to retreive any current weather</div>
      </section>
    );
  }

  const report = weatherValue?.report as WeatherReport;

  return (
    <section css={css(weatherStyles.container)}>
      <div css={css(weatherStyles.cardMain)}>
        <div css={css(weatherStyles.cardItem)}>Temperature</div>
        <div css={css(weatherStyles.cardItem)}>
          {report.temperature.amount} {'\u00B0'}
          {report.temperature.units}
        </div>

        <div css={css(weatherStyles.cardItem)}>Type</div>
        <div css={css(weatherStyles.cardItem)}>{report.weatherType}</div>

        <div css={css(weatherStyles.cardItem)}>Location</div>
        <div css={css(weatherStyles.cardItem)}>{weatherValue.name}</div>

        <div css={css(weatherStyles.cardItem)}>Visibility</div>
        <div css={css(weatherStyles.cardItem)}>
          <Visibility visibility={report.visibility} />
        </div>

        <div css={css(weatherStyles.cardItem)}>Time</div>
        <div css={css(weatherStyles.cardItem)}>
          {formatDate(weatherValue.date)}
        </div>

        <div css={css(weatherStyles.cardItem)}>Pressure</div>
        <div css={css(weatherStyles.cardItem)}>
          {weatherValue.report.pressure.amount}{' '}
          {weatherValue.report.pressure.units}
        </div>

        <div css={css(weatherStyles.cardItem)}>Humidity</div>
        <div css={css(weatherStyles.cardItem)}>
          {weatherValue.report.humidity.amount}{' '}
          {weatherValue.report.humidity.units}
        </div>

        <div css={css(weatherStyles.cardItem)}>Wind</div>
        <div css={css(weatherStyles.cardItem)}>
          {weatherValue.report.windDirection} {', '}
          {weatherValue.report.windSpeed.amount}{' '}
          {weatherValue.report.windSpeed.units} {' to '}
          {weatherValue.report.windGust.amount}{' '}
          {weatherValue.report.windGust.units}
        </div>
      </div>
    </section>
  );
}
