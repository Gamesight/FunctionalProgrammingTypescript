"use strict";
exports.__esModule = true;
var curry_1 = require("./functions/curry");
var option_1 = require("./types/option");
var either_1 = require("./types/either");
var lift_1 = require("./functions/lift");
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
        console.log('Creating a curried version of sumAndStringify...');
        var curried = curry_1.curry(sumAndStringify);
        console.log('Creating a partial function by calling curried(1)...');
        var partial1 = curried(1);
        console.log('Calling partial(2)...');
        console.log("Result: " + partial1(2));
        console.log('Uncurrying sumAndStringify...');
        var uncurried = curry_1.uncurry(curried);
        console.log('Calling uncurried(1,2)');
        console.log("Result: " + uncurried(1, 2));
        var optList = [];
        for (var i = 0; i < 100; i++) {
            var x = Math.random() * 10;
            optList.push((x > 5) ? new option_1.Some(x) : new option_1.None());
        }
        //optList.forEach(x => console.log(x))
        console.log(optList.length);
        console.log(optList.map(function (x) { return x.map(function (y) { return Math.ceil(y * 10); }); }).map(function (x) { return x.getOrElse(-1); }));
        //optList.map(x => x.map(a => a*10)).map(x => x.getOrElse(-1)).forEach(x => console.log(x))
        var eithList = [];
        for (var i = 0; i < 100; i++) {
            try {
                var x = Math.random() - 0.5;
                if (x < 0)
                    throw Error("Below zero error");
                eithList.push(new either_1.Right(x * 100));
            }
            catch (e) {
                eithList.push(new either_1.Left(e));
            }
        }
        console.log(eithList.map(lift_1.liftEither(function (x) { return 0; })));
        return 0;
    };
    return Runner;
}());
Runner.main();
//# sourceMappingURL=index.js.map