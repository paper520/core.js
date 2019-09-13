const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * 判断是不是一个可以作为长度的整数（比如数组下标）
 *
 * @private
 * @param {any} value 需要判断的值
 * @returns {boolean} 如果是返回true，否则返回false
 */

export default function (value) {

    return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;

};
