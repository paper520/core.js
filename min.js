import isArrayLike from './.inside/isArrayLike';

/**
 * 计算数组中的最小值（可以传递一个求值函数，可选）。
 *
 * @since V0.2.4
 * @public
 * @param {Array} array 需要遍历的数组
 * @param {Function} valback 需要查找的值
 * @returns {*} 返回最小的值。
 * @example
 *
 * min([10, 2, 19, 3, 5, 7])
 * //=> 2
 *
 * min([10, 2, 19, 3, 5, 7], function (value, index) {
 *    return -1 * value;
 * })
 * //=> 19
 */
export default function (array, valback) {

    if (!isArrayLike(array) || array.length < 1) {
        return undefined;
    }

    if (valback) {
        let minIndex = 0, minValue = valback(array[0], 0), temp;
        for (let index = 1; index < array.length; index++) {
            temp = valback(array[index], index);
            if (temp < minValue) {
                minValue = temp;
                minIndex = index;
            }
        }
        return array[minIndex];
    } else {
        let minIndex = 0;
        for (let index = 1; index < array.length; index++) {
            if (array[index] < array[minIndex]) {
                minIndex = index;
            }
        }
        return array[minIndex];
    }

}
