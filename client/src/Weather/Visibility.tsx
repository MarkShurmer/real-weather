import React from 'react';
import { WeatherRangeVector } from '@/api/api-types';

export type VisibilityProps = {
  visibility: WeatherRangeVector;
};

export function Visibility(props: VisibilityProps) {
  const { visibility } = props;

  // only one element to range
  if (visibility.from === visibility.to) {
    return (
      <div role="banner">
        {visibility.from} {visibility.units}
      </div>
    );
  }

  return (
    <div role="banner">
      {visibility.from} - {visibility.to} {visibility.units}
    </div>
  );
}
