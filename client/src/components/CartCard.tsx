import { useBoundStore } from '../app/store';

type Props = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  productImage: string;
};

const CartCard = ({
  price,
  productId,
  productImage,
  productName,
  quantity,
}: Props) => {
  const addProduct = useBoundStore((store) => store.addProducts);
  const removeProduct = useBoundStore((store) => store.removeProducts);

  return (
    <div className='m-2 flex w-full items-start space-x-6 pt-4'>
      <div className='h-full w-[40%]  lg:w-[30%]'>
        <img
          src={productImage}
          alt={productName}
          className='h-full w-full rounded-md object-cover'
        />
      </div>
      <div className='flex flex-col items-start space-y-4'>
        <h1 className='font-light tracking-wider md:text-3xl'>{productName}</h1>
        <div className='flex items-center space-x-4 text-xl'>
          <button
            onClick={() => removeProduct(productId)}
            className='rounded-md bg-zinc-900 px-2 pb-1'
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={() =>
              addProduct({
                _id: productId,
                name: productName,
                price: price,
                image: productImage,
                quantity: 1,
              })
            }
            className='rounded-md bg-zinc-900 px-2 pb-1'
          >
            +
          </button>
        </div>
        <p className='text-sm font-extralight text-white/75'>₹ {price}.00</p>
      </div>
    </div>
  );
};
export default CartCard;
