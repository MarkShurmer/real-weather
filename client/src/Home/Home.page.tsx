import { useState } from 'react';
import { Container } from '@mantine/core';
import { LatLong } from '@/api/api-types';
import CurrentWeather from '@/Weather/CurrentWeather';
import { LocationChooser } from './LocationChooser';
import { PostcodePicker } from './PostcodePicker';
import classes from './Home.module.css';

export function HomePage() {
  const [position, setPosition] = useState<LatLong | null>(null);
  const [isUsingLocation, setIsUsingLocation] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updatePosition = (position: GeolocationPosition) => {
    setPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
  };

  const onChangeLocationType = (isUsingLocation: boolean) => {
    setIsUsingLocation(isUsingLocation);
    setPosition(null);

    if (isUsingLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    }
  };

  return (
    <>
      <Container size="xs" role="main">
        <h1>Current weather</h1>
        <section className={classes.contentView}>
          <LocationChooser onChooseLocationType={onChangeLocationType} />
          {!isUsingLocation && (
            <PostcodePicker
              onPositionChanged={(pos: LatLong) => setPosition(pos)}
              onPostcodeChanged={() => setPosition(null)}
            />
          )}
          {position && (
            <div>
              <CurrentWeather latLong={position} />
            </div>
          )}
          {error && (
            <div className={classes.errorPanel} role="alert">
              <div className={classes.errorText}>{error}</div>
            </div>
          )}
        </section>
      </Container>
    </>
  );
}
