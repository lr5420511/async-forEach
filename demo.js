"use strict";

require("./forEach-async");
const { mkdir } = require("fs");

let ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

ar.forEach((item, index) => {
    console.log("index: " + index + ", value: " + item);
    if (item === 6) return false;
});

console.log("print after sync forEach call.");

ar = ["./a", "./b", "./c", "./d", "./e"];

ar.forEach((item, index, res, cb) => {
        res = typeof res === "undefined" ? item : (res + ", " + item);
        mkdir(item, (err) => {
            if (err) return cb(err);
            console.log(index + ": " + item + " directory create success.");
            cb(null, res);
        });
    },
    (err, res) => {
        if (err) return console.log(err);
        console.log(res + ": create completed!");
    }
);

console.log("print before async forEach call.");