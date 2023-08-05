import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AddProductModel from '../../components/AddProductModel';
import { MdOutlineDeleteOutline } from 'react-icons/md';

interface AllProductsProps {}

const AllProducts: FC<AllProductsProps> = ({}) => {
  const axiosPrivate = useAxiosPrivate();

  const [addProductModel, setAddProductModel] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/product/all');
      return response.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <p className='mt-16 animate-pulse text-center text-lg font-light uppercase tracking-wider md:mt-0'>
          Loading products...
        </p>
      ) : data.products.length === 0 ? (
        <div className=' mt-16 flex flex-col items-center space-y-6 md:mt-0'>
          <p className=' text-center text-lg font-light uppercase tracking-wider '>
            No Products Yet!
          </p>
          <button
            onClick={() => setAddProductModel(true)}
            className='rounded-md border border-zinc-900 px-4 py-2 transition ease-out hover:bg-zinc-900'
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className='mt-8 space-y-4 md:ml-8 md:mt-0'>
          <button
            onClick={() => setAddProductModel(true)}
            className='rounded-md border border-zinc-900 px-4 py-2 transition ease-out hover:bg-zinc-900'
          >
            Add Product
          </button>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='mb-4 flex items-center justify-between rounded-md bg-zinc-900 px-4 py-3 text-lg '>
                <th className='w-full text-center  font-light tracking-wide'>
                  Image
                </th>
                <th className='w-full text-center font-light tracking-wide'>
                  Product Name
                </th>
                <th className='w-full text-center font-light tracking-wide'>
                  Price
                </th>
                <th className='hidden w-full justify-center text-center font-light tracking-wide md:inline-flex'>
                  Category
                </th>
                <th className='w-full text-center font-light tracking-wide'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product: any) => (
                <tr
                  className='mb-4 flex items-center justify-between rounded-md border border-zinc-900 px-4 py-2'
                  key={product._id}
                >
                  <td className='flex w-full items-center justify-center '>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className='w-[45%] md:w-[35%] lg:w-[25%]'
                    />
                  </td>
                  <td className='w-full text-center'>{product.productName}</td>
                  <td className='w-full text-center'>{product.price}</td>
                  <td className='hidden w-full justify-center text-center md:inline-flex'>
                    {product.category}
                  </td>
                  <td className='flex w-full items-center justify-center'>
                    <MdOutlineDeleteOutline className='h-5 w-5 text-red-500' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {addProductModel ? (
        <AddProductModel setAddProductModel={setAddProductModel} />
      ) : null}
    </div>
  );
};

export default AllProducts;
