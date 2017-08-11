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
    // Prepare the issue's content
    let body;

    // If the message is a string
    if (typeof message === 'string')
      // The error comes from the launcher itself
      body = `Report from NightOS.\n\n* **Cause:** Launcher\n* **Title:** ${escapeMarkdown(title)}\n* **Message:** ${escapeMarkdown(message)}`;
    else {
      // The error comes from NightOS
      // Remove environment variables (that could contain sensitive data, even though they're encrypted)
      delete body.debug.env_variables;

      // Make the report's body
      body = `Report from NightOS.\n\n* **Origin:** System\n\n## Error object\n\n\`\`\`json\n${JSON.stringify(message, null, 2)}\n\`\`\``;
    }

    // Prepare additionnal informations as an object
    let addinfo = {
      uptime: Date.now() - started, // Uptime
      loadtime: (loadingDuration || false), // Time for system's loading
      host: os.platform(), // O.S. name
      arch: os.arch() // O.S. arch
    };

    // Try to...
    try {
      // Join the system's version (based on the NPM's package.json)
      addinfo.npmversion = JSON.parse(fs.readFileSync(require('path').join(__dirname, '..', '..', 'package.json'), 'utf8')).version;
    } catch (e) {
      // Catch the error
      addinfo.npmversion = '<Unable to read the system\'s version (Fs error)>';
    }

    // Make an "Additionnal informations" section
    body += '\n\n## Additionnal informations\n\n```json\n'
            // Join informations on the current system
            + JSON.stringify(addinfo, null, 2)
            // Close the section
            + '\n```';

    // Make the final URL
    let url = 'https://github.com/ClementNerma/NightOS/issues/new?title=%5BAutomatic%20report%5D%20'
              + encodeURIComponent(title) +'&body=' + encodeURIComponent(body);

    // Report the error through a GitHub issue
    // If it fails...
    if(!electron.shell.openExternal(url))
      // Show an error dialog box
      dialog.showMessageBox({
        type   : 'error',
        buttons: ['Close'],
        title  : 'Error',
        message: 'Report failed',
        details: 'It seems you have no default browser for opening links.'
      });

    // Close the window
    mainWindow.close();
  }
}

/**
  * Reload the system
  * @returns {void}
  */
function reload() {
  // Make a new child process with the app
  const child = require('child_process').spawn(
    // The electron's executable path
    process.argv[0],
    // The same command-line arguments
    process.argv.slice(1),
    // Set additionnal options for the new process
    {
      // Run Electron in the application's directory, because "package.json" is located here.
      // Go to the NightOS' main folder (containing "userland")
      cwd: require('path').join(__dirname, '..', '..', '..'),
      // Detach the process from this one
      detached: true,
      // Ignore all output
      stdio: 'ignore'
    }
  );

  // Unreference the child process to make it independent from the current process
  child.unref();

  // If the window was not closed...
  if (mainWindow)
    // Close it
    mainWindow.close();

  // Exit this process (NightOS will run in a separate one, the child process
  // we just launched)
  process.exit(0);
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
  // Define a startup event
  // The data returned by this handler could be passed by the URL, which is not
  //  visible by applications, but calling a launcher's handler permits to
  //  ensure IPC communication works well.
  ipc.on('hello', event => {
    // Saev the loading duration
    loadingDuration = Date.now() - started;
    // Send data to the application
    event.sender.send('welcome', { argv: process.argv, loadingDuration });
  });

  /* === Define some services === */

  // Reload the application
  ipc.on('reboot', reload);

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
    // If the application was already loaded...
    if(appLoaded) {
      // If reloading is allowed by the "--can-reload" flag...
      if (argv.includes('can-reload'))
        // Just restart NightOS
        reload();
      else
        // Throw an error
        error('Reload is forbidden', 'For security reasons, Electron cannot be refreshed while still running.\nThe application just closed.', true);
    } else // If the application loads for the first time...
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

  // If the console is enabled...
  if (argv.includes('console'))
    // Open the developer tools
    mainWindow.webContents.openDevTools();

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
