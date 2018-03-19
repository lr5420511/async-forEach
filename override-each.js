"use strict";

Array.prototype.forEach = ((each) => {
    return function() {
        const args = [].slice.call(arguments);
        if (args.length <= 0) {
            throw new RangeError("Array.prototype.forEach: Lenth of arguments is invaild.");
        }
        const callback = args[0],
            finish = args[1];
        if (finish instanceof Function) {
            (function looper(ar, index, result) {
                if (index >= ar.length) {
                    finish(undefined, result);
                } else {
                    const cur = ar[index];
                    callback(cur, index, result, (err, res) => {
                        if (err) return finish(err, res);
                        looper(ar, ++index, res);
                    });
                }
            })(this, 0)
        } else {
            return each.call(this, callback);
        }
    };
})([].forEach);