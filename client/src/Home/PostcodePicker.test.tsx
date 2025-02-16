import { render, screen, userEvent } from '@test-utils';
import { describe, expect, it, vi } from 'vitest';
import { PostcodePicker } from './PostcodePicker';

describe('Postcode picker', () => {
  const mockPostcodeChanged = vi.fn();
  const mockPositionChanged = vi.fn();

  it('should show an error if postcode entered is too short', async () => {
    render(
      <PostcodePicker
        onPostcodeChanged={mockPostcodeChanged}
        onPositionChanged={mockPositionChanged}
      />
    );

    const searchBox = screen.getByPlaceholderText('Enter postcode');
    await userEvent.type(searchBox, 'br2');

    expect(screen.getByText('The post code needs to be a valid UK postcode')).toBeInTheDocument();
    expect(mockPostcodeChanged).toHaveBeenCalledWith('br2');
  });

  it('should show an error if postcode entered is wrong format', async () => {
    render(
      <PostcodePicker
        onPostcodeChanged={mockPostcodeChanged}
        onPositionChanged={mockPositionChanged}
      />
    );

    const searchBox = screen.getByPlaceholderText('Enter postcode');
    await userEvent.type(searchBox, 'br2 grt');

    expect(screen.getByText('The post code needs to be a valid UK postcode')).toBeInTheDocument();
    expect(mockPostcodeChanged).toHaveBeenCalledWith('br2 grt');
  });

  it('should return a position if postcode entered is valid', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ latitude: 2, longitude: 4 }));

    render(
      <PostcodePicker
        onPostcodeChanged={mockPostcodeChanged}
        onPositionChanged={mockPositionChanged}
      />
    );

    const searchBox = screen.getByPlaceholderText('Enter postcode');
    await userEvent.type(searchBox, 'br2 8bp');
    const searchElement = await screen.findByRole('search');

    expect(searchElement).not.toBeNull();
    expect(mockPostcodeChanged).toHaveBeenCalledWith('br2 8bp');
    expect(mockPositionChanged).toHaveBeenCalledWith({ latitude: 2, longitude: 4 });
  });

  it('should handle API errors gracefully', async () => {
    fetchMock.mockResponseOnce({}, { status: 502 });

    render(
      <PostcodePicker
        onPostcodeChanged={mockPostcodeChanged}
        onPositionChanged={mockPositionChanged}
      />
    );

    const searchBox = screen.getByPlaceholderText('Enter postcode');
    await userEvent.type(searchBox, 'br2 8bp');
    const alertElement = await screen.findByRole('alert');

    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent('There was an error trying to get the GPS location');

    expect(mockPostcodeChanged).toHaveBeenCalledWith('br2 8bp');
    expect(mockPositionChanged).not.toHaveBeenCalled();
  });
});
