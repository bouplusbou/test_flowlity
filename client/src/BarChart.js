import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ selectedData }) {
    useEffect(() => {
        if (selectedData.length !== 0) {
            d3.select("svg").remove();
            drawBarChart(selectedData);
        }
    }, [selectedData]);

    const drawBarChart = (data) => {

      // set the dimensions and margins of the graph
      var margin = {top: 30, right: 30, bottom: 70, left: 60},
          width = 600 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#dataViz")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // X axis
      var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.date; }))
        .padding(0.2);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

      // Add Y axis
      const inventoryLevelArr = data.map(elem => elem.inventory_level);
      var y = d3.scaleLinear()
        .domain([0, Math.max(...inventoryLevelArr)])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Create a tooltip
      var tooltip = d3.select("#dataViz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

      // A function that change this tooltip when the user hover a point.
      // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
      var showTooltip = function(d) {
        tooltip
          .transition()
          .duration(100)
          .style("opacity", 1)
        tooltip
          .html(`inventory_level: ${d.inventory_level}`)
          .style("left", (d3.mouse(this)[0]+20) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      }
      var moveTooltip = function(d) {
        tooltip
        .style("left", (d3.mouse(this)[0]+20) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
      }
      // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
      var hideTooltip = function(d) {
        tooltip
          .transition()
          .duration(100)
          .style("opacity", 0)
      }

      // Bars
      svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.date); })
          .attr("y", function(d) { return y(d.inventory_level); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.inventory_level); })
          .attr("fill", "#69b3a2")
              .on("mouseover", showTooltip )
              .on("mousemove", moveTooltip )
              .on("mouseleave", hideTooltip )
    };

    return (<div id="dataViz"></div>)   
}

export default BarChart;

