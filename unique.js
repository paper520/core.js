import isArraySpec from './.inside/isArraySpec';
import eq from './eq';

/**
 * 创建一个新数组，剔除重复的值。
 *
 * @since V0.2.2
 * @public
 * @param {Array} array 需要处理的数组。
 * @returns {Array} 返回新数组。
 * @example
 *
 * unique([1, 2, 3, 2])
 * // => [1, 2, 3]
 */
export default function (array) {

    if (!isArraySpec(array)) {
        return array;
    }

    if (array.length === 0) {
        return [];
    }

    if (array.length === 1) {
        return [array[0]];
    }

    let newArray = [], help = new Array(...array);
    while (help.length > 0) {
        // 第一个肯定是需要的
        newArray.push(help[0]);
        let value = help[0], j = -1;

        // 保留和第一个不一样的
        for (let i = 1; i < help.length; i++) {
            if (!eq(value, help[i])) {
                help[j + 1] = help[i];
                j += 1;
            }
        }

        // 余下的都删除了(不需要真删除，修改length即可)
        help.length = j + 1;
    }


    return newArray;
}
