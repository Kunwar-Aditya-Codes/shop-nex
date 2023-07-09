interface Props {
  selectedRating: number;
  selectedPrice: number;
  onRatingChange: (rating: number) => void;
  onPriceChange: (price: number) => void;
}

const Filter = ({
  selectedRating,
  selectedPrice,
  onRatingChange,
  onPriceChange,
}: Props) => {
  const handleRatingChange = (event: any) => {
    const rating = parseInt(event.target.value);
    onRatingChange(rating);
  };

  const handlePriceChange = (event: any) => {
    const price = parseInt(event.target.value);
    onPriceChange(price);
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
          value={selectedRating}
          className='accent-zinc-900'
          onChange={handleRatingChange}
        />
        <p>Selected rating: {selectedRating}</p>
      </div>

      <div className='space-y-3'>
        <h1>Price</h1>
        <input
          type='range'
          min='0'
          max='2000'
          step='200'
          className='accent-zinc-900'
          value={selectedPrice}
          onChange={handlePriceChange}
        />
        <p>Selected price: {selectedPrice}</p>
      </div>
    </div>
  );
};
export default Filter;
