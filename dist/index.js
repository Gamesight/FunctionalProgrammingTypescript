"use strict";
exports.__esModule = true;
var curry_1 = require("./functions/curry");
function sumAndStringify(a, b) {
    return String(a + b);
}
var Runner = /** @class */ (function () {
    function Runner() {
    }
    Runner.main = function () {
        var a = 1;
        var b = 2;
        console.log('Calling sumAndStringify(1,2)...');
        console.log("Result: " + sumAndStringify(a, b));
        var curried = curry_1.curry(sumAndStringify);
        var partial1 = curried(1);
        console.log(partial1(2));
        return 0;
    };
    return Runner;
}());
Runner.main();
//# sourceMappingURL=index.js.map