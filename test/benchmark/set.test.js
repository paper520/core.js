JSLitmus.test('set <<<<<<<<<<<<<<<<<<<<<<<<<<<<', function () {

    __.get({
        a: {
            b: [1, 2, 3]
        }
    }, 'a["b"][1]', 10);

});

JSLitmus.test('set[点的方式]', function () {

    ({
        a: {
            b: [1, 2, 3]
        }
    }).a.b[1] = 10;

});

JSLitmus.test('set[中括号的方式]', function () {

    ({
        a: {
            b: [1, 2, 3]
        }
    })['a']['b'][1] = 10;

});
