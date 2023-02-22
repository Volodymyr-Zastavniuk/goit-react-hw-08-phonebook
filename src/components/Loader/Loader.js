import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <ThreeDots
      color="grey"
      wrapperStyle={{ position: 'absolute', left: '180px', top: '36px' }}
    />
  );
};

export default Loader;
