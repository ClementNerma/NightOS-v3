// Enable strict mode
"use strict";

// NOTE: This file is runned in the main frame's global context, so it can
//       access any ressource that has been declared in that context.

// Wrap the bootloader's code inside an IIFE to avoid polluating the global env.
(function () {
  // Boot message
  bootLine('Bootloader started.');
  bootLine('Press any key to display the boot options...');

  // Prepare the key listener
  let bootkeyListener = () => {
    // Cancel the normal boot timer
    clearTimeout(normalBootTimer);

    // Remove the key listener
    document.body.removeEventListener('keydown', bootkeyListener);

    // Display the boot options
    // TODO: Make the boot options and the mode that are associated
    //       (e.g. repair mode)

    /** ======= PATH WHILE THE BOOT OPTIONS ARE NOT MADE ======= **/
    bootLine('WARNING: Sorry, but the boot options are not available for now.');
    bootLine('WARNING: System will now boot.');

    // Make a timer to boot normally in 3 seconds.
    setTimeout(boot, 3000);
  };

  // Give the focus to the boot screen
  bootArea.focus();

  // Attach the key listener
  document.body.addEventListener('keydown', bootkeyListener);

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
