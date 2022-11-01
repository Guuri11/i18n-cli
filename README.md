
# 🌍 I18n-cli

CLI tool for quick i18n additions


# 🏆 Motivation
Working with translations can be so boring & annoying when you are trasnlating a big project with 3 or more languages availables. So I wanted to have a node tool for inserting ASAP the sentences for i18n.


# 🧪 Features
Add new sentences to locales, just put the folder path where the json files are located.

## Usage/Examples

Install with ```$ npm install --save-dev i18n-cli```

Run ```$ npm i18n-cli ```

```
ℹ Running I18n editor
ℹ Please, choose one of this options

1 -> Add Sentence
2 -> Exit
Option: 1
Choose the key of the new sentence: hello_world
ready Key hello_world

Paste the folder path where is located the locales: ./src/locales

Add translation for en.json locale: Hello World
ready Value: Hello World
✔ Sentence added

Add translation for es.json locale: Hola mundo
ready Value: Hola mundo
✔ Sentence added
✔ Translation added to locales
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

## 📝 Feedback

If you have any feedback, please reach out to me at Linkedin 😁 (https://www.linkedin.com/in/sergio-gurillo-corral-2585431b0/)

