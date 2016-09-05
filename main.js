const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const {ipcMain} = require('electron')


ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})
/*
	ipc.on('asynchronous-message', function(event, arg) {
	  console.log(arg)  // prints "ping"
	  event.sender.send('asynchronous-reply', 'pong')
	})

	ipc.on('synchronous-message', function(event, arg) {
	  console.log(arg)  // prints "ping"
	  event.returnValue = 'pong'
	})
*/
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow

//function createWindow () {
  // Create the browser window.

app.commandLine.appendSwitch('enable-usermedia-screen-capturing');
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', function() {
	mainWindow = new BrowserWindow({width: 570, height: 800/*, frame: false*/,
								 movable: true,
								 resizable: true});
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
		ipcMain.on('print', (event, arg) => {
		  console.log(arg)  // prints "ping"
			console.log('got by side')
			mainWindow.webContents.print();

		})
	//	console.log(arg + ' received')
//});
	mainWindow.on('closed', function () {

	})
});
  // Emitted when the window is closed.






//let contents = mainWindow.webContents

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    //createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
