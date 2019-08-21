import baseGet from './.inner/baseGet';

/**
 * 获取object的属性path的值。如果返回的值是undefined，
 * defaultValue就作为返回值返回。
 *
 * @since 0.1.0
 * @param {Object} object 查询的对象
 * @param {Array|string} path 对象上查询值的路径
 * @param {*} defaultValue 如何值为undefined的时候的返回值
 * @returns {*} 返回结果
 * @example
 *
 * var object={a:{b:[1,2,3]}};
 *
 * get(object,'a.b') or
 * get(object,['a','b'])
 * // [1,2,3]
 *
 * get(object,'a["b"][1]')
 * // 2
 *
 * get(object,'a.c','default')
 * // 'default'
 */

export default function get(object, path, defaultValue) {
    var result = object === null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
};
