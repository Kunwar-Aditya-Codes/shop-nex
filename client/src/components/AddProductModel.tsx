import { FC, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EditModelProps {
  setAddProductModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductModel: FC<EditModelProps> = ({ setAddProductModel }) => {
  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    price: 0,
    category: '',
    productImage: '',
  });

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageFile = files[0];

      const reader = new FileReader();

      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          productImage: reader?.result as string,
        }));
      };
    }
  };

  const addProduct = async (productData: any) => {
    toast.loading('Adding...', {
      id: 'add-product',
    });

    const { productName, productDescription, price, category, productImage } =
      product;

    if (
      !productName ||
      !productDescription ||
      !price ||
      category.length === 0 ||
      !productImage
    ) {
      toast.error('All fields required!', {
        id: 'add-product',
      });
      return;
    }

    try {
      await axiosPrivate.post('/product/admin/create', {
        ...productData,
      });

      toast.success('Product Added!', {
        id: 'add-product',
      });

      setAddProductModel(false);
    } catch (error) {
      console.log('error');
      toast.error('Error', {
        id: 'add-product',
      });
    }
  };

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-[100] flex  items-center justify-center  bg-black/80 backdrop-blur-md'>
      <div className='flex  w-[90%] flex-col rounded-md bg-white/5 p-4  backdrop-blur-lg lg:w-[50%]'>
        <div className='flex w-full items-center justify-end pr-2 pt-2'>
          <IoCloseOutline
            onClick={() => setAddProductModel(false)}
            className='w-fit cursor-pointer text-end text-2xl text-white'
          />
        </div>

        <div className='my-8 flex w-full flex-col space-y-6 px-4'>
          <input
            type='text'
            name='productName'
            value={product.productName}
            onChange={handleInputs}
            placeholder='Product Name'
            className='rounded-md border border-zinc-900 bg-transparent p-2 placeholder:text-zinc-600'
          />
          <input
            type='text'
            name='productDescription'
            value={product.productDescription}
            onChange={handleInputs}
            placeholder='Product Description'
            className='rounded-md border border-zinc-900 bg-transparent p-2 placeholder:text-zinc-600'
          />
          <input
            type='number'
            name='price'
            value={product.price}
            onChange={handleInputs}
            placeholder='Product Price'
            className='rounded-md border border-zinc-900 bg-transparent p-2 placeholder:text-zinc-600'
          />
          <input
            type='text'
            name='category'
            value={product.category}
            onChange={handleInputs}
            placeholder='Product Category'
            className='rounded-md border border-zinc-900 bg-transparent p-2 placeholder:text-zinc-600'
          />
          <input
            type='file'
            name='productImage'
            onChange={handleImageInput}
            className='rounded-md  border border-zinc-900 bg-transparent p-2 file:mr-2 placeholder:text-zinc-600'
          />

          <button
            onClick={() => {
              mutation.mutate(product);
            }}
            className='rounded-md border border-zinc-900 py-3 font-light uppercase tracking-wider transition ease-out hover:bg-zinc-900'
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModel;
