import { allProducts } from '../misc/productsCardData';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import Filter from '../components/Filter';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const Products = () => {
  const [filterShow, setFilterShow] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const filteredProducts: Product[] = allProducts.filter((product) => {
    return product.rating >= selectedRating && product.price >= selectedPrice;
  });

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  const handlePriceChange = (price: number) => {
    setSelectedPrice(price);
  };

  return (
    <div className='relative mx-auto mb-6 mt-8 flex w-full max-w-7xl justify-center p-4 md:justify-end'>
      {/* Filters */}

      <HiOutlineAdjustmentsHorizontal
        onClick={() => setFilterShow(!filterShow)}
        className='absolute -top-6 left-5 h-6 w-6 cursor-pointer md:hidden'
      />
      <div
        className={`${
          filterShow ? 'translate-x-0' : '-translate-x-full'
        } absolute left-0 top-3 h-full w-[85%] rounded-sm border-zinc-900 bg-[#09090b]/95 p-4 transition  ease-out md:relative md:top-0 md:flex-[0.2] md:translate-x-0 md:border`}
      >
        <Filter
          selectedRating={selectedRating}
          selectedPrice={selectedPrice}
          onRatingChange={handleRatingChange}
          onPriceChange={handlePriceChange}
        />
      </div>
      {/* Products */}
      <div className='grid grid-cols-1 justify-items-center gap-8 px-4 md:flex-[0.8] md:grid-cols-2 lg:grid-cols-3 lg:justify-items-start'>
        {filteredProducts.map((product) => (
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
