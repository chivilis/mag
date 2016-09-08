const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {ipcMain, dialog} = require('electron');
const fs = require('fs');

var mainWindow = null;

app.commandLine.appendSwitch('enable-usermedia-screen-capturing');

app.on('ready', function() {
	
	mainWindow = new BrowserWindow({width: 570, height: 800/*, frame: false*/,
								 movable: true,
								 resizable: true});
	mainWindow.setMenu(null);

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.webContents.openDevTools();
	
	//console.log(mainWindow.webContents)
  
	ipcMain.on('print', function(event, data) {
		mainWindow.webContents.print([{printBackground: true}], function() {
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

app.on('activate', function () {
  if (mainWindow === null) {
	;
  }
});