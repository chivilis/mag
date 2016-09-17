const {ipcRenderer} = require('electron');

module.exports = {
		printPDF: function() {
		   $('#buttons').hide();
			ipcRenderer.send('printPdf');
		},
		printOnPrinter: function() {
		   $('#buttons').hide();
		 ipcRenderer.send('print');
		}
}