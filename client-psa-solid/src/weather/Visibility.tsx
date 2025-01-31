import { WeatherRangeVector } from "./weather-types";

export type VisibilityProps = {
  visibility: WeatherRangeVector;
};

export function Visibility(props: VisibilityProps) {
  const { visibility } = props;

  if (!visibility) {
    return <div role="banner"> Waiting....</div>;
  }
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
