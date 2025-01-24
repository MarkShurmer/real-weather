import React from 'react';
import { useRecoilValue } from 'recoil';
import { weatherSelector } from './weather-atoms';
import { useWeatherStyles } from '@weather/CurrentWeather.styles';
import { Visibility } from '@weather/Visibility';
import { format } from 'date-fns';
import Loading from '@/loading/Loading';

function formatDate(date: string) {
    const asDate = new Date(date);
    return format(asDate, 'HH:mm:ss'); // `${asDate.getHours()}:${asDate.getMinutes().toString()}:${asDate.getSeconds()}`;
}

const DEGREE_SYMBOL = '\u00B0';

export default function CurrentWeather() {
    const weatherInstance = useRecoilValue(weatherSelector);
    const classes = useWeatherStyles();

    if (weatherInstance.type === 'loading') {
        return (
            <section className={classes.container} role="status">
                <Loading />
            </section>
        );
    }

    if (weatherInstance.type === 'errored') {
        return (
            <section className={classes.container} role="alert">
                <div>Unable to retreive any current weather</div>
                <div>{weatherInstance.error}</div>
            </section>
        );
    }

    const weather = weatherInstance.weather;
    const report = weatherInstance.weather.report;

    return (
        <section className={classes.container}>
            <div className={classes.cardMain} role="contentinfo">
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
