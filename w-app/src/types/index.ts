export type TSearchLocations = {
    selectedCity: string | null;
    cities: any[];
    setSelectedCity: (query: string) => void;
    setCities: (args: any[]) => void;
    handleCityChange: (e: any, value: string | null) => void;
}

export type TCities = {
    results: TCity[]; 
}

export type TCity = {
    country_code: string;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    timezone: string;
}