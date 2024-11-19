interface PopulationData {
    year: string | number;
    population: number;
  }
  
  interface BorderCountry {
    commonName: string;
    officialName: string;
    countryCode: string;
  }
  
  export interface CountryInfoType {
    name: string;
    flagImage: string; 
    borderCountries: BorderCountry[];
    populationData: PopulationData[];
    countryCode: string
    countryName: string
  }
  