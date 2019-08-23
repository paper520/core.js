QUnit.test('get', 3, function () {

    var object = { a: { b: [1, 2, 3] } };

    equal(JSON.stringify(__.get(object, 'a.b')), "[1,2,3]");
    equal(__.get(object, 'a["b"][1]'), 2);
    equal(__.get(object, 'a.c', 'default'), 'default');

});
