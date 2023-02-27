'use strict';

const consola = require('consola');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');

// Prompt the user with a question and return their answer as a promise
function question(q) {
  return new Promise(resolve => readline.question(q, answ => resolve(answ)));
}

// Add a new translation sentence to a specific locale file
async function addToLocale(locale, key, path) {
  const value = await question(`Add translation for ${locale} locale: `);

  consola.ready(`Value: ${value}`);

  const filePath = `${path}/${locale}.json`;

  // Read the contents of the locale file as JSON data
  let localeJson;
  try {
    const fileData = await fs.promises.readFile(filePath);
    localeJson = JSON.parse(fileData);
  } catch (err) {
    consola.error(`Unable to read file: ${err}`);
    return;
  }

  // Check if the translation key already exists in the locale file
  if (localeJson.hasOwnProperty(key)) {
    consola.warn(`Translation key ${key} already exists in ${locale} locale`);
    return;
  }

  // Add the translation key-value pair to the locale JSON data
  localeJson[key] = value;

  // Convert the JSON data to a formatted string
  const data = JSON.stringify(localeJson, null, 2);

  // Write the updated JSON data to the locale file
  try {
    await fs.promises.writeFile(filePath, data);
    consola.success('Translation added to locale');
  } catch (err) {
    consola.error(`Unable to write file: ${err}`);
  }
}

// Get a list of locales and prompt the user to add a translation sentence to each one
async function addTranslationSentence() {
  const key = await question('Enter the key of the new translation sentence: ');
  consola.ready(`Key: ${key}`);

  const path = await question('Enter the folder path where the locale files are located: ');

  // Read the list of files in the specified folder
  let files;
  try {
    files = await fs.promises.readdir(path);
  } catch (err) {
    consola.error(`Unable to read directory: ${err}`);
    return;
  }

  // Loop through each file in the folder and prompt the user to add a translation sentence
  for (const file of files) {
    await addToLocale(file.replace('.json', ''), key, path);
  }

  consola.success('Translation added to all locales');
}

// Prompt the user to choose an option and handle their selection
async function askOption() {
  consola.info('Please choose an option:');
  console.log('1 -> Add Translation Sentence');
  console.log('2 -> Exit');

  const option = await question('Option: ');

  console.log(`Selected option: ${option}`); // await the promise before printing to the console

  switch (parseInt(option)) {
    case 1:
      await addTranslationSentence();
      await askOption();
      break;
    case 2:
      consola.info('Exiting...');
      process.exit();
    default:
      consola.error('Invalid option, please choose again');
      await askOption();
      break;
  }
}


// Start the CLI tool
async function i18ncli() {
  consola.info('Running i18n editor');
  await askOption();
}

module.exports = i18ncli;
