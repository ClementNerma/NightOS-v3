
# Development mode

The development mode can refer to several things:

* The *native console* ;
* The *Devtron module* ;
* The *debug mode* ;
* The *NPM development mode*

## Native console

The native console is the console built in Electron. You can show it up by starting the system with the `--console` flag.

**WARNING :** Anything you type in this console will be runned in the main process. By accessing the main process' ressources, you take the risk to break system files or make unwanted modifications to NightOS. Please use it at your own risk, only if you know exactly what you are doing.

## Devtron module

To use the `devtron` module in the native console. To use it, follow these steps:

 - Install the module using `npm install --save-dev devtron` ;
 - Run the system with the `--console` flag to open the Electron's native console ;
 - In the console, type `require('devtron').install();`

You will now see a "Devtron" tab in the console. Installation is permanent, you won't have to do anything the next time you'll run NightOS.

To remove this tab, simply uninstall the NPM package with `npm remove electron` (avoid doing this while NightOS is running).

## Debug mode

The debug mode enables some special features in the system, such as the NightOS console and a system log to notice all important events that happen while you are using the system. To enable the debug mode, use the `--debug` flag.

## NPM development mode

There is a development mode written in the `package.json` file that is used by the system. It starts NightOS with the following flags: `--debug --console --autoboot --can-reload`, which allows developers to debug anything in the system. To use this mode, type `npm run dev` in a terminal, in the repository's main folder.
