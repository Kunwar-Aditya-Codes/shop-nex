import { Link } from 'react-router-dom';

const Error = ({}) => {
  return (
    <div className='flex flex-grow flex-col items-center justify-center space-y-16 '>
      <h1 className='text-center text-3xl font-black tracking-wider md:text-4xl lg:text-5xl'>
        404 NOT FOUND!
      </h1>

      <Link
        to='/'
        className='rounded-md border border-zinc-900 px-5 py-3 text-lg  font-light tracking-wide'
      >
        Go to home
      </Link>
    </div>
  );
};

export default Error;
