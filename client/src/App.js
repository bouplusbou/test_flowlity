import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import BarChart from './BarChart'

function App() {
  const [data, setData] = useState([]); 
  const [dataForChart, setDataForChart] = useState([]); 
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
    setSelectedOption(selection.value);
    const filteredData = data.filter(elem => elem.product_name === selection.value);
    const inventoryLevels = filteredData.map(elem => elem.inventory_level);
    setDataForChart(inventoryLevels);
  };

  return (
    <Fragment>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
      <BarChart 
        dataForChart={dataForChart}
      />
    </Fragment>
  );
}

export default App;