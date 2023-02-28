
# 🌍 I18n-cli

CLI tool for quick i18n additions


# 🏆 Motivation
Working with translations can be so boring & annoying when you are trasnlating a big project with 3 or more languages availables. So I wanted to have a node tool for inserting ASAP the sentences for i18n.


# 🧪 Features

- Add new sentences to locales, just put the folder path where the json files are located.
- Update a the sentences based on a key
- Delete the sentences based on a key
- Export the locales to CSV

## Installation

Install with ```$ npm install --save-dev i18n-cli```

or

Install with ```$ yarn add --dev @guuri11/i18n-cli ```

## Usage
Run ```$ node_modules/@guuri11/i18n-cli/bin/cli.js  ```

or

Create a script in your package.json like this
```json

"scripts": {
    "i18n-cli": "node_modules/@guuri11/i18n-cli/bin/cli.js"
  }
```
and just run 

```npm run i18n-cli```

or

```yarn run i18n-cli```

#### Preview
```
ℹ Running i18n editor                                                                                                                      15:12:33
ℹ Please choose an option:                                                                                                                 15:12:33
1 -> Add Translation Sentence
2 -> Delete Translation Sentence
3 -> Generate CSV extract
4 -> Exit
Option: 1
Selected option: 1
Enter the folder path where the locale files are located: ./locale
Enter the key of the new translation sentence: hello_world
ready Key: hello_world                                                                                                                     15:12:59
Add translation for en locale or type 'update' to modify an existing one: Hello world!
ready Value: Hello world!                                                                                                                  15:13:21
✔ Translation added to locale                                                                                                              15:13:21
Add translation for es locale or type 'update' to modify an existing one: Hola mundo!
ready Value: Hola mundo!                                                                                                                   15:13:25
✔ Translation added to locale                                                                                                              15:13:25
✔ Translation added to all locales                                                                                                         15:13:25
ℹ Please choose an option:                                                                                                                 15:13:25
1 -> Add Translation Sentence
2 -> Delete Translation Sentence
3 -> Generate CSV extract
4 -> Exit
Option: 3
Selected option: 3
✔ CSV generated successfully 
```
#### Result

##### src/locales/en.json
```json
{
  "hello_world": "Hello World"
}
````

##### src/locales/es.json
```json
{
  "hello_world": "Hola mundo"
}
````

##### src/locales/locales.csv
```csv
key,en,es
hello_world,Hello world!,Hola mundo!
````

## 📝 Feedback

If you have any feedback, please reach out to me at Linkedin 😁 (https://www.linkedin.com/in/sergio-gurillo-corral-2585431b0/)

