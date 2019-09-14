
/*!
* @yelloxing/core.js - 🐠 A modern JavaScript utility library delivering modularity, performance, &amp; extras.
* git+https://github.com/yelloxing/core.js.git
*
* author 心叶
*
* version 0.2.2
*
* build Wed Aug 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Sat Sep 14 2019 12:38:03 GMT+0800 (GMT+08:00)
*/

"use strict";function isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true}catch(e){return false}}function _construct(Parent,args,Class){if(isNativeReflectConstruct()){_construct=Reflect.construct}else{_construct=function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var Constructor=Function.bind.apply(Parent,a);var instance=new Constructor;if(Class)_setPrototypeOf(instance,Class.prototype);return instance}}return _construct.apply(null,arguments)}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}}function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}(function(){"use strict";var MAX_SAFE_INTEGER=9007199254740991;function isLength(value){return typeof value=="number"&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER}function isArrayLike(value){return value!=null&&typeof value!="function"&&isLength(value.length)}var toString=Object.prototype.toString;function getType(value){if(value==null){return value===undefined?"[object Undefined]":"[object Null]"}return toString.call(value)}function isString(value){var type=_typeof(value);return type==="string"||type==="object"&&value!=null&&!Array.isArray(value)&&getType(value)==="[object String]"}function isArraySpec(value){return isArrayLike(value)&&!isString(value)}var concat=function concat(newArray,values){for(var i=0;i<values.length;i++){if(isArraySpec(values[i])){if(values[i].length>1){concat(newArray,values[i])}else if(values[i].length===1){newArray.push(values[i][0])}}else{newArray.push(values[i])}}};function concat$1(){var newArray=[];for(var _len=arguments.length,values=new Array(_len),_key=0;_key<_len;_key++){values[_key]=arguments[_key]}concat(newArray,values);return newArray}function eq(value,other){return value===other||value!==value&&other!==other}function indexOf(array,value,fromIndex){if(!isArrayLike(array)){return-1}if(!isLength(fromIndex)||fromIndex<0){fromIndex=0}for(;fromIndex<array.length;fromIndex++){if(eq(array[fromIndex],value)){return fromIndex}}return-1}function lastIndexOf(array,value,fromIndex){if(!isArrayLike(array)){return-1}if(!isLength(fromIndex)||fromIndex>array.length-1){fromIndex=array.length-1}for(;fromIndex>-1;fromIndex--){if(eq(array[fromIndex],value)){return fromIndex}}return-1}function unique(array){if(!isArraySpec(array)){return array}if(array.length===0){return[]}if(array.length===1){return[array[0]]}var newArray=[],help=_construct(Array,_toConsumableArray(array));while(help.length>0){newArray.push(help[0]);var value=help[0],j=-1;for(var i=1;i<help.length;i++){if(!eq(value,help[i])){help[j+1]=help[i];j+=1}}help.length=j+1}return newArray}function isSymbol(value){var type=_typeof(value);return type==="symbol"||type==="object"&&value!==null&&getType(value)==="[object Symbol]"}var symbolToString=Symbol.prototype.toString;var hasOwnProperty=Object.prototype.hasOwnProperty;var INFINITY=1/0;function toString$1(value){if(value==null){return""}if(typeof value==="string"){return value}if(isString(value)){return value+""}if(Array.isArray(value)){var _temp=[];for(var i=0;i<value.length;i++){_temp[i]=toString$1(value[i])}return"[".concat(_temp,"]")}if(isSymbol(value)){return symbolToString?symbolToString.call(value):""}var temp="";for(var key in value){if(hasOwnProperty.call(value,key))temp+=',"'+toString$1(key)+'":'+toString$1(value[key])}if(temp!==""){temp=temp.replace(/^,/,"");return"{"+temp+"}"}var result="".concat(value);return result==="0"&&1/value===-INFINITY?"-0":result}function isObject(value){var type=_typeof(value);return value!=null&&(type==="object"||type==="function")}function isBoolean(value){return value===true||value===false||value!==null&&_typeof(value)==="object"&&getType(value)==="[object Boolean]"}function isPlainObject(value){if(value===null||_typeof(value)!=="object"||getType(value)!="[object Object]"){return false}if(Object.getPrototypeOf(value)===null){return true}var proto=value;while(Object.getPrototypeOf(proto)!==null){proto=Object.getPrototypeOf(proto)}return Object.getPrototypeOf(value)===proto}function isElement(value){return value!==null&&_typeof(value)==="object"&&(value.nodeType===1||value.nodeType===9||value.nodeType===11)&&!isPlainObject(value)}function isText(value){return value!==null&&_typeof(value)==="object"&&value.nodeType===3&&!isPlainObject(value)}function isFunction(value){if(!isObject(value)){return false}var type=getType(value);return type==="[object Function]"||type==="[object AsyncFunction]"||type==="[object GeneratorFunction]"||type==="[object Proxy]"}function isError(value){if(value===null||_typeof(value)!=="object"){return false}var type=getType(value);return type==="[object Error]"||type==="[object DOMException]"||typeof value.message==="string"&&typeof value.name==="string"&&!isPlainObject(value)}function isNull(value){return value===null}function isNumber(value){return typeof value==="number"||value!==null&&_typeof(value)==="object"&&getType(value)==="[object Number]"}function isUndefined(value){return value===undefined}function isKey(value,object){if(Array.isArray(value)){return false}var type=_typeof(value);if(type=="number"||type=="boolean"||value==null||isSymbol(value)){return true}return object!==null&&value in Object(object)||/^\w*$/.test(value)}function stringToPath(value){return value.replace(/\[/g,".").replace(/\]/g,"").replace(/"/g,"").replace(/'/g,"").split(".")}function castPath(value,object){if(Array.isArray(value)){return value}return isKey(value,object)?[value]:stringToPath(value)}var INFINITY$1=1/0;function toKey(value){if(typeof value==="string"||isSymbol(value)){return value}var result="".concat(value);return result==="0"&&1/value===-INFINITY$1?"-0":result}function baseGet(object,path){path=castPath(path,object);var index=0;for(;index<path.length&&object!==null;index++){object=object[toKey(path[index])]}return index&&index===path.length?object:undefined}function get(object,path,defaultValue){var result=object==null?undefined:baseGet(object,path);return result===undefined?defaultValue:result}function baseAssignValue(object,key,value){if(key=="__proto__"){Object.defineProperty(object,key,{configurable:true,enumerable:true,value:value,writable:true})}else{object[key]=value}}function assignValue(object,key,value){baseAssignValue(object,key,value)}function baseSet(object,path,value,customizer){if(!isObject(object)){return object}path=castPath(path,object);var nested=object;for(var index=0;index<path.length;index++){var key=toKey(path[index]);var newValue=value;if(index+1!=path.length){var objValue=nested[key];if(!isObject(objValue)){newValue=customizer?customizer(objValue,key,nested):undefined;if(newValue===undefined){newValue={}}}else{newValue=objValue}}assignValue(nested,key,newValue);nested=nested[key]}return object}function set(object,path,value,customizer){customizer=typeof customizer==="function"?customizer:undefined;return object==null?object:baseSet(object,path,value,customizer)}var __={concat:concat$1,indexOf:indexOf,lastIndexOf:lastIndexOf,unique:unique,eq:eq,toString:toString$1,isObject:isObject,isSymbol:isSymbol,isString:isString,isBoolean:isBoolean,isElement:isElement,isText:isText,isFunction:isFunction,isError:isError,isNull:isNull,isNumber:isNumber,isUndefined:isUndefined,get:get,set:set};if((typeof module==="undefined"?"undefined":_typeof(module))==="object"&&_typeof(module.exports)==="object"){module.exports=__}else{var $__=window.__;__.noConflict=function(deep){if(window.__===__){window.__=$__}return __};window.__=__}})();