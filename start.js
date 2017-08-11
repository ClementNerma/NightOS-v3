'use strict';

// Check if the Chalk module is available
try {
  // This function throws an error if the module we ask for is not found.
  // Else, it will just return the path of the module's main file, without
  //  running it.
  require.resolve('chalk');
} catch (e) {
  // An error was found, so the package is not available
  console.error('"chalk" module was not found.');
  process.exit(-1);
}

// Load the Chalk module
const chalk = require('chalk');

// Check if the Electron module is available
try {
  // Try to resolve "Electron"
  require.resolve('electron');
} catch (e) {
  // An error was found, so the package is not available
  console.error(chalk.red('"electron" module was not found'));
}

// Spawn a new process for running electron, giving it the application's
//  inline arguments.
require('child_process').spawn(
  require('electron'), // The electron's executable path
  [
    '.', // "." refers to the current directory
    '--hosted' // Indicates to NightOS that the system is hosted
  ].concat( // The arguments for Electron
    process.argv.slice(2) // Give the script's command-line arguments to Electron
  ), {
  // Run Electron in the application's directory, because "package.json" is located here.
  cwd: __dirname
}).stdout.on('data', data => { // Watch the process' output in the console
  // Show the console message
  console.log(data.toString());
});;
