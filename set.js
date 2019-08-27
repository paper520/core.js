import baseSet from './.inside/baseSet';

/**
 * 设置object的属性path的新值，返回设置后的对象。
 *
 * @since V0.1.0
 * @public
 * @param {Object} object 设置的对象
 * @param {Array|string} path 对象上设置值的路径
 * @param {*} value 设置的值
 * @param {*} customizer 可选，一个函数，用于返回补充的类型（比如[],{}等）
 * @returns {Object} 返回一个对象
 * @example
 *
 * var object={a:{b:[1,2,3]}};
 *
 * set(object,'a.b.c',10)
 * // {a:{b:[1,2,3]}}
 */
export default function (object, path, value, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined;
    return object == null ? object : baseSet(object, path, value, customizer);
};
