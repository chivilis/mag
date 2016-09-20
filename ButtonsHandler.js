module.exports.manageButtons = function() {
	var buttonsFromGUI = $('.printButtons');

	function showPrintButtons(buttons) {
		this.b = new Array(buttons);
		this.b.forEach(function(button) {
			button.show();
		});
	}
	function hidePrintButtons(buttons) {
		this.b = new Array(buttons);		
		this.b.forEach(function(button) {
			button.hide();
		});
	}

	$('#gearInput').change(function(data) {
		if(data.target.value.length > 10) {
			showPrintButtons(buttonsFromGUI);
		}
		else {
			hidePrintButtons(buttonsFromGUI);
			alert('ENTER GEAR DATA!');
		}
	});

	// RELOAD LISTENER
	$('canvas').dblclick(function() {
		if(confirm('OPEN NEW LOG FILE?')) {
			location.reload();
		}

	});
}