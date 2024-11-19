import { CountryInfoType } from "@/types/countryInfo";
import axios from "axios";

export const getCountryByCode = async (countryCode: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/countries/${countryCode}`);
    return response.data as CountryInfoType;
  } catch (error) {
    console.error("Error fetching country:", error);
    throw error;
  }
}