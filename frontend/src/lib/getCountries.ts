import { Country } from '@/types/country';
import axios from 'axios';

export async function getCountries() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/countries`);
    return response.data as Country[]; 
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
}
