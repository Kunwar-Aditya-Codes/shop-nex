import { useBoundStore } from '../app/store';

const Filter = () => {
  const price = useBoundStore((state) => state.price);
  const rating = useBoundStore((state) => state.rating);
  const setPrice = useBoundStore((state) => state.setPrice);
  const setRating = useBoundStore((state) => state.setRating);

  const handleRatingChange = (event: any) => {
    const rating = parseInt(event.target.value);
    setRating(rating);
  };

  const handlePriceChange = (event: any) => {
    const price = parseInt(event.target.value);
    setPrice(price);
  };
  return (
    <div className=' space-y-6 text-white'>
      <div className='space-y-3'>
        <h1>Rating</h1>
        <input
          type='range'
          min='0'
          max='5'
          step='1'
          value={rating}
          className='accent-zinc-900'
          onChange={handleRatingChange}
        />
        <p>Selected rating: {rating}</p>
      </div>

      <div className='space-y-3'>
        <h1>Price</h1>
        <input
          type='range'
          min='0'
          max='2000'
          step='200'
          className='accent-zinc-900'
          value={price}
          onChange={handlePriceChange}
        />
        <p>Selected price: {price}</p>
      </div>
    </div>
  );
};
export default Filter;