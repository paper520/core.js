QUnit.test('toString', 4, function () {

    equal(__.toString(null), '');
    equal(__.toString(-0), '-0');
    equal(__.toString([1, 2, 3]), '[1,2,3]');
    equal(__.toString({ a: -0 }), '{"a":-0}');

});
