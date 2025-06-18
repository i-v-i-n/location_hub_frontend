// Test.js
import React, { useState } from 'react';
import App from './App';
import Geo from './Geo';

function Test() {
  const [city, setCity] = useState('');
  return (
    <>
      <App onSearch={(c) => setCity(c)} />
      <Geo city={city} />
    </>
  );
}

export default Test;
