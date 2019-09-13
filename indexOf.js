import isArrayLike from './.inside/isArrayLike';
import isLength from './.inside/isLength';
import eq from './eq';

/**
 * 返回首次 value 在数组array中被找到的 索引值。
 *
 * @since V0.2.2
 * @public
 * @param {Array} array 需要查找的数组
 * @param {*} value 需要查找的值
 * @param {number} fromIndex 开始查询的位置，可选，默认0
 * @returns {number} 返回 值value在数组中的索引位置, 没有找到为返回-1。
 * @example
 *
 * var array=[1, 2, 3, 2]
 *
 * indexOf(array, 2)
 * // => 1
 *
 * indexOf(array, 2, 2)
 * // => 3
 *
 * indexOf(array, 12)
 * // => -1
 *
 */
export default function (array, value, fromIndex) {

    if (!isArrayLike(array)) {
        return -1;
    }

    // 如果起点传递错误或没有传递，修复为0
    if (!isLength(fromIndex) || fromIndex < 0) {
        fromIndex = 0;
    }

    for (; fromIndex < array.length; fromIndex++) {
        if (eq(array[fromIndex], value)) {
            return fromIndex;
        }
    }

    return -1;
}
