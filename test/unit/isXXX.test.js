QUnit.test('isBoolean', 6, function () {

    equal(__.isBoolean(false), true);
    equal(__.isBoolean(true), true);
    equal(__.isBoolean(-1), false);
    equal(__.isBoolean("字符串"), false);
    equal(__.isBoolean(null), false);
    equal(__.isBoolean(undefined), false);

});


QUnit.test('isElement', 4, function () {

    equal(__.isElement(document.createElement('div')), true);
    equal(__.isElement(document.createTextNode('文本结点')), false);
    equal(__.isElement("<div></div>"), false);
    equal(__.isElement(new String("<div></div>")), false);

});

QUnit.test('isError', 2, function () {

    equal(__.isError(new Error('')), true);
    equal(__.isError(Error), false);

});

QUnit.test('isFunction', 2, function () {

    equal(__.isFunction(function () { }), true);
    equal(__.isFunction("function(){}"), false);

});

QUnit.test('isNull', 3, function () {

    equal(__.isNull(new Error('')), false);
    equal(__.isNull(null), true);
    equal(__.isNull(undefined), false);

});

QUnit.test('isNumber', 5, function () {

    equal(__.isNumber('123'), false);
    equal(__.isNumber(Infinity), true);
    equal(__.isNumber(-Infinity), true);
    equal(__.isNumber(NaN), true);
    equal(__.isNumber(new Number(123)), true);

});

QUnit.test('isObject', 4, function () {

    equal(__.isObject({}), true);
    equal(__.isObject([1, 2, 3]), true);
    equal(__.isObject(function () { }), true);
    equal(__.isObject(null), false);

});
QUnit.test('isString', 3, function () {

    equal(__.isString('yelloxing'), true);
    equal(__.isString(new String('yelloxing')), true);
    equal(__.isString(1), false);

});
QUnit.test('isSymbol', 3, function () {

    equal(__.isSymbol(Symbol.iterator), true);
    equal(__.isSymbol(Symbol()), true);
    equal(__.isSymbol('abc'), false);

});
QUnit.test('isText', 2, function () {

    equal(__.isText(document.createTextNode('文本结点')), true);
    equal(__.isText(document.createElement('div')), false);

});
QUnit.test('isUndefined', 4, function () {

    equal(__.isUndefined(undefined), true);
    equal(__.isUndefined(), true);
    equal(__.isUndefined(null), false);
    equal(__.isUndefined(""), false);

});
