module.exports = {
	showPrintButtons: function(buttons) {
		this.b = new Array(buttons);
		this.b.forEach(function(button) {
			button.show();
		});
	},
	hidePrintButtons: function(buttons) {
		this.b = new Array(buttons);		
		this.b.forEach(function(button) {
			button.hide();
		});
	}
}