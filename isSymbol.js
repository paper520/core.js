import getType from './.inside/getType';

/**
 * 判断一个值是不是symbol。
 *
 * @since V0.1.2
 * @public
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是symbol返回true，否则返回false
 */
export default function (value) {
    const type = typeof value;
    return type === 'symbol' || (type === 'object' && value !== null && getType(value) === '[object Symbol]');
};
