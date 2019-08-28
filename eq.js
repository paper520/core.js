/**
 * 比较二个值是否相等
 *
 * @since V0.1.1
 * @public
 * @param {*} value 需要比较的值1
 * @param {*} other 需要比较的值2
 * @returns {boolean} 如果相等返回true，否则返回false
 * @example
 *
 * const object = { 'a': 1 }
 * const other = { 'a': 1 }
 *
 * eq(object, object)
 * // => true
 *
 * eq(object, other)
 * // => false
 *
 * eq('a', 'a')
 * // => true
 *
 * eq('a', Object('a'))
 * // => false
 *
 * eq(NaN, NaN)
 * // => true
 */
export default function (value, other) {
    return value === other || (value !== value && other !== other);
}
