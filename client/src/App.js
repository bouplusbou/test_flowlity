import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import BarChart from './BarChart';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styled from 'styled-components';

const Section = styled.section`
  padding: 10vh 10vw;
`;
const SelectSection = styled.section`
  width: 400px;
  margin-bottom: 3vw;
`;
const TableSection = styled.section`
  margin-bottom: 3vw;
`;
const ChartSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 3vw;
`;


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
            accessor: 'product_id',
            width: 100,
            style: {
              textAlign: 'center'
            }
          },
          {
            Header: 'Product Name',
            accessor: 'product_name',
            style: {
              textAlign: 'center'
            }
          },
          {
            Header: 'Date',
            accessor: 'date',
            style: {
              textAlign: 'center'
            }
          },
          {
            Header: 'Inventory Level',
            accessor: 'inventory_level',
            style: {
              textAlign: 'center'
            }
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
    <Section>
      <SelectSection>
        <h3>Select a product:</h3>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
      </SelectSection>
      <TableSection>
        <ReactTable
          columns={columns}
          data={selectedData}
          minRows={1}
          showPagination={false}
          noDataText={''}
        >
        </ReactTable>
      </TableSection>
      <ChartSection>
        <BarChart 
          selectedData={selectedData}
        />
      </ChartSection>
    </Section>
  );
}

export default App;