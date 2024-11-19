"use client"

import React, { useState, useEffect } from "react";
import { getCountryByCode } from "@/lib/getCountryByCode";
import Image from "next/image";
import { CountryInfoType } from "@/types/countryInfo";

export default function CountryInfoPage({ countryCode }: { countryCode: string }) {
    const [countryInfo, setCountryInfo] = useState<CountryInfoType | null>(null);

    useEffect(() => {
        if (!countryCode) {
            console.warn("No country ID provided in the query.");
            return;
        }

        const fetchCountryInfo = async () => {
            try {
                const response = await getCountryByCode(countryCode);
                setCountryInfo({
                    countryCode: response.countryCode,
                    countryName: response.countryName,
                    name: response.countryName,
                    flagImage: response.flagImage,
                    borderCountries: response.borderCountries,
                    populationData: response.populationData,
                });
            } catch (error) {
                console.error("Error fetching country data:", error);
            }
        };

        fetchCountryInfo();
    }, [countryCode]);

    if (!countryInfo) {
        return <div className="min-h-screen bg-gradient-to-br from-blue-500 text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 text-white">
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-4xl font-bold mb-4">{countryInfo.name}</h1>
                <div className="flex flex-col lg:flex-row items-center gap-6">
                    <Image
                        src={countryInfo.flagImage}
                        alt={`${countryInfo.name} Flag`}
                        className="w-32 h-20 object-cover rounded-lg shadow-lg"
                        width={128}
                    />
                    <div className="text-lg">
                        <h2 className="text-2xl font-semibold">Border Countries</h2>
                        <ul className="mt-2">
                            {countryInfo.borderCountries.map((border) => (
                                <li key={border.countryCode} className="hover:underline">
                                    <a href={`/${border.countryCode}`} className="text-blue-300">
                                        {border.commonName}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
