"use strict";

require("./override-each");
const { readFile } = require("fs");

console.log("--------------------Step 1: test common sync forEach--------------------\n\n");

let ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

ar.forEach((item, index) => {
    console.log("Index: " + index + ", value: " + item);
});

ar = [
    "./test-docs/doc-1",
    "./test-docs/doc-2",
    "./test-docs/doc-3",
    "./test-docs/doc-4",
    "./test-docs/doc-5",
    "./test-docs/doc-6"
];

let content = "";

ar.forEach((item, index) => {
    readFile(item, "utf8", (err, ctn) => {
        content += ctn;
        if (index >= ar.length - 1) {
            console.log("\n--------------------Step 2: test sync forEach + async handler--------------------\n\n");
            console.log(content);
        }
    });
});

ar.forEach((item, index, result, cb) => {
    result || (result = "");
    readFile(item, "utf8", (err, ctn) => {
        if (err) return cb(err);
        result += ctn;
        cb(null, result);
    });
}, (err, res) => {
    console.log("\n--------------------Step 3: test async forEach--------------------\n\n");
    if (err) return console.log(err);
    console.log(res);
});