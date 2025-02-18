import { useState } from 'react';
import { Checkbox } from '@mantine/core';

export type LocationChooserProps = {
  onChooseLocationType: (isUsingLocation: boolean) => void;
};

export function LocationChooser(props: LocationChooserProps) {
  const [checked, setChecked] = useState(false);

  const onChange = () => {
    const isUsingLocation = !checked;
    setChecked(isUsingLocation);
    props.onChooseLocationType(isUsingLocation);
  };

  return (
    <div>
      <Checkbox
        checked={checked}
        label="I wish to use the location service on my device"
        onChange={onChange}
      />
    </div>
  );
}
