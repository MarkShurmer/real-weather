import React, { ChangeEvent, useRef, useState } from 'react';
import CurrentWeather from '@/weather/CurrentWeather';
import { useRecoilState } from 'recoil';
import { weatherState } from '@/weather/weather-atoms';
import { useStyles } from '@/home/Home.styles';
import { WEATHER_API } from '@/api/api-constants';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { css } from '@emotion/react';

export function Home() {
  const [error, setError] = useState('');
  const [, setWeatherAtom] = useRecoilState(weatherState);
  const styles = useStyles(error !== '');
  const addrRef = useRef<HTMLInputElement>(null);

  const loadInfo = async () => {
    const postCode = addrRef.current?.value ?? '';
    if (postCode.length < 6) {
      setError('Must be full post code');
      return;
    }

    try {
      setError('');
      setWeatherAtom(null);
      const url = WEATHER_API.replace('${postCode}', postCode);
      console.log(url);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWeatherAtom(data);
      } else {
        const error = await response.text();
        setError(error);
      }
    } catch (err) {
      setError(`Unable to retreive information`);
    }
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
      <CurrentWeather />
      <div css={css(styles.errorPanel)}>
        <div css={css(styles.errorText)}>{error}</div>
      </div>
    </section>
  );
}
