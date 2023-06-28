import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { categoryCardData } from "../misc/categoryCardData";
import { BsArrowRight } from "react-icons/bs";
import { productsCardData } from "../misc/productsCardData";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="">
      <div className=" relative  mb-16">
        <div
          className="
         absolute left-0 top-0 z-10 flex h-full w-full items-end justify-center bg-black/70 pb-8 
        "
        >
          <Link to="/products">
            <button
              className=" flex items-center rounded-sm bg-white/75 px-8 py-3  text-xl font-light uppercase tracking-wider text-black transition  ease-in-out hover:bg-white
              "
            >
              <span>Shop Now</span>
              <BsArrowRight className="ml-2 inline-block" />
            </button>
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1560815407-85a04c6e993d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
          alt="banner"
          className="h-[500px] w-full object-cover md:h-[600px] lg:h-[700px]   
          "
        />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {/* Categories */}
        <>
          <h1 className=" mb-6 text-center text-2xl font-light uppercase tracking-wider md:text-3xl lg:text-start lg:text-3xl">
            Category
          </h1>
          <div className="overflow-x-scroll">
            <div
              className="flex w-max flex-nowrap items-center justify-between space-x-4 p-4 lg:w-full lg:space-x-0 lg:p-0
            "
            >
              {categoryCardData.map((item) => (
                <CategoryCard
                  key={item.title}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </>

        {/* Featured Products */}
        <>
          <h1 className="mb-6 mt-16 text-center text-2xl font-light uppercase tracking-wider md:text-3xl lg:text-start lg:text-3xl">
            Featured Products
          </h1>
          <div className="overflow-y-hidden overflow-x-scroll">
            <div
              className="flex w-max flex-nowrap items-center justify-between space-x-4 p-4 lg:w-full  lg:space-x-0 lg:p-0
            "
            >
              {productsCardData.map((item) => (
                <ProductCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  rating={item.rating}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
export default Home;
