import CartCard from "../components/CartCard";
import { cartCardData } from "../misc/cartCardData";

const Cart = () => {
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-grow flex-col items-center space-y-8 p-6 lg:flex-row-reverse lg:items-start lg:space-y-0">
      <div className="flex w-full items-center justify-center lg:flex-[0.5]  lg:justify-end">
        <div className=" flex w-full flex-col  space-y-4 rounded-md  border border-zinc-900 p-4 shadow-lg lg:w-[25rem] ">
          <h1 className="text-2xl font-semibold uppercase tracking-wide  text-zinc-700 ">
            Cart Summary
          </h1>
          <p className="text-start  font-light tracking-wider">
            Total Items: <span className="">10</span>
          </p>
          <p className="text-start  font-light tracking-wider">
            Total Amount: <span className=""> $100</span>
          </p>
          <button className="rounded-md bg-white/75 py-2 font-medium uppercase tracking-wider text-black transition ease-out hover:bg-white">
            Process to pay
          </button>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 divide-y-2 divide-zinc-900 lg:flex-[0.5] ">
        {cartCardData?.map((product) => (
          <CartCard
            price={product.price}
            key={product.id}
            productId={product.id}
            productImage={product.image}
            productName={product.productName}
            quantity={product.quantity}
          />
        ))}
      </div>
    </div>
  );
};
export default Cart;
