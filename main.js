const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {ipcMain, dialog} = require('electron');
const fs = require('fs');
const menuTemplate = require('./osxMenuTemplate.js');
const {Menu} = require('electron')

var mainWindow = null;

app.commandLine.appendSwitch('enable-usermedia-screen-capturing');

app.on('ready', function() {

	mainWindow = new BrowserWindow({width: 520, height: 800/*, frame: false*/,
								 movable: true,
								 resizable: false,
								 icon: './media/diver.png',
								 title: "Regulator BR Analyser"
							 });

	Menu.setApplicationMenu(new menuTemplate());
	mainWindow.setMenu(null);

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.webContents.openDevTools();

	ipcMain.on('print', function(event, data) {

		function printPrinter(callback) {
			mainWindow.webContents.print([{printBackground: true}], function() {
				event.sender.send('printDone');
			});
			callback();
		}

		printPrinter(function() {
			event.sender.send('printDone');
		});

	});

	ipcMain.on('printPdf', function(event, data) {
		e = event;
		mainWindow.webContents.printToPDF({landscape: false, printBackground: true }, function(err, data) {
			dialog.showSaveDialog({title: 'Save PDF file', filters: [{name: ' ', extensions: ['pdf']}] },function(fileName) {
				try{
					fs.writeFile(fileName, data, function(err) {
						e.sender.send('printDone');
					});
				}
				catch(err2) {
					e.sender.send('printDone');
				}
			});
		});
	});
	mainWindow.on('closed', function () {
		;
	});
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

