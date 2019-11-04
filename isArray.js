import isArraySpec from './.inside/isArraySpec';

/**
 * 判断一个值是不是数组。
 *
 * @since V0.3.1
 * @public
 * @param {*} value 需要判断类型的值
 * @param {boolean} notStrict 是否不严格检查类型（默认false，如果为true表示判断是不是一个类似数组的类型）
 * @returns {boolean} 如果是数组返回true，否则返回false
 */
export default function (value, notStrict) {
    if (notStrict) {
        return isArraySpec(value);
    }
    return Array.isArray(value);
};
