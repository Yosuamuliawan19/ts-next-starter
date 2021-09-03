import { Spinner } from '@chakra-ui/react';
const LoadingOverlay = () => {
  return (
    <div
      className={
        'fixed z-max w-screen h-screen flex items-center justify-center'
      }
      style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
    >
      <Spinner />
    </div>
  );
};

export default LoadingOverlay;
