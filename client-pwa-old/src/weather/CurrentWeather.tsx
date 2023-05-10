import React from 'react';
import { useRecoilValue } from 'recoil';
import { weatherState } from './weather-atoms';
import {  WeatherReport } from '@/api/api-contracts';
import { weatherStyles } from '@weather/CurrentWeather.styles';
import { css } from '@emotion/react';
import Visibility from './Visibility';
import { format } from 'date-fns';

function formatDate(date: string) {
  const asDate = new Date(date);
  return format(asDate, 'HH:mm:ss'); // `${asDate.getHours()}:${asDate.getMinutes().toString()}:${asDate.getSeconds()}`;
}

const DEGREE_SYMBOL = '\u00B0';

export default function CurrentWeather() {
  const weather = useRecoilValue(weatherState);

  if (!weather) {
    return (
      <section css={css(weatherStyles.container)} role="status">
        <div>Unable to retreive any current weather</div>
      </section>
    );
  }

  const report = weather.report as WeatherReport;

  return (
    <section css={css(weatherStyles.container)} role="main">
      <div css={css(weatherStyles.cardMain)}>
        <div css={css(weatherStyles.cardItem)}>Temperature</div>
        <div css={css(weatherStyles.cardItem)}>
          {report.temperature.amount} {DEGREE_SYMBOL}
          {report.temperature.units}
        </div>

        <div css={css(weatherStyles.cardItem)}>Type</div>
        <div css={css(weatherStyles.cardItem)}>{report.weatherType}</div>

        <div css={css(weatherStyles.cardItem)}>Location</div>
        <div css={css(weatherStyles.cardItem)}>{weather.name}</div>

        <div css={css(weatherStyles.cardItem)}>Visibility</div>
        <div css={css(weatherStyles.cardItem)}>
          <Visibility visibility={report.visibility} />
        </div>

        <div css={css(weatherStyles.cardItem)}>Time</div>
        <div css={css(weatherStyles.cardItem)}>
          {formatDate(weather.date)}
        </div>

        <div css={css(weatherStyles.cardItem)}>Pressure</div>
        <div css={css(weatherStyles.cardItem)}>
          {weather.report.pressure.amount}{' '}
          {weather.report.pressure.units}
        </div>

        <div css={css(weatherStyles.cardItem)}>Humidity</div>
        <div css={css(weatherStyles.cardItem)}>
          {weather.report.humidity.amount}{' '}
          {weather.report.humidity.units}
        </div>

        <div css={css(weatherStyles.cardItem)}>Wind</div>
        <div css={css(weatherStyles.cardItem)}>
          {weather.report.windDirection} {', '}
          {weather.report.windSpeed.amount}{' '}
          {weather.report.windSpeed.units} {' to '}
          {weather.report.windGust.amount}{' '}
          {weather.report.windGust.units}
        </div>
      </div>
    </section>
  );
}
