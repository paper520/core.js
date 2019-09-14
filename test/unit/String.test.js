QUnit.test('split', 6, function () {

    var temp1 = __.split("abc def    g ", ' ');
    equal(temp1.length, 3);
    equal(temp1[0], 'abc');
    equal(temp1[1], 'def');
    equal(temp1[2], 'g');

    equal(__.split("").length, 0);
    equal(__.split().length, 0);

});
