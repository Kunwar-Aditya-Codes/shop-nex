import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import Filter from '../components/Filter';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { useBoundStore } from '../app/store';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/api/axiosConfig';

interface Product {
  _id: string;
  productName: string;
  price: number;
  productImage: string;
  category: string;
}

const Products = () => {
  const [filterShow, setFilterShow] = useState(false);

  const price = useBoundStore((state) => state.price);
  const category = useBoundStore((state) => state.category);

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axiosInstance.get('/product/all');
      return response.data;
    },
    refetchInterval: 10000,
  });

  const filteredProducts: Product[] = data?.products?.filter(
    (product: Product) => {
      if (!category) {
        return product;
      }

      return product.price >= price && product.category === category;
    }
  );

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
        } absolute left-0 top-3 h-full w-full rounded-sm border-zinc-900 bg-[#09090b]/80 p-4 backdrop-blur-md transition  ease-out md:relative md:top-0 md:flex-[0.2] md:translate-x-0 md:border`}
      >
        <Filter />
      </div>
      {/* Products */}
      <div className='grid grid-cols-1 justify-items-center gap-8 px-4 md:flex-[0.8] md:grid-cols-2 lg:justify-items-start xl:grid-cols-3'>
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            image={product.productImage}
            name={product.productName}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};
export default Products;
