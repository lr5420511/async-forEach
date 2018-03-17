"use strict";

Array.prototype.forEach = (() => {
    return function() {
        const args = [].slice.call(arguments);
        if (args.length < 1) {
            throw new RangeError("Array.prototype.forEach: Count of arguments is invaild.");
        }
        const cur = this,
            callback = args[0],
            finished = args[1];
        if (finished instanceof Function) {
            (function looper(ar, index, result) {
                const cur = ar[index];
                if (typeof cur === "undefined") {
                    finished(undefined, result);
                } else {
                    callback(cur, index, result, (err, res) => {
                        if (err) return finished(err, res);
                        looper(ar, ++index, res);
                    });
                }
            })(cur, 0)
        } else {
            for (let i = 0; i < cur.length; i++) {
                const cont = callback(cur[i], i);
                if (typeof cont === "boolean" && !cont)
                    break;
            }
        }
    };
})();