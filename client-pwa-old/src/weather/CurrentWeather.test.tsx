import { render, screen } from '@/test-utils/custom-render';
import { describe, it, jest, beforeAll, expect } from '@jest/globals';
import CurrentWeather from './CurrentWeather';
import { Suspense } from 'react';
import { partiallyMock } from '@/test-utils/test-helpers';


describe('CurrentWeather component', () => { 

    beforeAll(() => {
        const mockState = {title: 'test title'};
        global.fetch = partiallyMock<typeof global.fetch>( jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve(mockState),
          }),
        ));
    })

    it('should give error message when weather state is null', () => { 
      render(<Suspense fallback={<div>loading</div>}><CurrentWeather /></Suspense>, {}, jest.fn())
      
      expect(screen.getByRole("status")).toBeInTheDocument();
     })
 })