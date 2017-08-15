// Enable strict mode
"use strict";

// Boot message
bootLine('Launching desktop environment...');

/* Open the registry to get the desktop environment's (DE's) application name */

// Save the registry's path in the memory
let regPath = path.join(__dirname /* Main frame's CWD */, '..', 'etc', 'registry');

// Check if the registry is available
if (! fs.existsSync(regPath) || ! fs.lstatSync(regPath).isFile())
  // Throw an error
  error('Registry file is missing');
