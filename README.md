
![NightOS Logo](logo.png)

NightOS is a desktop environment which is based on a custom Linux distribution. It uses the [Electron](https://github.com/electron/electron) and [NodeJS](https://nodejs.org) technology to access the filesystem, manage the network connections, and manage applications safely.

## How does it work?

NightOS works as a very large JavaScript application, that runs on a Linux + Electron base. This project aims to demonstrate the power of JavaScript by making a full O.S. with this language, so the most tasks that can be handled by it will be done using JS. The Linux system works as an interface, a layer that allows JavaScript to manage the network connections, access the hard drive, and some other low-level things.

## What? (Again) Another O.S.? For what purpose?

NightOS is a purely theorical operating system. I don't know if I'll make a working version of NightOS one day, and even if I do, that will be a very unsecured O.S. because I don't know many things about programming security (even basic things such as buffer overflows, ROPs...) ; in fact the only security techs I know about are general things like encryption, certificates, checksums and IPC for example - not enough at all for a full system.

In fact, I made NightOS more for fun and using more deep JavaScript and Node.js features. I do not aim at all to make a better O.S. than Windows, Mac or Linux - not even making an alternative to them. Making an O.S. full of JavaScript is simply not possible due to many problems, like the slow speed of JS in front of native languages like C++ or Rust, and the problem for developpers to port their applications to NightOS (even if there are tools for that, like Emscripten).

It's also a way to demonstrate the power of the JavaScript language, which is I think the most misunderstood one in the development world. By making a system fully functionnal that manages a Linux system, applications, a desktop environment, multiple user accounts, several processes, a large API and processes isolation, I think this could be a great proof that JavaScript is a powerful language - when you understand it and know how to use its deep features.

## Differences with the previous versions of the system

I published two previous versions of NightOS. You can find them on my GitHub: [v1](https://github.com/ClementNerma/NightOS-v1) and [v2](https://github.com/ClementNerma/NightOS-v2).

v1 has a lot of problems, and v2 was not enough complete to be an operating system. So I decided to restart the project from scratch, and keeping just the main ideas of the project (a really strong security, permissions for apps...) and I made this new version of NightOS.

There's some similar points with the older versions: the system still works with applications, that need permissions in order to access the storage/web/manage windows/... but now the permissions system is much stronger, much permissive and it's now possible to make unpackaged applications, programs that run without having to be installed (like .exe on Windows, but with permissions).

So, even if you find the two old versions really bad, this one is very different, so I hope you'll enjoy it ;) !

## Computer requirements

NightOS can run on any low-end computers. You don't have to worry about the performances of your machine.
If you really want to have specifications, here there are:

* At least 200 Mb of free RAM, 500 Mb recommended ;
* Any low-end processor ;
* A hard drive (that would be nice), a mouse, a keyboard and a screen.

That's all! Relax and enjoy :).

## Installation

Installation requires [NodeJS](https://nodejs.org), [NPM](https://npmjs.com) and [Git](https://git-scm.com/) installed on your machine. On Linux, you can run `sudo apt-get install nodejs npm git`. On Windows, simply visit these three websites to get the installation programs of each software.

To install NightOS, open a command-line and run the following code :

```bash
git clone https://github.com/ClementNerma/NightOS # Download NightOS
cd NightOS # Go to the NightOS directory
npm install # Install the npm dependencies
npm start # Start NightOS ; `node start.js` also works
```

You can also run NightOS in development mode (see more in the docs):

```bash
# The simple way
npm run dev
```

## License

This project is released under the [GNU General Public License (GPL)](LICENSE.md). If you want to edit my work and publish modifications, please contact me first so I can view why and how you modified NightOS - even if you're not forced to. I made this project mainly for fun and demonstrate the JavaScript's power, so I'd like to know what improvements can be made.

Some of the [fonts](userland/sys/fonts) cannot be used under the GPL terms ; you must refer to their original license.

## Disclaimer

The software is provided "as is" and the author disclaims all warranties with regard to this software including all implied warranties of merchantability and fitness. In no event shall the author be liable for any special, direct, indirect, or consequential damages or any damages whatsoever resulting from loss of use, data or profits, whether in an action of contract, negligence or other tortious action, arising out of or in connection with the use or performance of this software.

## Credits

NightOS was built using [NodeJS](https://nodejs.org) and [Electron](https://github.com/electron/electron).
Icons are from [Icons8](https://icons8.com), [Joe Parks](https://www.flickr.com/people/34450190@N08) and [Font-Awesome](http://fortawesome.github.io/Font-Awesome).
