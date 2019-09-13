import isArrayLike from './.inside/isArrayLike';
import isString from './isString';

/**
 * 创建一个新数组，把传递的数组或值拼接起来。
 *
 * @since V0.2.2
 * @public
 * @param {*} value1 需要拼接的值1
 * @param {*} value2 需要拼接的值2
 * @param {*} value3 需要拼接的值3
 * ...
 * @returns {Array} 返回连接后的新数组。
 * @example
 *
 * concat(1, [2,3])
 * // => [1, 2, 3]
 *
 * concat([], [[1, 2], 3], false, '字符串')
 * // => [1, 2, 3, false, '字符串']
 *
 * concat()
 * // => []
 */
let concat = function (newArray, values) {
    for (let i = 0; i < values.length; i++) {
        if (isArrayLike(values[i]) &&
            // 字符串比较特殊，我们不希望别划分
            !isString(values[i])) {
            if (values[i].length > 1) {
                concat(newArray, values[i]);
            } else if (values[i].length === 1) {
                newArray.push(values[i][0]);
            }
        } else {
            newArray.push(values[i]);
        }
    }
};

export default function (...values) {

    let newArray = [];
    concat(newArray, values);

    return newArray;
}
