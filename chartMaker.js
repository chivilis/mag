var Chart = require('chart.js');

const RANGE_Y = 5;

function getRangeLine(obj) {
	var rangeLine = new Array();
	for(var i = 0; i < obj.length; i++) {
		if(i == 0) {
			rangeLine.push({x : i, y : RANGE_Y});
		} else if (i == obj.length-1) {
			rangeLine.push({x : i+2, y : RANGE_Y});
		} else {
			continue;
		}
	}
	return rangeLine;
}

module.exports = function(dataSets) {
var ctx = document.getElementById("myChart");
	var scatterChart = new Chart(ctx, {
		responsive: true,
		maintainAspectRatio: false,
		type: 'line',
		data: {
			datasets: [
			{
				data: dataSets.dataSetPoss
			},
			{
				data: dataSets.dataSetNeg
			},
			{
				steppedLine: false,
				fill: false,
				fillColor: "rgba(151,187,205,0.2)",
				pointBorderColor: "rgba(255,45,46,0.2)",
				borderColor: "rgba(255,45,46,0.2)",
				data: getRangeLine(dataSets.dataSetNeg)
			}
			]
			
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				xAxes: [{
					type: 'linear',
					position: 'bottom'
				}]
			}
		}
	});
}