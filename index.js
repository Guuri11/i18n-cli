'use strict'

/**
 * Run with: node i18ncli
 */
const consola = require('consola')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');

function question(q) {
    return new Promise(resolve => readline.question(q, answ => resolve(answ)))
}

const addToLocale = async (locale, key, path) => {
    const value = await question(`Add translation for ${locale} locale: `);
    consola.ready(`Value: ${value}`);
    const localeJson = JSON.parse(fs.readFileSync(`${path}/${locale}`));
    localeJson[key] = value;
    let data = JSON.stringify(localeJson, null, 2);
    consola.success('Sentence added')
    fs.writeFile(`${path}/${locale}`, data, (err) => {
        if (err) throw err;
    });
}

const getLocales = async (key) => {
    const path = await question('Paste the folder path where is located the locales: ');
    fs.readdir(path, async function (err, files) {
        if (err) {
            consola.error('Unable to scan directory: ' + err);
            process.exit();
        }
        for await (const file of files) {
            await addToLocale(file, key, path);
        }
        consola.success('Translation added to locales')
        await askOrder();
    });
}

const addSentence = async () => {
    const key = await question('Choose the key of the new sentence: ');
    consola.ready(`Key ${key}`);
    getLocales(key)
}

const handleOption = (option) => {
    switch (parseInt(option)) {
        case 1:
            addSentence();
            break;
        case 2:
            consola.info('Exiting...')
            process.exit()
        default:
            consola.error('Option not valid, exiting...')
            process.exit()
    }
}

const askOrder = async () => {
    consola.info('Please, choose one of this options')
    console.log('1 -> Add Sentence');
    console.log('2 -> Exit');
    const option = await question('Option: ');
    handleOption(option);
}


const i18ncli = async () => {
    consola.info('Running I18n editor')
    await askOrder();
}

module.exports = i18ncli;