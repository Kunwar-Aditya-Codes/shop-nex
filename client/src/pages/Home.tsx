import CategoryCard from "../components/CategoryCard";
import { categoryCardData } from "../misc/categoryCardData";

const Home = () => {
  return (
    <div className="py-8">
      <div className="grid  grid-cols-1 place-items-start justify-items-center  md:grid-cols-3">
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
  );
};
export default Home;
