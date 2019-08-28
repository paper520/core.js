QUnit.test('eq', 5, function () {

    var object = { 'a': 1 };
    var other = { 'a': 1 };

    equal(__.eq(object, object), true);
    equal(__.eq(object, other), false);
    equal(__.eq('a', 'a'), true);
    equal(__.eq('a', Object('a')), false);
    equal(__.eq(NaN, NaN), true);

});
