
/*!
* @yelloxing/core.js - 🐠 A modern JavaScript utility library delivering modularity, performance, &amp; extras.
* git+https://github.com/yelloxing/core.js.git
*
* author 心叶
*
* version 0.2.6
*
* build Wed Aug 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Mon Sep 30 2019 14:30:52 GMT+0800 (GMT+08:00)
*/

"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var MAX_SAFE_INTEGER = 9007199254740991;
  /**
   * 判断是不是一个可以作为长度的整数（比如数组下标）
   *
   * @private
   * @param {any} value 需要判断的值
   * @returns {boolean} 如果是返回true，否则返回false
   */

  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  /**
   * 判断是不是一个类似数组的对象，是否可以通过length迭代
   *
   *
   * @private
   * @param {any} value 需要判断的值
   * @returns {boolean} 如果是返回true，否则返回false
   */


  function isArrayLike(value) {
    return value != null && typeof value != 'function' && isLength(value.length);
  }

  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
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
   * 判断一个值是不是String。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */


  function isString(value) {
    var type = _typeof(value);

    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
  }
  /**
   * 和isArrayLike类似，不过特别排除以下类型：
   *  1.字符串
   *
   * @private
   * @param {any} value 需要判断的值
   * @returns {boolean} 如果是返回true，否则返回false
   */


  function isArraySpec(value) {
    return isArrayLike(value) && !isString(value);
  }
  /**
   * 创建一个新数组，把传递的数组或值拼接起来。
   *
   * @since V0.2.2
   * @public
   * @param {*} value1 需要拼接的值1
   * @param {*} value2 需要拼接的值2
   * @param {*} value3 需要拼接的值3
   * ...
   * @returns {Array} 返回连接后的新数组。
   * @example
   *
   * concat(1, [2,3])
   * // => [1, 2, 3]
   *
   * concat([], [[1, 2], 3], false, '字符串')
   * // => [1, 2, 3, false, '字符串']
   *
   * concat()
   * // => []
   */


  var concat = function concat(newArray, values) {
    for (var i = 0; i < values.length; i++) {
      if (isArraySpec(values[i])) {
        if (values[i].length > 1) {
          concat(newArray, values[i]);
        } else if (values[i].length === 1) {
          newArray.push(values[i][0]);
        }
      } else {
        newArray.push(values[i]);
      }
    }
  };

  function concat$1() {
    var newArray = [];

    for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
      values[_key] = arguments[_key];
    }

    concat(newArray, values);
    return newArray;
  }
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


  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  /**
   * 返回首次 value 在数组array中被找到的 索引值。
   *
   * @since V0.2.2
   * @public
   * @param {Array} array 需要查找的数组
   * @param {*} value 需要查找的值
   * @param {number} fromIndex 开始查询的位置，可选，默认0
   * @returns {number} 返回 值value在数组中的索引位置, 没有找到为返回-1。
   * @example
   *
   * var array=[1, 2, 3, 2]
   *
   * indexOf(array, 2)
   * // => 1
   *
   * indexOf(array, 2, 2)
   * // => 3
   *
   * indexOf(array, 12)
   * // => -1
   *
   */


  function indexOf(array, value, fromIndex) {
    if (!isArrayLike(array)) {
      return -1;
    } // 如果起点传递错误或没有传递，修复为0


    if (!isLength(fromIndex) || fromIndex < 0) {
      fromIndex = 0;
    }

    for (; fromIndex < array.length; fromIndex++) {
      if (eq(array[fromIndex], value)) {
        return fromIndex;
      }
    }

    return -1;
  }
  /**
   * 从右到左遍历array，返回首次 value 在数组array中被找到的 索引值。
   *
   * @since V0.2.2
   * @public
   * @param {Array} array 需要查找的数组
   * @param {*} value 需要查找的值
   * @param {number} fromIndex 开始查询的位置，可选，默认array.length-1
   * @returns {number} 返回 值value在数组中的索引位置, 没有找到为返回-1。
   * @example
   *
   * var array=[1, 2, 3, 2]
   *
   * lastIndexOf(array, 2)
   * // => 3
   *
   * lastIndexOf(array, 2, 2)
   * // => 1
   *
   * lastIndexOf(array, 12)
   * // => -1
   *
   */


  function lastIndexOf(array, value, fromIndex) {
    if (!isArrayLike(array)) {
      return -1;
    } // 如果起点传递错误或没有传递，修复为0


    if (!isLength(fromIndex) || fromIndex > array.length - 1) {
      fromIndex = array.length - 1;
    }

    for (; fromIndex > -1; fromIndex--) {
      if (eq(array[fromIndex], value)) {
        return fromIndex;
      }
    }

    return -1;
  }
  /**
   * 创建一个新数组，剔除重复的值。
   *
   * @since V0.2.2
   * @public
   * @param {Array} array 需要处理的数组。
   * @returns {Array} 返回新数组。
   * @example
   *
   * unique([1, 2, 3, 2])
   * // => [1, 2, 3]
   */


  function unique(array) {
    if (!isArraySpec(array)) {
      return array;
    }

    if (array.length === 0) {
      return [];
    }

    if (array.length === 1) {
      return [array[0]];
    }

    var newArray = [],
        help = _construct(Array, _toConsumableArray(array));

    while (help.length > 0) {
      // 第一个肯定是需要的
      newArray.push(help[0]);
      var value = help[0],
          j = -1; // 保留和第一个不一样的

      for (var i = 1; i < help.length; i++) {
        if (!eq(value, help[i])) {
          help[j + 1] = help[i];
          j += 1;
        }
      } // 余下的都删除了(不需要真删除，修改length即可)


      help.length = j + 1;
    }

    return newArray;
  }
  /**
   * 判断一个值是不是symbol。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是symbol返回true，否则返回false
   */


  function isSymbol(value) {
    var type = _typeof(value);

    return type === 'symbol' || type === 'object' && value !== null && getType(value) === '[object Symbol]';
  }

  var symbolToString = Symbol.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var INFINITY = 1 / 0;
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
    } // 如果是普通的字符串


    if (typeof value === 'string') {
      return value;
    } // 如果字符串对象


    if (isString(value)) {
      return value + "";
    } // 如果是数组，就展开(多层)


    if (Array.isArray(value)) {
      var _temp = [];

      for (var i = 0; i < value.length; i++) {
        // 因为元素也可能是各种类型，递归转换
        _temp[i] = toString$1(value[i]);
      }

      return "[".concat(_temp, "]");
    }

    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    } // 特殊类型外的，可迭代数据


    var temp = "";

    for (var key in value) {
      // ES并没有保护 hasOwnProperty 属性名，因此使用 Object 原型上的 hasOwnProperty 属性
      if (hasOwnProperty.call(value, key)) temp += ",\"" + toString$1(key) + "\":" + toString$1(value[key]);
    }

    if (temp !== "") {
      temp = temp.replace(/^,/, "");
      return "{" + temp + "}";
    }

    var result = "".concat(value); // 针对数字-0特殊除了，防止变成字符串"0"

    return result === '0' && 1 / value === -INFINITY ? "-0" : result;
  }
  /**
   * 判断一个值是不是Object。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Object返回true，否则返回false
   */


  function isObject(value) {
    var type = _typeof(value);

    return value != null && (type === 'object' || type === 'function');
  }
  /**
   * 判断一个值是不是Boolean。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Boolean返回true，否则返回false
   */


  function isBoolean(value) {
    return value === true || value === false || value !== null && _typeof(value) === 'object' && getType(value) === '[object Boolean]';
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
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */


  function isElement(value) {
    return value !== null && _typeof(value) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
  }
  /**
   * 判断一个值是不是文本结点。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */


  function isText(value) {
    return value !== null && _typeof(value) === 'object' && value.nodeType === 3 && !isPlainObject(value);
  }
  /**
   * 判断一个值是不是Function。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Function返回true，否则返回false
   */


  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object Proxy]';
  }
  /**
   * 判断一个值是不是错误对象。
   * `Error`, `EvalError`, `RangeError`, `ReferenceError`,`SyntaxError`, `TypeError`, or `URIError`
   *
   * @since V0.1.3
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是错误对象返回true，否则返回false
   */


  function isError(value) {
    if (value === null || _typeof(value) !== 'object') {
      return false;
    }

    var type = getType(value);
    return type === '[object Error]' || type === '[object DOMException]' || typeof value.message === 'string' && typeof value.name === 'string' && !isPlainObject(value);
  }
  /**
   * 判断一个值是不是null。
   *
   * @since V0.1.3
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是null返回true，否则返回false
   */


  function isNull(value) {
    return value === null;
  }
  /**
   * 判断一个值是不是number。
   *
   * @since V0.1.3
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是number返回true，否则返回false
   */


  function isNumber(value) {
    return typeof value === 'number' || value !== null && _typeof(value) === 'object' && getType(value) === '[object Number]';
  }
  /**
   * 判断一个值是不是undefined。
   *
   * @since V0.1.3
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是undefined返回true，否则返回false
   */


  function isUndefined(value) {
    return value === undefined;
  }
  /**
   * 计算数组中的最大值（可以传递一个求值函数，可选）。
   *
   * @since V0.2.4
   * @public
   * @param {Array} array 需要遍历的数组
   * @param {Function} valback 需要查找的值
   * @returns {*} 返回最大的值。
   * @example
   *
   * max([10, 2, 19, 3, 5, 7])
   * //=> 19
   *
   * max([10, 2, 19, 3, 5, 7], function (value, index) {
   *    return -1 * value;
   * })
   * //=> 2
   */


  function max(array, valback) {
    if (!isArrayLike(array) || array.length < 1) {
      return undefined;
    }

    if (valback) {
      var maxIndex = 0,
          maxValue = valback(array[0], 0),
          temp;

      for (var index = 1; index < array.length; index++) {
        temp = valback(array[index], index);

        if (temp > maxValue) {
          maxValue = temp;
          maxIndex = index;
        }
      }

      return array[maxIndex];
    } else {
      var _maxIndex = 0;

      for (var _index = 1; _index < array.length; _index++) {
        if (array[_index] > array[_maxIndex]) {
          _maxIndex = _index;
        }
      }

      return array[_maxIndex];
    }
  }
  /**
   * 计算数组中的最小值（可以传递一个求值函数，可选）。
   *
   * @since V0.2.4
   * @public
   * @param {Array} array 需要遍历的数组
   * @param {Function} valback 需要查找的值
   * @returns {*} 返回最小的值。
   * @example
   *
   * min([10, 2, 19, 3, 5, 7])
   * //=> 2
   *
   * min([10, 2, 19, 3, 5, 7], function (value, index) {
   *    return -1 * value;
   * })
   * //=> 19
   */


  function min(array, valback) {
    if (!isArrayLike(array) || array.length < 1) {
      return undefined;
    }

    if (valback) {
      var minIndex = 0,
          minValue = valback(array[0], 0),
          temp;

      for (var index = 1; index < array.length; index++) {
        temp = valback(array[index], index);

        if (temp < minValue) {
          minValue = temp;
          minIndex = index;
        }
      }

      return array[minIndex];
    } else {
      var _minIndex = 0;

      for (var _index2 = 1; _index2 < array.length; _index2++) {
        if (array[_index2] < array[_minIndex]) {
          _minIndex = _index2;
        }
      }

      return array[_minIndex];
    }
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


  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
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


  function set(object, path, value, customizer) {
    customizer = typeof customizer === 'function' ? customizer : undefined;
    return object == null ? object : baseSet(object, path, value, customizer);
  }
  /**
   * 使用指定字符切割字符串
   *
   * @since V0.2.3
   * @public
   * @param {string} str 需要切割的字符串
   * @param {*} splitStr 分割符号
   * @returns {Object} 返回切割后的数组
   * @example
   *
   * split("abc def    g ",' ')
   * //=> ['abc','def','g']
   *
   * split("")
   * //=>[]
   *
   * split()
   * //=>[]
   *
   */


  function split(str, splitStr) {
    str = toString$1(str);
    var resultArray = [],
        temp = str.split(splitStr);

    for (var i = 0; i < temp.length; i++) {
      temp[i] = temp[i].trim();

      if (temp[i] != '') {
        resultArray.push(temp[i]);
      }
    }

    return resultArray;
  } // Array


  var __ = {
    // Array
    concat: concat$1,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    unique: unique,
    // Lang
    eq: eq,
    toString: toString$1,
    isObject: isObject,
    isSymbol: isSymbol,
    isString: isString,
    isBoolean: isBoolean,
    isElement: isElement,
    isText: isText,
    isFunction: isFunction,
    isError: isError,
    isNull: isNull,
    isNumber: isNumber,
    isUndefined: isUndefined,
    // Math
    max: max,
    min: min,
    // Object
    get: get,
    set: set,
    // String
    split: split
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
