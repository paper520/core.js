JSLitmus.test('get', function () {

    __.get({
        a: {
            b: [1, 2, 3]
        }
    }, 'a["b"][1]');

});
