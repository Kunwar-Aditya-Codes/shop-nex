import { BsStarFill } from "react-icons/bs";

interface ProductCardProps {
  image: string;
  name: string;
  rating: number;
  price: number;
}

const ProductCard = ({ image, name, rating, price }: ProductCardProps) => {
  return (
    <div className="flex h-[27rem] w-[18rem] flex-col justify-between rounded-sm bg-zinc-900">
      <img
        src={image}
        alt={name}
        className="h-[15rem] w-full rounded-sm object-cover"
      />
      <div className="flex flex-col items-center space-y-4 p-4">
        <h1 className="text-2xl font-medium uppercase tracking-wider">
          {name}
        </h1>
        <div className="flex items-center space-x-1">
          {Array(rating)
            .fill("")
            .map((_, i) => (
              <BsStarFill key={i} className="text-yellow-400" />
            ))}
        </div>
        <h1 className=" font-light uppercase tracking-wider">${price}</h1>
      </div>
      <button className="w-full rounded-b-sm bg-white/75 py-2 font-bold uppercase tracking-wider text-black transition ease-out hover:bg-white">
        Add to cart
      </button>
    </div>
  );
};
export default ProductCard;
