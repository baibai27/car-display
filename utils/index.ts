import { CarProps, FilterProps } from "@/types";

export async function getCarData(filters: FilterProps) {
  const { manufacturer, year, model, fuel, limit } = filters;

  const headers = {
    "X-RapidAPI-Key": "bf50da8743msh132eab69cf88471p1210ebjsndaf0742b81f0",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}&limit=${limit}`,
    {
      headers: headers,
    }
  );

  const result = await response.json();
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(2);
};

export const getCarImageUrl = (car: CarProps, angle?: string) => {
  // key:
  const url = new URL("https://cdn.imagin.studio/getImage");
  const { make, year, model } = car;
  url.searchParams.append("customer", "canicolebaicompany");
  url.searchParams.append("make", make);
  url.searchParams.append("modelYear", year.toString());
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const params = new URLSearchParams(window.location.search);
  params.set(type, value);
  const newPathName = `${window.location.pathname}?${params.toString()}`;
  return newPathName;
};
