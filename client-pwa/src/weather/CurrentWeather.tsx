import React from 'react';
import { useRecoilValue } from 'recoil';
import { weatherState } from './weather-atoms';
import { WeatherReport } from '@api/api-contracts';
import { useWeatherStyles } from '@weather/CurrentWeather.styles';
import { Visibility } from '@weather/Visibility';
import { format } from 'date-fns';

function formatDate(date: string) {
    const asDate = new Date(date);
    return format(asDate, 'HH:mm:ss'); // `${asDate.getHours()}:${asDate.getMinutes().toString()}:${asDate.getSeconds()}`;
}

const DEGREE_SYMBOL = '\u00B0';

export default function CurrentWeather() {
    const weather = useRecoilValue(weatherState);
    const classes = useWeatherStyles();

    if (!weather) {
        return (
            <section className={classes.container} role="status">
                <div>Unable to retreive any current weather</div>
            </section>
        );
    }

    const report = weather.report as WeatherReport;

    return (
        <section className={classes.container} role="main">
            <div className={classes.cardMain}>
                <div className={classes.cardItem}>Temperature</div>
                <div className={classes.cardItem}>
                    {report.temperature.amount} {DEGREE_SYMBOL}
                    {report.temperature.units}
                </div>

                <div className={classes.cardItem}>Type</div>
                <div className={classes.cardItem}>{report.weatherType}</div>

                <div className={classes.cardItem}>Location</div>
                <div className={classes.cardItem}>{weather.name}</div>

                <div className={classes.cardItem}>Visibility</div>
                <div className={classes.cardItem}>
                    <Visibility visibility={report.visibility} />
                </div>

                <div className={classes.cardItem}>Time</div>
                <div className={classes.cardItem}>{formatDate(weather.date)}</div>

                <div className={classes.cardItem}>Pressure</div>
                <div className={classes.cardItem}>
                    {weather.report.pressure.amount} {weather.report.pressure.units}
                </div>

                <div className={classes.cardItem}>Humidity</div>
                <div className={classes.cardItem}>
                    {weather.report.humidity.amount} {weather.report.humidity.units}
                </div>

                <div className={classes.cardItem}>Wind</div>
                <div className={classes.cardItem}>
                    {weather.report.windDirection} {', '}
                    {weather.report.windSpeed.amount} {weather.report.windSpeed.units} {' to '}
                    {weather.report.windGust.amount} {weather.report.windGust.units}
                </div>
            </div>
        </section>
    );
}
