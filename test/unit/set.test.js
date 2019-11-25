QUnit.test('set', 3, function () {

    var object = {
        a: {
            b: [1, 2, 3]
        }
    };

    deepEqual(__.set(object, 'a.b.c', 10), {
        "a": {
            "b": [1, 2, 3]
        }
    });

    deepEqual(__.set(object, 'a.e[g]', {
        "newValue": "-_-"
    }), {
        "a": {
            "b": [1, 2, 3],
            "e": {
                "g": {
                    "newValue": "-_-"
                }
            }
        }
    });

    deepEqual(__.set(object, 'a.2.1', '_-_', function () {
        return [];
    }), {
        "a": {
            "2": [undefined, "_-_"],
            "b": [1, 2, 3],
            "e": {
                "g": {
                    "newValue": "-_-"
                }
            }
        }
    });

});
