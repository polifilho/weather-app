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

export type TLocaionOption = {
    props: any;
    option: TDataOption;
}

export type TDataOption = {
    name?: string;
    label: string;
    country_code: string;
    lat: number;
    lon: number;
}

export type TForecastAPIResponse = {
    forecast: TForecastAPIResponseItem[];
}

export type TForecastAPIResponseItem = {
    rain_sum: number[];
    daylight_duration: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_gusts_10m_max: number[];
    wind_speed_10m_max: number[];
}

export type TSelectDays = {
    selectedOptions: string;
    handleOptionsChange: (event: any) => void
}
