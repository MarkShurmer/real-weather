import { render } from '@/test-utils/custom-render';
import { describe, it, jest } from '@jest/globals';
import CurrentWeather from './CurrentWeather';
import { Suspense } from 'react';

describe('CurrentWeather component', () => { 
    it('should give error message when weather state is null', () => { 
        render(<Suspense fallback={<div>loading</div>}><CurrentWeather /></Suspense>, {}, jest.fn())
     })
 })