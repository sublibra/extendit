#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const meow = require('meow');
const com = require('./com');
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
       --apikey, -k API key used to communicate with Qlik Cloud 
       --csp, -c Search for CSP 
       --upload, -u Upload the extension to 
       --unicorn prints a rainbows and unicorns for your effort
`, {
  booleanDefault: undefined,
  flags: {
    key: {
      type: 'string',
      default: '',
      alias: 'k'
    },
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

const info = (desc, data='', data2='') => {
  console.log(chalk.white(desc), chalk.greenBright(data),
  chalk.greenBright(data2));
}


const parseExtensions = () => {
  // Find all urls in all files in the extension zip
  let csp = [];
  return new Promise((resolve) => {

    try {
      files.openZip(cli.input).then((zipfile) => {
        for (let file in zipfile.files) {
          zipfile.files[file].async('text').then((text) => {

            extension.getUrls(text).forEach((url) => {
              try {
                extension.getFileType(url).then((mime) => {
                  info('New url found: ', url, JSON.stringify(mime))
                  csp.push({ url, mime });
                  resolve(csp);
                });
              } catch (error) {
                err(`Can't parse: `, url);
              }
            });

          });
        }
      });
    } catch (error) {
      err('Not a valid zip', error);
    }
  });
}


// Handle Input

if (cli.flags.unicorn) {
  console.log('🌈  🦄 🦄  ✨ ');
}

// Extension file
if (cli.input != '') {
  info('Parsing:', cli.input);
  parseExtensions().then((csp) => {
  });
} else {
  err('No extension declared')
}

// upload
if (cli.flags.upload) {
  if (!com.validURL(cli.flags.upload)) {
    err('Not a valid URL', cli.flags.upload);
  } else {
    info('Uploading the extension to:', cli.flags.upload);
    com.uploadExtension(cli.flags.upload, cli.flags.key, files.getFile(cli.input[0])).then( (res) => {
      //console.log(res.status);
    });
  }
}
