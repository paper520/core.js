QUnit.test('split', 3, function () {

    deepEqual(__.split("abc def    g ", ' '), ['abc', 'def', 'g']);
    deepEqual(__.split(""), []);
    deepEqual(__.split(), []);

});
