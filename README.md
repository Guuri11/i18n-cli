
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
