import getType from './.inside/getType';

/**
 * 判断一个值是不是number。
 *
 * @since V0.1.3
 * @public
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是number返回true，否则返回false
 */
export default function (value) {
    return typeof value === 'number' || (
        value !== null && typeof value === 'object' &&
        getType(value) === '[object Number]'
    );
};
