# NodeLMS

a [Sails](http://sailsjs.org) application

## Install on Ubuntu

NodeLMS is built on Sails, a MCV Framework for Node.js. You will need to have both installed before you start installing NodeLMS.

### Nodejs Using a PPA

To get the most recent version of Node.js you need to add a PPA (personal package archive) maintained by NodeSource. This will probably have more up-to-date versions of Node.js than the official Ubuntu repositories.

First, you need to install the PPA in order to get access to its contents:

```
curl -sL https://deb.nodesource.com/setup | sudo bash -
```

The PPA will be added to your configuration and your local package cache will be updated automatically. After running the setup script from nodesource, you can install the Node.js package in the same way that you did above:

```
sudo apt-get install nodejs
```

The nodejs package contains the nodejs binary as well as npm, so you don't need to install npm separately. However, in order for some npm packages to work (such as those that require building from source), you will need to install the build-essentials package:
```
sudo apt-get install build-essential
```

### Sails

To install Sails globally use the following:

```
sudo npm install -g sails
```

## Dependencies

Add all of the node packages required

```
npm install
```
