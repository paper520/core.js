import isNumber from '../Lang/isNumber';
import isNaN from '../Lang/isNaN';

/**
 * 判断是不是闰年。
 *
 * @since Mon Aug 26 2019 GMT+0800
 * @public
 * @param {number} value 需要判断的年份
 * @returns {boolean} 如果是闰年返回true，否则返回false
 */
export default function (value) {
    // 是数字，且不是NaN
    if (isNumber(value) && !isNaN(value)) {
        return value % 4 === 0 && (value % 100 !== 0 || value % 400 === 0);
    } else {
        throw new Error('Invalid value!');
    }
};
