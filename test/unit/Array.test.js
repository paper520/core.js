QUnit.test('concat', 11, function () {

    var temp1 = __.concat(1, [2, 3]);
    equal(temp1.length, 3);
    equal(temp1[0], 1);
    equal(temp1[1], 2);
    equal(temp1[2], 3);

    var temp2 = __.concat([], [[1, 2], 3], false, '字符串')
    equal(temp2.length, 5);
    equal(temp2[0], 1);
    equal(temp2[1], 2);
    equal(temp2[2], 3);
    equal(temp2[3], false);
    equal(temp2[4], '字符串');

    equal(__.concat().length, 0);

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

QUnit.test('unique', 7, function () {


    var temp1 = __.unique([1, 2, 3, 2])
    equal(temp1.length, 3);
    equal(temp1[0], 1);
    equal(temp1[1], 2);
    equal(temp1[2], 3);

    var temp2 = __.unique([])
    equal(temp2.length, 0);

    var temp3 = __.unique([3])
    equal(temp3.length, 1);
    equal(temp3[0], 3);

});
