import { Link } from 'react-router-dom';
import React from 'react';
import { Button } from '@mui/material';
import Img from './404.png';

const NotFound = function () {
  return (
    <div className="App-header">
      <img src={Img} alt="" width={400} />
      {' '}
      <br />
      <br />
      <Link to="/"><Button>GO TO MAIN PAGE</Button></Link>
    </div>
  );
};

export default NotFound;
