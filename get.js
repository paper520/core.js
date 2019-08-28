import baseGet from './.inside/baseGet';

/**
 * 获取object的属性path的值。如果返回的值是undefined，
 * defaultValue就作为返回值返回。
 *
 * @since V0.1.0
 * @public
 * @param {Object} object 查询的对象
 * @param {Array|string} path 对象上查询值的路径
 * @param {*} defaultValue 值为undefined的时候的返回值
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

export default function (object, path, defaultValue) {
    let result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
};
