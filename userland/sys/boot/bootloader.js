// Enable strict mode
"use strict";

// NOTE: This file is runned in the main frame's global context, so it can
//       access any ressource that has been declared in that context.

// Wrap the bootloader's code inside an IIFE to avoid polluating the global env.
(function () {
  // Boot message
  bootLine('Bootloader started.');

  /**
   * Boot normally
   * @returns {void}
   */
  function boot () {
    // Has to be made
  }

  // Make a timer to boot normally if no key has been pressed in 3 seconds.
  // NOTE: The timer is saved in a variable to be canceled if a key is pressed
  //       during the short delay.
  let normalBootTimer = setTimeout(
    // No key was pressed ; boot normally
    boot,
    // 3s wait
    3000
  );

})(); // Invoke the bootloader's code as a functino
