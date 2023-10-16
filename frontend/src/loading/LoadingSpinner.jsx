import React from 'react';
import { BarLoader } from 'react-spinners';
import './LoadingSpinner.css'; 

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <BarLoader height={4}
      width={200} color={'#FF355E'} loading={true} />
      <p >Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;