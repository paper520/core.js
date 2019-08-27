
/*!
* @yelloxing/core.js - 🐠 A modern JavaScript utility library delivering modularity, performance, &amp; extras.
* git+https://github.com/yelloxing/core.js.git
*
* author 心叶
*
* version 0.1.0
*
* build Wed Aug 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Tue Aug 27 2019 13:15:18 GMT+0800 (GMT+08:00)
*/

"use strict";function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}(function(){"use strict";var toString=Object.prototype.toString;function getType(value){if(value==null){return value===undefined?"[object Undefined]":"[object Null]"}return toString.call(value)}function isSymbol(value){var type=_typeof(value);return type=="symbol"||type=="object"&&value!=null&&getType(value)=="[object Symbol]"}function isKey(value,object){if(Array.isArray(value)){return false}var type=_typeof(value);if(type=="number"||type=="boolean"||value==null||isSymbol(value)){return true}return object!==null&&value in Object(object)||/^\w*$/.test(value)}function stringToPath(value){return value.replace(/\[/g,".").replace(/\]/g,"").replace(/"/g,"").replace(/'/g,"").split(".")}function castPath(value,object){if(Array.isArray(value)){return value}return isKey(value,object)?[value]:stringToPath(value)}var INFINITY=1/0;function toKey(value){if(typeof value==="string"||isSymbol(value)){return value}var result="".concat(value);return result==="0"&&1/value===-INFINITY?"-0":result}function baseGet(object,path){path=castPath(path,object);var index=0;for(;index<path.length&&object!==null;index++){object=object[toKey(path[index])]}return index&&index===path.length?object:undefined}function get(object,path,defaultValue){var result=object===null?undefined:baseGet(object,path);return result===undefined?defaultValue:result}function isObject(value){var type=_typeof(value);return value!=null&&(type=="object"||type=="function")}function baseAssignValue(object,key,value){if(key=="__proto__"){Object.defineProperty(object,key,{configurable:true,enumerable:true,value:value,writable:true})}else{object[key]=value}}function assignValue(object,key,value){baseAssignValue(object,key,value)}function baseSet(object,path,value,customizer){if(!isObject(object)){return object}path=castPath(path,object);var nested=object;for(var index=0;index<path.length;index++){var key=toKey(path[index]);var newValue=value;if(index+1!=path.length){var objValue=nested[key];if(!isObject(objValue)){newValue=customizer?customizer(objValue,key,nested):undefined;if(newValue===undefined){newValue={}}}else{newValue=objValue}}assignValue(nested,key,newValue);nested=nested[key]}return object}function set(object,path,value,customizer){customizer=typeof customizer=="function"?customizer:undefined;return object==null?object:baseSet(object,path,value,customizer)}var __={get:get,set:set};if((typeof module==="undefined"?"undefined":_typeof(module))==="object"&&_typeof(module.exports)==="object"){module.exports=__}else{var $__=window.__;__.noConflict=function(deep){if(window.__===__){window.__=$__}return __};window.__=__}})();