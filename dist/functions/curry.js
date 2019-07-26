"use strict";
exports.__esModule = true;
//const curry<A,B,C>: (u: UnCurried<A,B,C>) => Curried<A,B,C> =
function curry(f) {
    return function (a) { return (function (b) { return f(a, b); }); };
}
exports.curry = curry;
function uncurry(f) {
    return function (a, b) { return f(a)(b); };
}
exports.uncurry = uncurry;
//# sourceMappingURL=curry.js.map