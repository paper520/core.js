import isArrayLike from './.inside/isArrayLike';
import isLength from './.inside/isLength';
import eq from './eq';

/**
 * 从右到左遍历array，返回首次 value 在数组array中被找到的 索引值。
 *
 * @since V0.2.2
 * @public
 * @param {Array} array 需要查找的数组
 * @param {*} value 需要查找的值
 * @param {number} fromIndex 开始查询的位置，可选，默认array.length-1
 * @returns {number} 返回 值value在数组中的索引位置, 没有找到为返回-1。
 * @example
 *
 * var array=[1, 2, 3, 2]
 *
 * lastIndexOf(array, 2)
 * // => 3
 *
 * lastIndexOf(array, 2, 2)
 * // => 1
 *
 * lastIndexOf(array, 12)
 * // => -1
 *
 */
export default function (array, value, fromIndex) {

    if (!isArrayLike(array)) {
        return -1;
    }

    // 如果起点传递错误或没有传递，修复为0
    if (!isLength(fromIndex) || fromIndex > array.length - 1) {
        fromIndex = array.length - 1;
    }

    for (; fromIndex > -1; fromIndex--) {
        if (eq(array[fromIndex], value)) {
            return fromIndex;
        }
    }

    return -1;
}
