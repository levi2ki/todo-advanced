import React from 'react';
import PropTypes from 'prop-types';


const FetchError = ({message, onRetry}) => {
  return (
    <div>
      <p>
        Error recieving todos. {message}
      </p>
      <button onClick={onRetry}>Retry</button>
    </div>
  )
}
export default FetchError;