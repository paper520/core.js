QUnit.test('Matrix4 旋转矩阵', 9, function () {

    var rotate2D = __tools.Matrix4().rotate(Math.PI / 2, 2, 1).use(2, 0);
    equal(rotate2D[0], 3);
    equal(rotate2D[1], 1);
    equal(rotate2D[2], 0);

    var rotateLine = __tools.Matrix4().rotate(Math.PI / 3 * 2, 1, 1, 1).use(0, 1, 0);
    equal(rotateLine[0], 0);
    equal(rotateLine[1], 0);
    equal(rotateLine[2], 1);

    var rotate3D = __tools.Matrix4().rotate(Math.PI / 3 * 4, 1, 0, 1, 2, 1, 2).use(1, 1, 1);
    equal(rotate3D[0], 2);
    equal(rotate3D[1], 0);
    equal(rotate3D[2], 1);

});

QUnit.test('Matrix4 缩放矩阵', 3, function () {

    var scale = __tools.Matrix4().scale(1, 2, 7, 3, 4, 1).use(0, 0, 1);
    equal(scale[0], 0);
    equal(scale[1], -4);
    equal(scale[2], 1);

});


QUnit.test('Matrix4 移动矩阵', 6, function () {

    var move2D = __tools.Matrix4().move(5, 3, 4).use(1, 2);
    equal(move2D[0], 4);
    equal(move2D[1], 6);
    equal(move2D[2], 0);

    var move3D = __tools.Matrix4().move(5, 3, 4, 0).use(1, 1, 1);
    equal(move3D[0], 4);
    equal(move3D[1], 5);
    equal(move3D[2], 1);

});


QUnit.test('Matrix4 多变换矩阵', 3, function () {

    var multiTransform = __tools.Matrix4().scale(0.5, 0.5, 0.5, 1, 0, 0).move(Math.sqrt(14), -1, -2, -3).rotate(Math.PI / 3 * 4, 1, 0, 1, 2, 1, 2).use(3, 6, 8);
    equal(multiTransform[0], 2);
    equal(multiTransform[1], 0);
    equal(multiTransform[2], 1);

});
