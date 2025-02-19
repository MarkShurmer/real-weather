import { ChangeEvent, useState } from 'react';
import { Alert, TextInput } from '@mantine/core';
import { fetchGPSFromPostcode } from '@/api/api';
import { LatLong } from '@/api/api-types';
import { Loading } from '@/components/Loading';
import { checkPostcode } from './postcode-checker';
import classes from './Home.module.css';

export type PostcodePickerProps = {
  onPostcodeChanged: (postcode: string) => void;
  onPositionChanged: (position: LatLong) => void;
};

export function PostcodePicker(props: PostcodePickerProps) {
  const [postcode, setPostcode] = useState<string>('');
  const [postcodeError, setPostcodeError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangePostcode = async (e: ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
    props.onPostcodeChanged(e.target.value);

    if (validatePostCode(e.target.value)) {
      setIsLoading(true);
      const response = await fetchGPSFromPostcode(e.target.value);

      if (response.status === 'ok') {
        props.onPositionChanged(response.data);
      } else {
        setError(response.message);
      }
      setIsLoading(false);
    }
  };

  const validatePostCode = (postCode: string) => {
    if (checkPostcode(postCode)) {
      setPostcodeError(null);
      return true;
    }
    setPostcodeError('The post code needs to be a valid UK postcode');

    return false;
  };

  return (
    <div className={classes.buttonsContainer} role="search">
      {isLoading && <Loading />}
      <TextInput
        type="text"
        label="Enter the postcode to get current weather for"
        id="postcode"
        placeholder="Enter postcode"
        value={postcode}
        disabled={isLoading}
        error={postcodeError}
        onChange={onChangePostcode}
      />
      {error && (
        <Alert color="red">
          There was an error trying to get the GPS location for that postcode
        </Alert>
      )}
    </div>
  );
}
