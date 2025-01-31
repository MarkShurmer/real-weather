import { ChangeEvent, useState } from 'react';
import { Container, TextInput } from '@mantine/core';
import CurrentWeather from '@/Weather/CurrentWeather';
import { checkPostcode } from './postcode-checker';
import classes from './Home.module.css';

export function HomePage() {
  const [error, setError] = useState<string | null>(null);
  const [postcode, setPostcode] = useState<string>('');

  const onChangePostcode = (e: ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
    validatePostCode(e.target.value);
  };

  const validatePostCode = (postCode: string) => {
    if (checkPostcode(postCode)) {
      setError(null);
    } else {
      setError('The post code needs to be a valid UK postcode');
    }
  };

  return (
    <>
      <Container size="xs">
        <h1>Current weather</h1>
        <section className={classes.contentView} data-testid="home">
          <div className={classes.buttonsContainer} role="search">
            <TextInput
              type="text"
              label="Enter the postcode to get current weather for"
              id="postcode"
              placeholder="Enter postcode"
              value={postcode}
              error={error}
              onChange={onChangePostcode}
            />
          </div>
          {!error && (
            <div>
              <CurrentWeather postcode={postcode} />
            </div>
          )}

          {/* <div className={classes.errorPanel} role="alert">
            <div className={classes.errorText}>{error}</div>
          </div> */}
        </section>
      </Container>
    </>
  );
}
