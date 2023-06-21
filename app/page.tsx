import { Hero } from "../components";
import { SearchBar, CustomFilter, CarCard, ShowMore } from "../components";
import { getCarData } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { CarProps, HomeProps } from "@/types";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await getCarData({
    manufacturer: searchParams?.manufacturer || "",
    model: searchParams?.model || "",
    fuel: searchParams?.fuel || "",
    year: searchParams?.year || 2022,
    limit: searchParams?.limit || 10,
  });

  const isEmptyData = !Array.isArray(allCars) || !allCars?.length || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars of your choice</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isEmptyData ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car: CarProps) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
