// Enable strict mode
"use strict";

// NOTE: This file is runned in the main frame's global context, so it can
//       access any ressource that has been declared in that context.

// NOTE: It's useless to wrap the bootloader's code inside an IIFE to avoid
//       polluating the global environment because ressources are defined using
//       the `let` statement, which makes them defined only in this file's
//       scope.

// Boot message
bootLine('Sysloader has been loaded.');
