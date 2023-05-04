import React, { ChangeEvent, Suspense, useRef, useState } from 'react';
import CurrentWeather from '@/weather/CurrentWeather';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postCodeAtom, weatherState } from '@/weather/weather-atoms';
import { useStyles } from '@/home/Home.styles';
import { WEATHER_API } from '@/api/api-constants';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { css } from '@emotion/react';

export function Home() {
  const [error, setError] = useState('');

  const [postCode, setPostCode] = useRecoilState(postCodeAtom);
  const styles = useStyles(error !== '');
  const addrRef = useRef<HTMLInputElement>(null);

  const loadInfo = async () => {
    const newPostCode = addrRef.current?.value ?? '';
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
    <section css={css(styles.contentView)}>
      <div css={css(styles.subHeader)}>
        Enter your postcode to get nearest current info
      </div>
      <div css={css(styles.buttonsContainer)}>
        <InputText placeholder="Enter postcode" ref={addrRef} />
        <Button onClick={loadInfo}>Get weather</Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CurrentWeather />
      </Suspense>
     
      <div css={css(styles.errorPanel)}>
        <div css={css(styles.errorText)}>{error}</div>
      </div>
    </section>
  );
}
