import { render, screen, userEvent } from '@test-utils';
import { describe, expect, it, vi } from 'vitest';
import { LocationChooser } from './LocationChooser';

describe('Location chooser', () => {
  it('should render correctly', () => {
    render(<LocationChooser onChooseLocationType={vi.fn()} />);
    const locationChooserElement = screen.getByRole('checkbox');
    expect(locationChooserElement).toBeInTheDocument();
  });

  it('should call onChooseLocationType with true when location services requested', async () => {
    const mockOnChooseLocationType = vi.fn();
    render(<LocationChooser onChooseLocationType={mockOnChooseLocationType} />);

    const selectLocationButton = screen.getByRole('checkbox');
    await userEvent.click(selectLocationButton);
    expect(mockOnChooseLocationType).toHaveBeenCalledWith(true);
  });

  it('should call onChooseLocationType with false when clicking checkbox twice', async () => {
    const mockOnChooseLocationType = vi.fn();
    render(<LocationChooser onChooseLocationType={mockOnChooseLocationType} />);

    const selectLocationButton = screen.getByRole('checkbox');
    await userEvent.click(selectLocationButton);
    await userEvent.click(selectLocationButton);

    expect(mockOnChooseLocationType).toHaveBeenCalledWith(false);
  });
});
