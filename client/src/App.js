import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null); 

  useEffect(() => {
    axios.get('/inventory')
      .then(res => { console.log(res); })
      .catch(error => { console.log(error); })
  }, []);

  return (
    <p>Hello</p>
  );
}

export default App;
