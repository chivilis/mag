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
//<<<<<<< HEAD
  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.openDevTools()
  //console.log(mainWindow.webContents)
  //mainWindow.webContents.print()

	//ipc.on('print', function() {
		///console.log(arg)  // prints "ping"
		/*
		if(arg == '1') {
			event.sender.send('asynchronous-reply', 'arg is 1')
			mainWindow.webContents.print();
		}
		else {
			event.sender.send('asynchronous-reply', 'arg is ' + arg);
		}
		*/
		//console.log(mainWindow.webContents)


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

//>>>>>>> 31fe0a00ad7fc90b6f91da8eebaf9b239bc54313
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
