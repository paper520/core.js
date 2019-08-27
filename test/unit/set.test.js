QUnit.test('set', 3, function () {

    var object = { a: { b: [1, 2, 3] } };

    __.set(object, 'a.b.c', 10)
    equal(JSON.stringify(object), "{\"a\":{\"b\":[1,2,3]}}");

    __.set(object, 'a.e[g]', {
        "newValue": "-_-"
    });
    equal(JSON.stringify(object), "{\"a\":{\"b\":[1,2,3],\"e\":{\"g\":{\"newValue\":\"-_-\"}}}}");

    __.set(object, 'a.2.1', '_-_', function () {
        return [];
    });

    equal(JSON.stringify(object), "{\"a\":{\"2\":[null,\"_-_\"],\"b\":[1,2,3],\"e\":{\"g\":{\"newValue\":\"-_-\"}}}}");

});
