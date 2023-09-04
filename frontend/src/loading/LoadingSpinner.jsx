import React from 'react';
import { RingLoader } from 'react-spinners';
import './LoadingSpinner.css'; 



const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <RingLoader size={250} color={'#FF355E'} loading={true} />
      <br />
      <p >Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;