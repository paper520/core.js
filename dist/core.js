
/*!
* @yelloxing/core.js - 🐠 A modern JavaScript utility library delivering modularity, performance, &amp; extras.
* git+https://github.com/yelloxing/core.js.git
*
* author 心叶
*
* version 0.1.1-alpha
*
* build Wed Aug 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Mon Aug 26 2019 18:01:23 GMT+0800 (GMT+08:00)
*/

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var __ = {}; // 判断当前环境，如果不是浏览器环境

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
