import { brandsCardData } from "../misc/brandsCardData";

const Brands = () => {
  return (
    <div className=" flex-grow">
      <div className="mx-auto mb-16 mt-8 max-w-7xl p-4">
        <h1 className="text-center text-xl font-semibold uppercase tracking-wider md:text-3xl">
          Partnered Brands
        </h1>
        <div className="mt-8 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {brandsCardData?.map((brand) => (
            <div
              key={brand.id}
              className="flex w-full cursor-pointer flex-col items-center space-y-2 rounded-md border border-zinc-900 p-4 transition ease-out hover:scale-105 "
            >
              <div className="flex w-full items-center justify-center rounded-sm border-2 border-dashed border-zinc-900 px-8 py-4">
                <brand.logo className="h-16 w-16" />
              </div>
              <h2 className="text-lg font-light uppercase tracking-wider">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Brands;
