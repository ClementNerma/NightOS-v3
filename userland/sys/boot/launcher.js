/**
 * @file This file launches the NightOS core by opening an Electron window
 * @author Clément Nerma
 */
// Enable strict mode
"use strict";

/**
  * Throw a fatal error
  * @param {string} title
  * @param {string|Object} message
  * @param {boolean} [hideReport] Hide the 'Report' button
  * @param {boolean} [forbidReload] Show the same error message when the user clicks on "reload"
  * @returns {void}
  */
function error(title, message, hideReport = false, forbidReload = false) {
  /**
   * Escape markdown
   * @param {string} input The unescaped text
   * @returns {string} The same text, escaped
   */
  function escapeMarkdown (input) {
    // Escape all special characters
    return input.replace(/\\|\`|\*|\{|\}|\[|\]|\(|\)|\#|\+|\-|\.|\!|\_|\>/g, m => '\\' + m);
  }

  // If the system is not hosted...
  if (! hosted)
    // Exit this function ; the main frame will display an error screen and
    //  maybe reboot by itself.
    // Also, no error dialog could be displayed because there is no window
    //  manager available if the system is not currently hosted.
    return ;
  // Forbid the whole application from leaving
  forbidExit = true;
  // If the main window is still available...
  // (Because if (forbidReload == true) when the user clicked on "reload", the
  //  window was already destroyed)
  try {
    // Close the it (stop the system)
    mainWindow.close();
  } catch (e) { /* Ignore errors */ }

  // Show an error dialog and wait for the user to click on one button
  // {Reload} => Reload the application
  // {Exit} => Exit
  // {Report} => Make a report of the error (not always available)
  let ans = dialog.showMessageBox({
    type     : 'error',
    buttons  : ['Reload', 'Exit'].concat(!hideReport ? 'Report (GitHub)' : []),
    defaultId: 0,
    cancelId : 1,
    detail   : message,
    title    : 'Error',
    message  : title
  });

  // If user decided to reload...
  if(ans === 0) {
    // If reloading is forbidden...
    if (forbidReload)
      // Forbid it.
      return error.apply(this, Array.from(arguments));
    else // Else... (the most common case)
      // Reload the app
      reload();
  // Exit choice
  } else if (ans === 1)
    // Exit
    app.quit();
  // Make a report (not always available)
  else if(ans === 2) {
    // Has to be made
  }
}

/**
  * Reload the system
  * @returns {void}
  */
function reload() {
  // Has to be made
}

// Save the instant when the loading started
const started = Date.now();
// Save the instant when the loading finished
let loadingDuration;

// A simple boolean to know if the whole Electron application can leave
let forbidExit = false;

// Module to control application life.
const electron = require('electron'),
      fs = require('fs'),
      os = require('os'),
      ipc = electron.ipcMain;
// Load some submodules from the "electron" module
const {app, BrowserWindow, protocol, dialog} = electron;

// Get command-line arguments
let argv = [];

// Define some constants from the command-line
const hosted = process.argv.includes('--hosted');

// Is the application loaded?
let appLoaded = false;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// When Electron is ready...
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({ show: false });

  // For each argument provided...
  for (let item of process.argv.slice(2)) {
    // If it doesn't start by "--"...
    if (! item.startsWith('--'))
      // Throw an error
      return error('Invalid command-line arguments', `Invalid argument >>> ${item} <<< ; command-line flags must start by "--".`, false, true);

    // Save the argument in the list (without the "--")
    argv.push(item.substr(2));
  }

  // If the system is hosted...
  // NOTE: This block is placed here because the "error()" function needs to
  //       manipulate the main window a little. Also, dialog boxes can be used
  //       only when the application is ready.
  if (hosted) {
    // Look for a "userland" directory, which contains the plain data
    if (! fs.existsSync('userland') || ! fs.lstatSync('userland').isDirectory())
      // Throw an error
      return error('Error in hosting process', 'The "userland" directory was not found. Please move the NightOS system to it.');

    // Go to the data directory
    process.chdir('userland');
  }

  // Remove the menu bar...
  mainWindow.setMenu(null);

  // And go fullscreen !
  mainWindow.setFullScreen(true);

  // Emitted when the page is re-loaded
  mainWindow.webContents.on('did-start-loading', function() {
    // Consider the application as loaded
    appLoaded = true;
  });

  // Emitted when the page fails to load
  mainWindow.webContents.on('did-fail-load', function(event, errorCode, errorDescription, validatedURL, isMainFrame) {
    // Throw an error
    error('Loading failed', `Failed to load NightOS resources. Please load the application again. Error : ${errorCode}, ${errorDescription}`);
  });

  // Define the main file's URL
  let main = require('path').join(__dirname, '..', 'frame.html');

  // If this file is not found...
  if (! fs.existsSync(main) || ! fs.lstatSync(main).isFile())
    // Throw an error
    return error('Main file not found', 'System\'s main file was not found.');

  // Load the main frame's HTML file
  mainWindow.loadURL(main);

  // Show the main window
  mainWindow.show();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // Also, exit can be forbidden for some events.
  if(process.platform !== 'darwin' && ! forbidExit)
    // Exit the application
    app.quit()
});
