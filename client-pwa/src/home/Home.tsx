import { Suspense, useRef, useState } from 'react';
import CurrentWeather from '@/weather/CurrentWeather';
import { useRecoilState } from 'recoil';
import { postCodeAtom } from '@/weather/weather-atoms';
import { useHomeStyles } from '@/home/Home.styles';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export function Home() {
    const [error, setError] = useState('');
    const [, setPostCode] = useRecoilState(postCodeAtom);
    const classes = useHomeStyles({ isError: error !== '' });
    const addrRef = useRef<HTMLInputElement>(null);

    const loadInfo = async () => {
        const newPostCode = addrRef.current?.value ?? '';
        console.log(':: ', newPostCode);
        if (newPostCode.length < 6) {
            setError('Must be full post code');
            return;
        }

        setPostCode(newPostCode);

        // try {
        //   setError('');
        //   setWeatherAtom(null);
        //   const url = WEATHER_API.replace('${postCode}', postCode);
        //   console.log(url);
        //   const response = await fetch(url);
        //   if (response.ok) {
        //     const data = await response.json();
        //     setWeatherAtom(data);
        //   } else {
        //     const error = await response.text();
        //     setError(error);
        //   }
        // } catch (err) {
        //   setError(`Unable to retreive information`);
        // }
    };

    return (
        <section className={classes.contentView}>
            <div className={classes.subHeader}>Enter your postcode to get nearest current info</div>
            <div className={classes.buttonsContainer} role="search">
                <InputText placeholder="Enter postcode" ref={addrRef} />
                <Button onClick={loadInfo}>Get weather</Button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <CurrentWeather />
            </Suspense>

            <div className={classes.errorPanel} role="alert">
                <div className={classes.errorText}>{error}</div>
            </div>
        </section>
    );
}
