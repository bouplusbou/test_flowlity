import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import BarChart from './BarChart';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function App() {
  const [data, setData] = useState([]); 
  const [columns, setColumns] = useState([]); 
  const [selectedData, setSelectedData] = useState([]); 
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
        const setupColumns = [
          {
            Header: 'Product ID',
            accessor: 'product_id'
          },
          {
            Header: 'Product Name',
            accessor: 'product_name'
          },
          {
            Header: 'Date',
            accessor: 'date'
          },
          {
            Header: 'Inventory Level',
            accessor: 'inventory_level'
          },
        ];
        setColumns(setupColumns);
        // {product_id: 0, product_name: "screw_XPK23", date: "01-01-2018", inventory_level: 234}
      })
      .catch(error => { console.log(error); })
  }, []);

  const handleChange = selection => {
    setSelectedOption(selection.value);
    const filteredData = data.filter(elem => elem.product_name === selection.value);
    setSelectedData(filteredData);
  };

  return (
    <Fragment>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
      <ReactTable
        columns={columns}
        data={selectedData}
      >
      </ReactTable>
      <BarChart 
        selectedData={selectedData}
      />
    </Fragment>
  );
}

export default App;