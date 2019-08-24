import getType from './.inner/getType';

/**
 * 判断一个值是不是Number。
 *
 * @since Sat Aug 24 2019 GMT+0800
 * @public
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Number返回true，否则返回false
 */
export default function (value) {

    // 基本类型
    return typeof value === 'number' ||
        // 对象类型
        (value !== null && typeof value === 'object' && getType(value) == '[object Number]');
};
