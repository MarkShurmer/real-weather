import { checkPostcode } from './postcode-checker';

describe('Postcode checker', () => {
  it('is valid for sample bromley postcodes', () => {
    expect(checkPostcode('br2 8pp')).toBeTruthy();
    expect(checkPostcode('br2 8pq')).toBeTruthy();
  });

  it('is invalid for sample bromley postcodes with no spaces', () => {
    expect(checkPostcode('br28pp')).toBeFalsy();
    expect(checkPostcode('br28pq')).toBeFalsy();
  });

  it('is valid for sample kingston postcodes', () => {
    expect(checkPostcode('kt2 5jr')).toBeTruthy();
    expect(checkPostcode('kt2 5rr')).toBeTruthy();
  });

  it('is invalid for codes with numbers in wrong place', () => {
    expect(checkPostcode('kt2 33g')).toBeFalsy();
    expect(checkPostcode('kt2 222')).toBeFalsy();
    expect(checkPostcode('k33 222')).toBeFalsy();
  });

  it('is invalid for codes with numbers in wrong place', () => {
    expect(checkPostcode('kt2 33g')).toBeFalsy();
    expect(checkPostcode('kt2 222')).toBeFalsy();
    expect(checkPostcode('k33 222')).toBeFalsy();
  });

  it('is invalid for codes with letters in wrong place', () => {
    expect(checkPostcode('kte wgg')).toBeFalsy();
    expect(checkPostcode('k2e pjk')).toBeFalsy();
    expect(checkPostcode('krr k22')).toBeFalsy();
  });

  it('is invalid for codes less than 6 chars', () => {
    expect(checkPostcode('kte w')).toBeFalsy();
    expect(checkPostcode('m1 1m')).toBeFalsy();
    expect(checkPostcode('l12r')).toBeFalsy();
  });
});
