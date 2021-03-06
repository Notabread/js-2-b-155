"use strict";

const fs = require("fs");

// функция readdir планирует чтение списка файлов из папки
// но не читает их мгновенно
// поэтому можно считать, что здесь происходит обработка события
// т.е. указанный callback будет вызван, когда движок произведет чтение всего списка файлов
console.log(1);
fs.readdir("./css/", (err, files) => {
    if (err) return console.error(err);
    let css = "";
    let counter = 0;
    files.forEach((fileName) => {
        // эта функция выполняется асинхронно
        fs.readFile("./css/" + fileName, "utf-8", (err, content) => {
            if (err) return console.error(err);
            css += content;
            counter++;
            if (counter === files.length) {
                fs.writeFile("./output/main.css", css, (err) => {
                    if (err) return console.error(err);
                    console.log("Запись файла успешно завершена");
                });
            }
        });
    });
});
console.log(2);
