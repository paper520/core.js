"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  function set() {}
  /**
   *
   * @param {*} object
   * @param {*} path
   */


  function baseGet(object, path) {}
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


  function get(object, path, defaultValue) {
    var result = object === null ? undefined : baseGet();
    return result === undefined ? defaultValue : result;
  }

  var __ = {
    // JSON或数组的设置和获取值
    set: set,
    get: get
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
