import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountryService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${process.env.BASE_URL_NAGER_API}/AvailableCountries`),
      );
      return response.data;
    } catch (error) {
      console.error('Error getting AvailableCountries', error);
      throw new HttpException(
        'Error fetching available countries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCountryInfo(countryCode: string): Promise<any> {
    try {
      const nagerBaseUrl = process.env.BASE_URL_NAGER;
      const countriesBaseUrl = process.env.BASE_URL_COUNTRIES_NOW;
      if (!nagerBaseUrl || !countriesBaseUrl) {
        throw new Error('BASE_URL_NAGER_API or BASE_URL_COUNTRIES_API is not defined');
      }

      const borderResponse = await lastValueFrom(
        this.httpService.get(`${nagerBaseUrl}/CountryInfo/${countryCode}`)
      );
      const countryName = borderResponse.data.commonName;

      const populationResponse = await lastValueFrom(
        this.httpService.post(
          `${countriesBaseUrl}/countries/population`,
          { country: countryName }
        )
      );
      const flagResponse = await lastValueFrom(
        this.httpService.post(
          `${countriesBaseUrl}/countries/flag/images`,
          { country: countryName }
        )
      );

      return {
        borderCountries: borderResponse.data.borders,  
        populationData: populationResponse.data.data.populationCounts, 
        flagImage: flagResponse.data.data.flag,  
        countryName: countryName, 
        countryCode: countryCode, 
      };
    } catch (error) {
      console.error('Error fetching country info', error);
      throw new HttpException(
        'Failed to fetch country info from the API',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}