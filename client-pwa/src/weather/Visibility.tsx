import { WeatherRangeVector } from '@/api/api-contracts';
import React from 'react';

export type VisibilityProps = {
  visibility: WeatherRangeVector;
};
export default function Visibility(props: VisibilityProps) {
  const { visibility } = props;

  // only one element to range
  if (visibility.from === visibility.to) {
    return (
      <div>
        {visibility.from} {visibility.units}
      </div>
    );
  }

  return (
    <div>
      {visibility.from} - {visibility.to} {visibility.units}
    </div>
  );
}
