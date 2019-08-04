# test_flowlity

Test: build a simple web application that allows inventory level visualization.

## Stack
- Node.js
- React
- D3.js for the chart
- react-table for the table
- react-select 

## Basic features
- read the data from a JSON file
- request it from the front via a REST API
- Dropdown option to choose the product ID or product name to visualize
- A graph of inventory level(y-axis) vs. date(x-axis) of the selected product 
- Table of data filtered on the selected product (product_id; product_name; date; inventory_level)

## Usage

```
// clone it

// in ./client
    // install the packages
    npm install

// in ./server
    // install the packages
    npm install
    
    // run the app
    npm run dev

```