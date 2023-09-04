import React from 'react';
import { css } from '@emotion/react';
import { PacmanLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <PacmanLoader css={override} size={50} color={'#36D7B7'} loading={true} />
    </div>
  );
};

export default LoadingSpinner;