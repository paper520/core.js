import isSymbol from "../isSymbol";

const INFINITY = 1 / 0;

/**
 * 如果value不是字符串或者symbol，就变成字符串
 *
 * @private
 * @param {*} value 需要检查的值
 * @returns {string|symbol} 返回key
 */
export default function (value) {
    if (typeof value === 'string' || isSymbol(value)) {
        return value;
    }

    const result = `${value}`;
    return (result === '0' && (1 / value) === -INFINITY) ? "-0" : result;
};
