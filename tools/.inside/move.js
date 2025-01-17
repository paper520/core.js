/**
 * 在(a,b,c)方向位移d
 * @private
 */
export default function (d, a, b, c) {
    c = c || 0;
    let sqrt = Math.sqrt(a * a + b * b + c * c);
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        a * d / sqrt, b * d / sqrt, c * d / sqrt, 1
    ];
};
