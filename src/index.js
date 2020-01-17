#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const meow = require('meow');
const com = require('./cloudcommunication');
const extension = require('./extension');

clear();

console.log(
  chalk.greenBright(
    figlet.textSync('ExtendIt', { horizontalLayout: 'full' })
  )
);

const cli = meow(`
    Usage
      $ extendit <extension>

      Options
       --apikey, -a API key used to communicate with Qlik Cloud 
       --csp, -c Search for CSP 
       --upload, -u Upload the extension to 
       --unicorn prints a rainbows and unicorns for your effort
`, {
  booleanDefault: undefined,
  flags: {
    csp: {
      type: 'boolean',
      default: false,
      alias: 'c'
    },
    upload: {
      type: 'string',
      default: '',
      alias: 'u'
    },
    unicorn: {
      type: 'boolean',
      default: false
    }
  }
});

const err = (desc, error) => {
  console.log(chalk.redBright('Error: ' + desc), chalk.greenBright(error));
  process.exit(1)
}

const parseExtensions = async () => {
  // Find all urls in all files in the extension zip
  let csp = [];
  try {
    files.openZip(cli.input).then((zipfile) => {
      for (let file in zipfile.files) {
        zipfile.files[file].async('text').then((text) => {
          extension.getUrls(text).forEach( (url) => {
            extension.getFileType(url).then( (mime) => {
              csp.push({url, mime});
              console.log({url, mime});
            });
          });
        });
      }
    });
  } catch (error) {
    err('Not a valid zip', error);
  }
}


// Handle Input

if (cli.flags.unicorn) {
  console.log('🌈  🦄 🦄  ✨ ');
}

// Extension file
if (cli.input != '') {
  parseExtensions();
} else {
  err('No extension declared')
}

// upload
if (cli.flags.upload) {

  if (!com.validURL(cli.flags.upload)) {
    err('Not a valid URL', cli.flags.upload);
  } else {
    com.uploadExtension(cli.input);
  }
}

const baseUrl = 'https://tenant-onboarding.us.qlik-stage.com/';
const action = 'api/v1/apps/414ab903-5a5d-4962-a846-acd3eb584e85';
const url = baseUrl + action;
//com.getData(url);
