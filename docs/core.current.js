
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
* Date:Mon Aug 26 2019 15:52:56 GMT+0800 (GMT+08:00)
*/

"use strict";function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}(function(){"use strict";var toString=Object.prototype.toString;function getType(value){if(value==null){return value===undefined?"[object Undefined]":"[object Null]"}return toString.call(value)}function isSymbol(value){var type=_typeof(value);return type=="symbol"||type=="object"&&value!=null&&getType(value)=="[object Symbol]"}function isObject(value){var type=_typeof(value);return value!=null&&(type=="object"||type=="function")}function isBoolean(value){return value===true||value===false||value!==null&&_typeof(value)==="object"&&getType(value)=="[object Boolean]"}function isPlainObject(value){if(value===null||_typeof(value)!=="object"||getType(value)!="[object Object]"){return false}if(Object.getPrototypeOf(value)===null){return true}var proto=value;while(Object.getPrototypeOf(proto)!==null){proto=Object.getPrototypeOf(proto)}return Object.getPrototypeOf(value)===proto}function isElement(value){return value!==null&&_typeof(value)==="object"&&(value.nodeType===1||value.nodeType===9||value.nodeType===11)&&!isPlainObject(value)}function isFunction(value){if(!isObject(value)){return false}var type=getType(value);return type=="[object Function]"||type=="[object AsyncFunction]"||type=="[object GeneratorFunction]"||type=="[object Proxy]"}function isNull(value){return value===null}function isNumber(value){return typeof value==="number"||value!==null&&_typeof(value)==="object"&&getType(value)=="[object Number]"}function isString(value){var type=_typeof(value);return type=="string"||type=="object"&&value!=null&&!Array.isArray(value)&&getType(value)=="[object String]"}function isUndefined(value){return value===undefined}function isText(value){return value!==null&&_typeof(value)==="object"&&value.nodeType===3&&!isPlainObject(value)}function isDate(value){return value!==null&&_typeof(value)==="object"&&getType(value)==="[object Date]"}function isNaN(value){return value!==value}var symbolToString=Symbol.prototype.toString;var INFINITY=1/0;function toString$1(value){if(value==null){return""}if(typeof value==="string"){return value}if(Array.isArray(value)){var temp=[];for(var i=0;i<value.length;i++){temp[i]=toString$1(value[i])}return"[".concat(temp,"]")}if(isSymbol(value)){return symbolToString?symbolToString(value):""}var result="".concat(value);return result==="0"&&1/value===-INFINITY?"-0":result}function isKey(value,object){if(Array.isArray(value)){return false}var type=_typeof(value);if(type=="number"||type=="boolean"||value==null||isSymbol(value)){return true}return object!==null&&value in Object(object)||/^\w*$/.test(value)}function stringToPath(value){return value.replace(/\[/g,".").replace(/\]/g,"").replace(/"/g,"").replace(/'/g,"").split(".")}function castPath(value,object){if(Array.isArray(value)){return value}return isKey(value,object)?[value]:stringToPath(value)}function baseAssignValue(object,key,value){if(key=="__proto__"){Object.defineProperty(object,key,{configurable:true,enumerable:true,value:value,writable:true})}else{object[key]=value}}function eq(value,other){return value===other||value!==value&&other!==other}function assignValue(object,key,value){baseAssignValue(object,key,value)}var INFINITY$1=1/0;function toKey(value){if(typeof value==="string"||isSymbol(value)){return value}var result="".concat(value);return result==="0"&&1/value===-INFINITY$1?"-0":result}function baseSet(object,path,value,customizer){if(!isObject(object)){return object}path=castPath(path,object);var nested=object;for(var index=0;index<path.length;index++){var key=toKey(path[index]);var newValue=value;if(index+1!=path.length){var objValue=nested[key];if(!isObject(objValue)){newValue=customizer?customizer(objValue,key,nested):undefined;if(newValue===undefined){newValue={}}}else{newValue=objValue}}assignValue(nested,key,newValue);nested=nested[key]}return object}function set(object,path,value,customizer){customizer=typeof customizer=="function"?customizer:undefined;return object==null?object:baseSet(object,path,value,customizer)}function baseGet(object,path){path=castPath(path,object);var index=0;for(;index<path.length&&object!==null;index++){object=object[toKey(path[index])]}return index&&index===path.length?object:undefined}function get(object,path,defaultValue){var result=object===null?undefined:baseGet(object,path);return result===undefined?defaultValue:result}function isLeapYear(value){if(isNumber(value)&&!isNaN(value)){return value%4===0&&(value%100!==0||value%400===0)}else{throw new Error("Invalid value!")}}var __={isSymbol:isSymbol,isObject:isObject,isBoolean:isBoolean,isElement:isElement,isFunction:isFunction,isNull:isNull,isNumber:isNumber,isString:isString,isUndefined:isUndefined,isText:isText,isDate:isDate,isNaN:isNaN,toString:toString$1,set:set,get:get,eq:eq,isLeapYear:isLeapYear};if((typeof module==="undefined"?"undefined":_typeof(module))==="object"&&_typeof(module.exports)==="object"){module.exports=__}else{var $__=window.__;__.noConflict=function(deep){if(window.__===__){window.__=$__}return __};window.__=__}})();