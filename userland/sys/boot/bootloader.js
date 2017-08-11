// Enable strict mode
"use strict";

// NOTE: This file is runned in the main frame's global context, so it can
//       access any ressource that has been declared in that context.

// Wrap the bootloader's code inside an IIFE to avoid polluating the global env.
(function () {
  // Boot message
  bootLine('Bootloader started.');

})(); // Invoke the bootloader's code as a functino
