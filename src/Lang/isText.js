import isPlainObject from '../.inner/isPlainObject';

/**
 * 判断一个值是不是文本结点。
 *
 * @since Sun Aug 25 2019 GMT+0800
 * @public
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是结点元素返回true，否则返回false
 */
export default function (value) {
    return value !== null && typeof value === 'object' &&
        value.nodeType === 3 && !isPlainObject(value);
};
