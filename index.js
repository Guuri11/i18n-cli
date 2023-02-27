'use strict';

const consola = require('consola');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');

let localePath = null;

// Prompt the user with a question and return their answer as a promise
function question(q) {
  return new Promise(resolve => readline.question(q, answ => resolve(answ)));
}

// Add a new translation sentence to a specific locale file
async function addToLocale(locale, key) {
  let value = await question(`Add translation for ${locale} locale or type 'update' to modify an existing one: `);

  if (value.toLowerCase() === 'update') {
    value = await question(`Enter new value for ${key} in ${locale} locale: `);
    consola.ready(`New value: ${value}`);
    await updateLocaleSentence(locale, key, value);
    return;
  }

  consola.ready(`Value: ${value}`);

  const filePath = `${localePath}/${locale}.json`;

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
  if (!localePath) {
    localePath = await question('Enter the folder path where the locale files are located: ');
  }

  const key = await question('Enter the key of the new translation sentence: ');
  consola.ready(`Key: ${key}`);

  // Read the list of files in the specified folder
  let files;
  try {
    files = await fs.promises.readdir(localePath);
  } catch (err) {
    consola.error(`Unable to read directory: ${err}`);
    return;
  }

  // Loop through each file in the folder and prompt the user to add a translation sentence
  for (const file of files) {
    await addToLocale(file.replace('.json', ''), key);
  }

  consola.success('Translation added to all locales');
}

async function updateLocaleSentence(locale, key, value) {
  const filePath = `${localePath}/${locale}.json`;

  // Read the contents of the locale file as JSON data
  let localeJson;
  try {
    const fileData = await fs.promises.readFile(filePath);
    localeJson = JSON.parse(fileData);
  } catch (err) {
    consola.error(`Unable to read file: ${err}`);
    return;
  }

  // Check if the translation key exists in the locale file
  if (!localeJson.hasOwnProperty(key)) {
    consola.warn(`Translation key ${key} does not exist in ${locale} locale`);
    return;
  }

  // Update the translation value in the locale JSON data
  localeJson[key] = value;

  // Convert the JSON data to a formatted string
  const data = JSON.stringify(localeJson, null, 2);

  // Write the updated JSON data to the locale file
  try {
    await fs.promises.writeFile(filePath, data);
    consola.success('Translation updated in locale');
  } catch (err) {
    consola.error(`Unable to write file: ${err}`);
  }
}

// Delete a translation sentence from a specific locale file
async function deleteFromLocale() {
  if (!localePath) {
    localePath = await question('Enter the folder path where the locale files are located: ');
  }
  const key = await question('Enter the key of the translation sentence to delete: ');
  const files = await fs.promises.readdir(localePath);
  let deleted = false;

  // Loop through each file in the folder and delete the translation key
  for (const file of files) {
    const locale = file.replace('.json', '');
    const filePath = `${localePath}/${file}`;

    // Read the contents of the locale file as JSON data
    let localeJson;
    try {
      const fileData = await fs.promises.readFile(filePath);
      localeJson = JSON.parse(fileData);
    } catch (err) {
      consola.error(`Unable to read file: ${err}`);
      continue;
    }

    // Delete the translation key from the locale JSON data
    if (localeJson.hasOwnProperty(key)) {
      delete localeJson[key];
      deleted = true;
    }

    // Convert the JSON data to a formatted string
    const data = JSON.stringify(localeJson, null, 2);

    // Write the updated JSON data to the locale file
    try {
      await fs.promises.writeFile(filePath, data);
    } catch (err) {
      consola.error(`Unable to write file: ${err}`);
      continue;
    }
  }

  if (deleted) {
    consola.success(`Translation key '${key}' deleted from all locales`);
  } else {
    consola.warn(`Translation key '${key}' not found in any locales`);
  }
}


// Prompt the user to choose an option and handle their selection
async function askOption() {
  consola.info('Please choose an option:');
  console.log('1 -> Add Translation Sentence');
  console.log('2 -> Delete Translation Sentence');
  console.log('3 -> Exit');

  const option = await question('Option: ');

  console.log(`Selected option: ${option}`); // await the promise before printing to the console

  switch (parseInt(option)) {
    case 1:
      await addTranslationSentence();
      await askOption();
      break;
    case 2:
      await deleteFromLocale();
      await askOption();
      break;
    case 3:
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