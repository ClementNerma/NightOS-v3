
# Command-line arguments (flags)

NightOS can be runned with command-line arguments, also called flags. Here is the list of available options:

| **Argument** |  **Value**   | **Description** |
|--------------|--------------|-----------------|
| --hosted     |     -        | Run NightOS in any host O.S.\* |
| --debug      |     -        | Enable the debug mode (useful on host systems) |
| --console    |     -        | Open the native Electron's console |
| --can-reload |     -        | Hide the error message when the main frame is refreshed (e.g. Ctrl+R in the console) |
| --autoboot   |     -        | Automatically select normal boot |
| --crash      |     -        | Force the system to crash |
| --inject     | *=script.js* | Load a JavaScript file in the main frame |
| --full-log   |     -        | Log each NightOS message and action in a file (can slow down the system)
| --keep-log   |     -        | Do not clean the detailled log when NightOS closes |

## The *--hosted* flag (\*)

This flag indicates to NightOS the system is running in a host O.S. and not in its custom Linux base. It disables data encryption and enables console output in a dedicated file (in the `/tmp/host` folder).

**NOTE :** This flag is automatically specified when you run NightOS from `npm start` or `node start.js`.

## Detailled log

The detailled log (enabled by `--full-log`) lists all actions performed by the system and the user while NightOS is running. It will be written each time an application is opened, closed, installed or removed, each time a window is moved or resized, etc. Also, timestamps are associated to each action.

The log file can become really large in a short time and the many writing can slow down NightOS.

Also, be aware of keeping the file in a secured place: all HTTP requests that are performed are stored into the log, as well as many actions you could perform while you are using it. The log file is cleaned when NightOS stops (you can prevent this by using the `--keep-log` flag).
