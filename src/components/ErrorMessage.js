import React from 'react';

const Error = ({error: {errorCode, errorMessage}}) => {
  console.log(errorCode, '<< Error code')
  return (
    <div>
      <h1 className="display-4">{errorCode}</h1>
      <h2 className="display-5 text-muted">{errorMessage}</h2>
      <p>Something went wrong, please try again!</p>
      <p><a href="/">Home</a></p>
    </div>
  );
};

export default Error;