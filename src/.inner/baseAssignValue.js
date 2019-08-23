/**
 * 设置值的基本方法（没有进行值检查）
 *
 * @private
 * @param {Object} object 设置的对象
 * @param {string} key 需要设置的属性
 * @param {*} value 设置的值
 */
export default function (object, key, value) {
    if (key == '__proto__') {
        Object.defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
        });
    } else {
        object[key] = value;
    }
};
