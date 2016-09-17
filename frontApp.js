	var chartMaker = require('./chartMaker');
  	var LineByLineReader = require('line-by-line');
  	var form = require('./form');
  	var {dialog} = require('electron').remote;
  	var buttonsManager = require('./ButtonsHandler');
  	var exec = require('child_process').exec;

    const {ipcRenderer} = require('electron');
	
	module.exports = function() {
		// PDF PRINT DONE INDICATOR
		ipcRenderer.on('printDone', function() {
		   $('#buttons').show();
		});


		

		var contentDisplayObjects = new Array($('#header'), $('#footer'));

		dialog.showOpenDialog({properties: ['openFile', 'singleSelection'], filters: [{name:'', extensions:['txt']}]}, function(file) {
			lineCounter = 0;
			MeasureData = new Array();

			if(file) {
				lr = new LineByLineReader(file[0]);
				contentDisplayObjects.forEach(function(obj) {
					obj.show();
				});
			}
			else {
				alert('LOG FILE IS REQUIRED!');
				location.reload();
			}


			lr.on('line', function (line) {
				if(lineCounter == 1) {
					MeasureData.push({
						index : 1,
						date : null,
						time : null,
						pressure : parseInt(0),
						unit : 'mbar'
					});
					lineCounter++;
				} else if(line.substring(37, 41)*1 == 0) {
					// SKIP LINE IF Pressure == 0
					;
				} else if(lineCounter > 1) {
				// 	NORMAL LINE
					MeasureData.push({
						index : parseInt(line.substring(4, 6)),
						date : new Date(line.substring(8, 18)),
						time : new Date().getTime(line.substring(19, 27)),
						pressure : line.substring(37, 41)*1,
						unit : line.substring(50, 54)
					});
				}
				else {
					if(line.toString() == ' Index  ---date--- --time--      Pressure         unit') {
						lineCounter++;
					}
					else {
						alert('INVALID FILE CONTENT!');
						location.reload();
					}
				}
			});
			lr.on('end', function() {
				lineCounter = 0;
				var DataSets = function(MeasureData) {

					dataSetPoss = new Array();
					dataSetNeg = new Array();

					var loopEndCounter = true;

					MeasureData.forEach(function(MeasureData) {
							if(MeasureData.pressure >= 0 && loopEndCounter) {

								this.dataSetPoss.push({
									x: MeasureData.index,
									y: MeasureData.pressure
								});

							} else {
								this.loopEndCounter == false;

								this.dataSetNeg.push({
									x: MeasureData.index,
									y: MeasureData.pressure
								});
							}
					});

					// SET INDEXES ROWS
					var count = 1;

					if(dataSetPoss.length >= dataSetNeg.length) {
						dataSetPoss.forEach(function(x) {
							x.x = count;
							count++;
						});

						count = 1;
						dataSetNeg.push({ x:1, y:0 });
						this.dataSetNeg = dataSetNeg.reverse();

						dataSetNeg.forEach(function(x) {
							if(count == 1) {
								x.x = 1;
							}
							else {
								x.x = (this.dataSetPoss.length / this.dataSetNeg.length) * count;
							}
							count++;
						});

						dataSetPoss.push({x:dataSetPoss.length + 1, y:0});
						dataSetNeg.push({x:dataSetPoss[dataSetPoss.length-1].x, y:0});

					} else {
						alert('STILL WORKING (if negative array is longer...)')
					}

					return ({dataSetPoss, dataSetNeg});

				}

				var dataSets = new DataSets(MeasureData);
				
				

				/* CHART */
				chartMaker(dataSets);
				
				
				form($('#header')[0], $('#footer'));
				
			});

			var buttons = $('.printButtons');

			$('#gearInput').change(function(data) {
				if(data.target.value.length > 10) {
					buttonsManager.showPrintButtons(buttons);
				}
				else {
					buttonsManager.hidePrintButtons(buttons);
					alert('ENTER GEAR DATA!');
				}
			});

			// RELOAD LISTENER
			$('canvas').dblclick(function() {
				if(confirm('OPEN NEW LOG FILE?')) {
					location.reload();
				}

			});
		});
	}