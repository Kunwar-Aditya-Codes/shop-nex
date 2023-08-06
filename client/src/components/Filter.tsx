import { useBoundStore } from '../app/store';

const Filter = () => {
  const price = useBoundStore((state) => state.price);
  const setPrice = useBoundStore((state) => state.setPrice);
  const category = useBoundStore((state) => state.category);
  const setCategory = useBoundStore((state) => state.setCategory);

  const handlePriceChange = (event: any) => {
    const price = parseInt(event.target.value);
    setPrice(price);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setCategory(category);
  };
  return (
    <div className=' space-y-6 text-white'>
      <div className=' space-y-3'>
        <h1>Price ( ₹ {price} - ₹ 200000 )</h1>
        <input
          type='range'
          min='0'
          max='200000'
          step='1000'
          className='w-[80%] accent-zinc-900 lg:w-full'
          value={price}
          onChange={handlePriceChange}
        />
      </div>

      <div className='space-y-3'>
        <h1>Category</h1>
        <select
          className='w-[80%] border border-zinc-900 bg-transparent px-2 py-2  outline-none lg:w-full'
          value={category}
          onChange={handleCategoryChange}
        >
          <option value='' className=' text-black '>
            All Categories
          </option>
          <option value='Electronics' className=' text-black '>
            Electronics
          </option>
          <option value='Clothing' className=' text-black '>
            Clothing
          </option>
          <option value='Accessories' className=' text-black '>
            Accessories
          </option>
          <option value='Shoes' className=' text-black '>
            Shoes
          </option>
        </select>
      </div>
    </div>
  );
};
export default Filter;
