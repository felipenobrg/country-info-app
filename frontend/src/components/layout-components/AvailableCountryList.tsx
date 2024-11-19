import { Country } from "@/types/country";
import Link from "next/link";

export default function AvailableCountryList({ countryData }: { countryData: Country[] }) {
    return (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {countryData.map((country) => (
                <Link
                    key={country.countryCode}
                    className="bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
                    href={`/${country.countryCode}`}
                >
                    <h5 className="text-xl font-semibold mb-2">{country.name}</h5>
                    <p className="text-sm text-gray-500">Code: {country.countryCode}</p>
                </Link>
            ))}
        </div>
    );
}
