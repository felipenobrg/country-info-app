import CountryInfo from "@/components/layout-components/CountryInfo";

export default function CountryInfoPage({ params }: { params: { countryCode: string } }) {
  const { countryCode } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 text-white">
      <CountryInfo countryCode={countryCode} />
    </div>
  );
}
