QUnit.test('concat', 14, function () {

    deepEqual(__.concat(1, [2, 3]), [1, 2, 3]);
    deepEqual(__.concat([], [[1, 2], 3], false, '字符串'), [1, 2, 3, false, '字符串']);
    deepEqual(__.concat(), []);
    deepEqual(__.concat([[1, 2, 3]]), [1, 2, 3]);

    // https://github.com/yelloxing/core.js/issues/6

    deepEqual(__.concat(["123"]), ["123"]);
    deepEqual(__.concat([["123"]]), ["123"]);
    deepEqual(__.concat([[["123"]]]), ["123"]);

    deepEqual(__.concat([123]), [123]);
    deepEqual(__.concat([[123]]), [123]);
    deepEqual(__.concat([[[123]]]), [123]);

    deepEqual(__.concat([123], 1), [123, 1]);
    deepEqual(__.concat([["123"]], [], [1, [[[[3], 4]]]]), ["123", 1, 3, 4]);

    deepEqual(__.concat([123], 1), [123, 1]);
    deepEqual(__.concat([[123]], [], [1, [[[[3], 4]]]]), [123, 1, 3, 4]);

});

QUnit.test('indexOf', 3, function () {

    var array = [1, 2, 3, 2]

    equal(__.indexOf(array, 2), 1);
    equal(__.indexOf(array, 2, 2), 3);
    equal(__.indexOf(array, 12), -1);

});

QUnit.test('lastIndexOf', 3, function () {

    var array = [1, 2, 3, 2]

    equal(__.lastIndexOf(array, 2), 3);
    equal(__.lastIndexOf(array, 2, 2), 1);
    equal(__.lastIndexOf(array, 12), -1);

});

QUnit.test('unique', 3, function () {

    deepEqual(__.unique([1, 2, 3, 2]), [1, 2, 3]);
    deepEqual(__.unique([]), []);
    deepEqual(__.unique([3]), [3]);

});
