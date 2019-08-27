JSLitmus.test('get <<<<<<<<<<<<<<<<<<<<<<<<<<<<', function () {

    __.get({
        a: {
            b: [1, 2, 3]
        }
    }, 'a["b"][1]');

});

JSLitmus.test('get[点的方式]', function () {

    ({
        a: {
            b: [1, 2, 3]
        }
    }).a.b[1];

});

JSLitmus.test('get[中括号的方式]', function () {

    ({
        a: {
            b: [1, 2, 3]
        }
    })['a']['b'][1];

});
