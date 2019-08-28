
/*!
* @yelloxing/core.js - 🐠 A modern JavaScript utility library delivering modularity, performance, &amp; extras.
* git+https://github.com/yelloxing/core.js.git
*
* author 心叶
*
* version 0.1.1
*
* build Wed Aug 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Wed Aug 28 2019 15:40:34 GMT+0800 (GMT+08:00)
*/

(function () {
    'use strict';

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
    function eq (value, other) {
        return value === other || (value !== value && other !== other);
    }

    const toString = Object.prototype.toString;

    /**
     * 获取一个值的类型字符串[object type]
     *
     * @private
     * @param {*} value 需要返回类型的值
     * @returns {string} 返回类型字符串
     */
    function getType (value) {
        if (value == null) {
            return value === undefined ? '[object Undefined]' : '[object Null]';
        }
        return toString.call(value);
    }

    /**
     * 判断一个值是不是symbol。
     *
     * @private
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是symbol返回true，否则返回false
     */
    function isSymbol (value) {
        const type = typeof value;
        return type == 'symbol' || (type == 'object' && value != null && getType(value) == '[object Symbol]');
    }

    /**
     * 判断一个值是不是String。
     *
     * @private
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是String返回true，否则返回false
     */
    function isString (value) {
        const type = typeof value;
        return type == 'string' || (type == 'object' && value != null && !Array.isArray(value) && getType(value) == '[object String]');
    }

    const symbolToString = Symbol.prototype.toString;
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const INFINITY = 1 / 0;

    /**
     * 把一个值变成字符串。
     *
     * @since V0.1.1
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {string} 返回转换后的字符串
     * @example
     *
     * toString(null)
     * // => ''
     *
     * toString(-0)
     * // => '-0'
     *
     * toString([1, 2, 3])
     * // => '[1,2,3]'
     */
    function toString$1(value) {

        // 如果value是null或者undefined，都返回""
        if (value == null) {
            return '';
        }

        // 如果是普通的字符串
        if (typeof value === 'string') {
            return value;
        }

        // 如果字符串对象
        if (isString(value)) {
            return value + "";
        }

        // 如果是数组，就展开(多层)
        if (Array.isArray(value)) {
            let temp = [];
            for (let i = 0; i < value.length; i++) {
                // 因为元素也可能是各种类型，递归转换
                temp[i] = toString$1(value[i]);
            }
            return `[${temp}]`;
        }

        if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
        }

        // 特殊类型外的，可迭代数据
        let temp = "";
        for (let key in value) {
            // ES并没有保护 hasOwnProperty 属性名，因此使用 Object 原型上的 hasOwnProperty 属性
            if (hasOwnProperty.call(value, key))
                temp += ",\"" + toString$1(key) + "\":" + toString$1(value[key]);
        }
        if (temp !== "") {
            temp = temp.replace(/^,/, "");
            return "{" + temp + "}";
        }

        const result = `${value}`;
        // 针对数字-0特殊除了，防止变成字符串"0"
        return (result === '0' && 1 / value === -INFINITY) ? "-0" : result;
    }

    /**
     * 判断是不是一个对象上的属性
     *
     * @private
     * @param {Array|string} path 属性或路径
     * @param {Object} object 操作的对象
     * @returns {boolean} 如果是返回true，否则返回false
     */

    function isKey (value, object) {

        if (Array.isArray(value)) {
            return false;
        }

        const type = typeof value;
        if (type == 'number' || type == 'boolean' || value == null || isSymbol(value)) {
            return true;
        }

        return (object !== null && value in Object(object)) || /^\w*$/.test(value);
    }

    /**
     * 把字符串路径变成简单的数组
     *
     * @private
     * @param {string} value 需要解析的路径字符串
     * @returns {Array} 返回属性数组
     */
    function stringToPath (value) {
        return value.replace(/\[/g, ".").replace(/\]/g, '').replace(/"/g, "").replace(/'/g, "").split('.');
    }

    /**
     * 把属性字符串统一变成数组（数组每个值是一个简单的属性）
     *
     * @private
     * @param {Array|string} path 属性或路径
     * @param {Object} object 操作的对象
     * @returns {Array} 返回属性数组
     */
    function castPath (value, object) {
        if (Array.isArray(value)) {
            return value;
        }
        return isKey(value, object) ? [value] : stringToPath(value);

    }

    const INFINITY$1 = 1 / 0;

    /**
     * 如果value不是字符串或者symbol，就变成字符串
     *
     * @private
     * @param {*} value 需要检查的值
     * @returns {string|symbol} 返回key
     */
    function toKey (value) {
        if (typeof value === 'string' || isSymbol(value)) {
            return value;
        }

        const result = `${value}`;
        return (result === '0' && (1 / value) === -INFINITY$1) ? "-0" : result;
    }

    /**
     * 获取一个对象属性值的基础方法，没有默认值。
     *
     * @private
     * @param {Object} object 操作的对象
     * @param {Array|string} path 属性或路径
     * @returns {*} 返回设置的结果
     */
    function baseGet (object, path) {

        // 统一把路径变成['a','b','c',...]这种
        path = castPath(path, object);

        let index = 0;
        for (; index < path.length && object !== null; index++) {
            object = object[toKey(path[index])];
        }

        return (index && index === path.length) ? object : undefined;
    }

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

    function get (object, path, defaultValue) {
        let result = object === null ? undefined : baseGet(object, path);
        return result === undefined ? defaultValue : result;
    }

    /**
     * 判断一个值是不是Object。
     *
     * @private
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是Object返回true，否则返回false
     */
    function isObject (value) {
        const type = typeof value;
        return value != null && (type == 'object' || type == 'function');
    }

    /**
     * 设置值的基本方法（没有进行值检查）
     *
     * @private
     * @param {Object} object 设置的对象
     * @param {string} key 需要设置的属性
     * @param {*} value 设置的值
     */
    function baseAssignValue (object, key, value) {
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
    }

    /**
     *设置对象的值
     *
     * @private
     * @param {Object} object 设置的对象
     * @param {string} key 需要设置的属性
     * @param {*} value 设置的值
     */
    function assignValue (object, key, value) {
        baseAssignValue(object, key, value);
    }

    /**
     * 设置一个对象属性值的基础方法。
     *
     * @private
     * @param {Object} object 设置的对象
     * @param {Array|string} path 对象上设置值的路径
     * @param {*} value 设置的值
     * @param {*} customizer 可选，一个函数，用于返回补充的类型（比如[],{}等）
     * @returns {Object} 返回一个对象
     */
    function baseSet (object, path, value, customizer) {
        if (!isObject(object)) {
            return object;
        }
        path = castPath(path, object);

        let nested = object;

        for (let index = 0; index < path.length; index++) {
            const key = toKey(path[index]);
            let newValue = value;

            // 如果不是最后一个，需要一些检测
            if (index + 1 != path.length) {

                const objValue = nested[key];

                // 可能有的时候，原来的对象层次不足，需要补充，这里是选择应该补充什么类型
                if (!isObject(objValue)) {

                    newValue = customizer ? customizer(objValue, key, nested) : undefined;
                    if (newValue === undefined) {
                        newValue = {};
                    }
                } else {
                    newValue = objValue;
                }
            }

            assignValue(nested, key, newValue);
            nested = nested[key];
        }

        return object;
    }

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
    function set (object, path, value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined;
        return object == null ? object : baseSet(object, path, value, customizer);
    }

    // Lang

    let __ = {

        // Lang
        eq,
        toString: toString$1,

        // Object
        get, set

    };

    // 判断当前环境，如果不是浏览器环境
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = __;
    }
    // 浏览器环境下
    // 因为浏览器下挂载到window对象上
    // 为了防止覆盖，额外提供一个noConflict方法，用以在覆盖的时候恢复
    else {
        let
            // 保存之前的__，防止直接覆盖
            $__ = window.__;

        __.noConflict = function (deep) {

            // 如果当前的__是被最新的__覆盖的
            // 恢复之前的
            if (window.__ === __) {
                window.__ = $__;
            }

            return __;

        };
        // 挂载库对象到根
        window.__ = __;
    }

}());
