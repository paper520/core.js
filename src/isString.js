import getType from './.inner/getType';

/**
 * 判断一个值是不是String。
 *
 * @since Sat Aug 24 2019 GMT+0800
 * @public
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是String返回true，否则返回false
 */
export default function (value) {
    const type = typeof value;
    return type == 'string' || (type == 'object' && value != null && !Array.isArray(value) && getType(value) == '[object String]');
};
