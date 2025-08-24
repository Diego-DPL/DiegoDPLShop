import { Country, State, City } from 'country-state-city';

export type CountryOption = { code: string; name: string };
export type StateOption = { isoCode: string; name: string };
export type CityOption = { name: string };

export function getAllCountries(): CountryOption[] {
  return Country.getAllCountries()
    .map(c => ({ code: c.isoCode, name: c.name }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

export function getStatesOf(countryCode: string): StateOption[] {
  if (!countryCode) return [];
  return State.getStatesOfCountry(countryCode)
    .map(s => ({ isoCode: s.isoCode, name: s.name }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

export function getCitiesOf(countryCode: string, stateIso: string): CityOption[] {
  if (!countryCode || !stateIso) return [];
  return City.getCitiesOfState(countryCode, stateIso)
    .map(c => ({ name: c.name }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

