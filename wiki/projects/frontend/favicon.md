# Про favicon

Фавикон создается с помощью сервиса <https://realfavicongenerator.net/>. Вручную ничего не трогать!

## Проверить актуальность фавикона

```bash
npm run favicon:check
```

## Перегенерировать фавикон

```bash
npm run favicon:generate
```

По пути `./favicon/output` создастся папка со сгенерированными картинками. Содержимое этой папки нужно перенести в `./public/favicon`.  
Также будет сгенерирован `README.md` с инструкциями, из него нужно скопировать html код и вставить в `./src/components/Seo/Seo.component.jsx`.  
Нужно не забыть удалить `README.md`, после чего замена фавикона будет завершена.

## Отредактирова параметры фавикона

Если мелкая правка, то вручную поменять значения в `.favicon/faviconDescription.js` и перегенерировать фавикон.  
Иначе перейти на <https://realfavicongenerator.net/>, загрузить новый фавикон и настроить тему. После этого заменить `./favicon/masterPicture.svg` на новую картинку, а `.favicon/faviconDescription.js` на полученный с сайта json. После этого нужно перегенерировать фавикон.  

> Не забыть, что favicon хостится по пути /favicon, а также, что нужно увеличить версию, чтобы сбросился кэш
