import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [data, setData] = useState(null); 
  const [selectedOption, setSelectedOption] = useState(null); 
  const [options, setOptions] = useState(null); 

  useEffect(() => {
    axios.get('/inventory')
      .then(res => { 
        setData(res.data);
        const productNames = res.data.map(elem => elem.product_name);
        const productNamesUnique = productNames.filter((elem, index) => productNames.indexOf(elem) === index);
        const formatedOptions = productNamesUnique.map(elem => {return { value: elem, label: elem }});
        setOptions(formatedOptions);
      })
      .catch(error => { console.log(error); })
  }, []);

  const handleChange = selection => {
    setSelectedOption(selection);
    console.log(`Option selected:`, selection);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
    />
  );
}

export default App;