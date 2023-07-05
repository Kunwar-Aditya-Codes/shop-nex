import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { allProducts } from "../misc/productsCardData";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);

  const { id } = useAuth();

  console.log("id >>>>>>", id);

  const filterOnRating = () => {
    const filteredProducts = [...products].sort((a, b) => b.rating - a.rating);
    setProducts(filteredProducts);
  };

  return (
    <div className="mx-auto mb-6 w-full max-w-7xl p-4">
      {/* Filters */}
      <div className="flex  items-center  space-x-8 overflow-x-scroll py-4 lg:px-4">
        <div>
          <HiOutlineAdjustmentsHorizontal className="h-5 w-5" />
        </div>

        <button
          onClick={filterOnRating}
          className="rounded-sm bg-zinc-900 px-4 py-1 font-light tracking-wide transition ease-out hover:bg-zinc-700"
        >
          Ratings
        </button>
        <button className="rounded-sm bg-zinc-900 px-4 py-1 font-light tracking-wide transition ease-out hover:bg-zinc-700">
          Price
        </button>
        <button className="rounded-sm bg-zinc-900 px-4 py-1 font-light tracking-wide transition ease-out hover:bg-zinc-700">
          New Arrivals
        </button>
      </div>
      {/* Products */}
      <div className="mt-10 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-start">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};
export default Products;
