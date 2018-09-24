import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({error: {errorCode, errorMessage}}) => {
  return (
    <div>
      <h1 className="display-4">{errorCode}</h1>
      <h2 className="display-5 text-muted">{errorMessage}</h2>
      <p>Something went wrong, please try again!</p>
      <p><Link to="/">Home</Link></p>
    </div>
  );
};

export default Error;