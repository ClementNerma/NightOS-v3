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

// TODO: Check if the registry is available and fully valid
//       (no type mismatch...)
// TODO: Check that all system files are valid and haven't been modified since
//       the last update using a hash table that was of course encrypted by
//       the Linux system while the system was off - so no alteration was
//       possible.
//       In fact, there are two cases of corruption:
//       - Corruption when a modification is made outside of NightOS (when the
//         system is not running) -> corruption of a system file, the hash table
//         can't match with the modified files because it is encrypted.
//       - Corruption from an application that took the control of the system,
//         so it will do the right things to make the corrupted NightOS unable
//         to detect the corrupted files (by removing the verification process,
//         for example). That's only if an application can change system files
//         but has no access to the secret key, which is in a RAM variable,
//         so it can't re-generate the files table.
