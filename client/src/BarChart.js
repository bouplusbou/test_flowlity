import React, { useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ dataForChart }) {
    useEffect(() => {
        if (dataForChart.length !== 0) {
            console.log(dataForChart);
            drawBarChart(dataForChart);
        }
    }, [dataForChart]);

    const drawBarChart = (data) => {
        const canvasHeight = 400;
        const canvasWidth = 600;
        const barPadding = 5;
        const barWidth = (canvasWidth / data.length);
        // using the max value to setup the highest point
        const scale = Math.max(...dataForChart) / canvasHeight;
        const svgCanvas = d3.select('div')
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .style('border', '1px solid black');
        svgCanvas.selectAll('rect')
            .data(data).enter()
                .append('rect')
                .attr('width', barWidth - barPadding)
                .attr('height', datapoint => datapoint / scale)
                .attr('fill', 'orange')
                .attr('y', datapoint => canvasHeight - datapoint / scale)
                .attr("transform", function (d, i) {
                    var translate = [barWidth * i, 0]; 
                    return "translate("+ translate +")";
                });
    };

    return (<div></div>)   
}

export default BarChart;

