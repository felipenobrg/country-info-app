import AvailableCountryList from "@/components/layout-components/AvailableCountryList";
import { getCountries } from "@/lib/getCountries";

export default async function Home() {
  const countryData = await getCountries();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-6">Available Countries</h1>
        <AvailableCountryList countryData={countryData} />
      </div>
    </div>
  );
}
