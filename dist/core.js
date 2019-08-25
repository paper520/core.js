
/*!
* @yelloxing/core.js - 🐠 A modern JavaScript utility library delivering modularity, performance, &amp; extras.
* git+https://github.com/yelloxing/core.js.git
*
* author 心叶
*
* version 0.1.0-alpha
*
* build Wed Aug 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Sun Aug 25 2019 13:04:08 GMT+0800 (GMT+08:00)
*/

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var toString = Object.prototype.toString;
  /**
   * 或者一个值的类型字符串[object type]
   *
   * @private
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }
  /**
   * 判断一个值是不是symbol。
   *
   * @since Fri Aug 23 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是symbol返回true，否则返回false
   */


  function isSymbol(value) {
    var type = _typeof(value);

    return type == 'symbol' || type == 'object' && value != null && getType(value) == '[object Symbol]';
  }
  /**
   * 判断一个值是不是Object。
   *
   * @since Fri Aug 23 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Object返回true，否则返回false
   */


  function isObject(value) {
    var type = _typeof(value);

    return value != null && (type == 'object' || type == 'function');
  }
  /**
   * 判断一个值是不是Boolean。
   *
   * @since Sat Aug 24 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Boolean返回true，否则返回false
   */


  function isBoolean(value) {
    return value === true || value === false || value !== null && _typeof(value) === 'object' && getType(value) == '[object Boolean]';
  }
  /**
   * 判断一个值是不是一个朴素的'对象'
   *
   * @private
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
   */


  function isPlainObject(value) {
    if (value === null || _typeof(value) !== 'object' || getType(value) != '[object Object]') {
      return false;
    } // 如果原型为null


    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  }
  /**
   * 判断一个值是不是结点元素。
   *
   * @since Sat Aug 24 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */


  function isElement(value) {
    return value !== null && _typeof(value) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
  }
  /**
   * 判断一个值是不是Function。
   *
   * @since Sat Aug 24 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Function返回true，否则返回false
   */


  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }

    var type = getType(value);
    return type == '[object Function]' || type == '[object AsyncFunction]' || type == '[object GeneratorFunction]' || type == '[object Proxy]';
  }
  /**
   * 判断一个值是不是Null。
   *
   * @since Sat Aug 24 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Null返回true，否则返回false
   */


  function isNull(value) {
    return value === null;
  }
  /**
   * 判断一个值是不是Number。
   *
   * @since Sat Aug 24 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Number返回true，否则返回false
   */


  function isNumber(value) {
    // 基本类型
    return typeof value === 'number' || // 对象类型
    value !== null && _typeof(value) === 'object' && getType(value) == '[object Number]';
  }
  /**
   * 判断一个值是不是String。
   *
   * @since Sat Aug 24 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */


  function isString(value) {
    var type = _typeof(value);

    return type == 'string' || type == 'object' && value != null && !Array.isArray(value) && getType(value) == '[object String]';
  }
  /**
   * 判断一个值是不是Undefined。
   *
   * @since Sat Aug 24 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Undefined返回true，否则返回false
   */


  function isUndefined(value) {
    return value === undefined;
  }
  /**
   * 判断一个值是不是文本结点。
   *
   * @since Sun Aug 25 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */


  function isText(value) {
    return value !== null && _typeof(value) === 'object' && value.nodeType === 3 && !isPlainObject(value);
  }
  /**
   * 判断一个值是不是Date。
   *
   * @since Sun Aug 25 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Date返回true，否则返回false
   */


  function isDate(value) {
    return value !== null && _typeof(value) === 'object' && getType(value) === '[object Date]';
  }

  var symbolToString = Symbol.prototype.toString;
  var INFINITY = 1 / 0;
  /**
   * 把一个值变成字符串。
   *
   * @since Sun Aug 25 2019 GMT+0800
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {string} 返回转换后的字符串
   */

  function toString$1(value) {
    // 如果value是null或者undefined，都返回""
    if (value == null) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    } // 如果是数组，就展开(多层)


    if (Array.isArray(value)) {
      var temp = [];

      for (var i = 0; i < value.length; i++) {
        // 因为元素也可能是各种类型，递归转换
        temp[i] = toString$1(value[i]);
      }

      return "[".concat(temp, "]");
    }

    if (isSymbol(value)) {
      return symbolToString ? symbolToString(value) : "";
    }

    var result = "".concat(value); // 针对数字-0特殊除了，防止变成字符串"0"

    return result === '0' && 1 / value === -INFINITY ? "-0" : result;
  }
  /**
   * 判断是不是一个对象上的属性
   *
   * @private
   * @param {Array|string} path 属性或路径
   * @param {Object} object 操作的对象
   * @returns {boolean} 如果是返回true，否则返回false
   */


  function isKey(value, object) {
    if (Array.isArray(value)) {
      return false;
    }

    var type = _typeof(value);

    if (type == 'number' || type == 'boolean' || value == null || isSymbol(value)) {
      return true;
    }

    return object !== null && value in Object(object) || /^\w*$/.test(value);
  }
  /**
   * 把字符串路径变成简单的数组
   *
   * @private
   * @param {string} value 需要解析的路径字符串
   * @returns {Array} 返回属性数组
   */


  function stringToPath(value) {
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


  function castPath(value, object) {
    if (Array.isArray(value)) {
      return value;
    }

    return isKey(value, object) ? [value] : stringToPath(value);
  }
  /**
   * 设置值的基本方法（没有进行值检查）
   *
   * @private
   * @param {Object} object 设置的对象
   * @param {string} key 需要设置的属性
   * @param {*} value 设置的值
   */


  function baseAssignValue(object, key, value) {
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
   * 比较二个值是否相等
   *
   * @since Fri Aug 23 2019 GMT+0800
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


  function eq(value, other) {
    // 主要是考虑到NaN!==NaN
    return value === other || value !== value && other !== other;
  }
  /**
   *设置对象的值
   *
   * @private
   * @param {Object} object 设置的对象
   * @param {string} key 需要设置的属性
   * @param {*} value 设置的值
   */


  function assignValue(object, key, value) {
    baseAssignValue(object, key, value);
  }

  var INFINITY$1 = 1 / 0;
  /**
   * 如果value不是字符串或者symbol，就变成字符串
   *
   * @private
   * @param {*} value 需要检查的值
   * @returns {string|symbol} 返回key
   */

  function toKey(value) {
    if (typeof value === 'string' || isSymbol(value)) {
      return value;
    }

    var result = "".concat(value);
    return result === '0' && 1 / value === -INFINITY$1 ? "-0" : result;
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


  function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
      return object;
    }

    path = castPath(path, object);
    var nested = object;

    for (var index = 0; index < path.length; index++) {
      var key = toKey(path[index]);
      var newValue = value; // 如果不是最后一个，需要一些检测

      if (index + 1 != path.length) {
        var objValue = nested[key]; // 可能有的时候，原来的对象层次不足，需要补充，这里是选择应该补充什么类型

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
   * @since Fri Aug 23 2019 GMT+0800
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


  function set(object, path, value, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined;
    return object == null ? object : baseSet(object, path, value, customizer);
  }
  /**
   * 获取一个对象属性值的基础方法，没有默认值。
   *
   * @private
   * @param {Object} object 操作的对象
   * @param {Array|string} path 属性或路径
   * @returns {*} 返回设置的结果
   */


  function baseGet(object, path) {
    // 统一把路径变成['a','b','c',...]这种
    path = castPath(path, object);
    var index = 0;

    for (; index < path.length && object !== null; index++) {
      object = object[toKey(path[index])];
    }

    return index && index === path.length ? object : undefined;
  }
  /**
   * 获取object的属性path的值。如果返回的值是undefined，
   * defaultValue就作为返回值返回。
   *
   * @since Fri Aug 23 2019 GMT+0800
   * @public
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


  function get(object, path, defaultValue) {
    var result = object === null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }
  /**
   * 获取日期具体的各项值。
   *
   * @since Sun Aug 25 2019 GMT+0800
   * @public
   * @param {date} value
   * @param {boolean} needTrim 可选，默认false，表示是否需要对齐返回（返回会把1变成'01',而12这样的不变）
   * @returns {JSON} 返回各项值json
   */


  function valueOfDate(value, needTrim) {
    return !isDate(value) ? undefined : function (year, month, date, hours, minutes, seconds, day) {
      if (day === 0) {
        day = 7;
      }

      return {
        year: year + "",
        month: !needTrim || month > 9 ? month + "" : "0" + month,
        date: !needTrim || date > 9 ? date + "" : "0" + date,
        hours: !needTrim || hours > 9 ? hours + "" : "0" + hours,
        minutes: !needTrim || minutes > 9 ? minutes + "" : "0" + minutes,
        seconds: !needTrim || seconds > 9 ? seconds + "" : "0" + seconds,
        day: day + ""
      };
    }( // 年
    value.getFullYear(), // 月
    value.getMonth() - -1, // 日
    value.getDate(), // 时
    value.getHours(), // 分
    value.getMinutes(), // 秒
    value.getSeconds(), // 星期
    value.getDay());
  } // 类型判断


  var __ = {
    isSymbol: isSymbol,
    isObject: isObject,
    isBoolean: isBoolean,
    isElement: isElement,
    isFunction: isFunction,
    isNull: isNull,
    isNumber: isNumber,
    isString: isString,
    isUndefined: isUndefined,
    isText: isText,
    isDate: isDate,
    toString: toString$1,
    set: set,
    get: get,
    eq: eq,
    valueOfDate: valueOfDate
  }; // 判断当前环境，如果不是浏览器环境

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = __;
  } // 浏览器环境下
  // 因为浏览器下挂载到window对象上
  // 为了防止覆盖，额外提供一个noConflict方法，用以在覆盖的时候恢复
  else {
      var // 保存之前的__，防止直接覆盖
      $__ = window.__;

      __.noConflict = function (deep) {
        // 如果当前的__是被最新的__覆盖的
        // 恢复之前的
        if (window.__ === __) {
          window.__ = $__;
        }

        return __;
      }; // 挂载库对象到根


      window.__ = __;
    }
})();
