
# Terminology

### System

The **system** refers to the "core" of NightOS, which is the application that runs with Electron (all the part programmed in HTML, JavaScript and CSS). That does *not* contain NightOS applications, such as the desktop environment.

### Launcher

The **launcher** is a single file, located in the `/sys` folder, that is runned by Electron before anything is displayed in the screen. This file has to create a window and load the system's HTML page inside.

### Main frame

The **main frame** is the HTML page that is loaded by the launcher, inside an Electron window. This file is the first that can display anything on the screen (after the Linux' boot messages). It loads some Node.js modules, prepare the splash screen if it must be used, etablish an IPC communication with the launcher, and then call the bootloader.

**NOTE :** The main frame runs in a separate process than the launcher.

### Main process

The **main process** is the process that runs the main frame.

### Bootloader

That's not a *bootloader* in the strict sense you can find in many operating systems. The bootloader we are dealing with is the program that is loaded by the main frame. It's in fact the very first program runned by the main frame. It displays the boot options, like entering the repair mode.

### Shell

The **shell** is the program that runs shell scripts. It's an interpreter that works anywhere in the system. For example, when you type commands in the terminal, the program transmits them to the shell. That's the shell who runs your command lines.

### Desktop environment

The **desktop environment** (or **DE**) is the only application that is runned in fullscreen by default and that can't be stopped. That's the DE that shows you your desktop, the mouse's cursor, the windows, that allows you to move them, resize them, and manages the status bar as well as the notifications panel.
That's a very large application, which can be changed if you want. The default DE is *Dolphin*.
