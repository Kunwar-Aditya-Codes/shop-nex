interface Props {
  image: string;
  title: string;
  description: string;
}

const CategoryCard = ({ image, title, description }: Props) => {
  return (
    <div
      className="group relative h-[30rem] w-[20rem] overflow-hidden rounded-sm border border-zinc-800 
    "
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full transform-gpu rounded-sm object-cover transition duration-[250ms] ease-in-out  group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/60 transition ease-out group-hover:bg-black/70">
        <div className="flex h-full flex-col items-center justify-center space-y-4 px-6">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-white">
            {title}
          </h1>
          <p className="text-center text-white">{description}</p>
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;
