QUnit.test('max', 2, function () {

    equal(__.max([10, 2, 19, 3, 5, 7]), 19);
    equal(__.max([10, 2, 19, 3, 5, 7], function (value, index) {
        return -1 * value;
    }), 2);

});

QUnit.test('min', 2, function () {

    equal(__.min([10, 2, 19, 3, 5, 7]), 2);
    equal(__.min([10, 2, 19, 3, 5, 7], function (value, index) {
        return -1 * value;
    }), 19);

});
