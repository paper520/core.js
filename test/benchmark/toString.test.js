JSLitmus.test('toString <<<<<<<<<<<<<<<<<<<<<<<<<<<<', function () {

    __.toString([1, 2, 3, 4, 5]);

});

JSLitmus.test('toString[stringify]', function () {

    JSON.stringify([1, 2, 3, 4, 5]);

});

JSLitmus.test('toString[+""]', function () {

    [1, 2, 3, 4, 5] + ""

});
