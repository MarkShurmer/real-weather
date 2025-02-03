import { useWeatherStyles } from '@weather/CurrentWeather.styles';
import { Visibility } from '@weather/Visibility';
import { format } from 'date-fns';
import { fetchWeather } from '@/api/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Weather } from '@/api/api-contracts';

function formatDate(date: string) {
    const asDate = new Date(date);
    return format(asDate, 'HH:mm:ss'); // `${asDate.getHours()}:${asDate.getMinutes().toString()}:${asDate.getSeconds()}`;
}

const DEGREE_SYMBOL = '\u00B0';

export type CurrentWeatherProps = {
    postcode: string;
};

// async function fetchData(postcode: string) {
//     const url = new URL(getApiUrl());
//     url.search = new URLSearchParams({ postcode }).toString();

//     return (await fetch(url)).json();
// }

export default function CurrentWeather(props: CurrentWeatherProps) {
    const classes = useWeatherStyles();
    const { postcode } = props;
    const { data } = useSuspenseQuery<Weather>({
        queryKey: ['weather', postcode],
        queryFn: () => fetchWeather(postcode),
    });

    if (!data) {
        return (
            <section className={classes.container} role="alert">
                <div>Unable to retreive any current weather</div>
            </section>
        );
    }

    return (
        <section className={classes.container}>
            <div className={classes.cardMain} role="contentinfo">
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
            </div>
        </section>
    );
}
