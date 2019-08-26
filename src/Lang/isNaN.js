/**
 * 判断是不是NaN。
 *
 * @since Mon Aug 26 2019 GMT+0800
 * @public
 * @param {number} value 需要判断的值
 * @returns {boolean} 如果是NaN返回true，否则返回false
 */
export default function (value) {
    return value !== value;
};
