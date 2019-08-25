// 类型判断
import isSymbol from './Lang/isSymbol';
import isObject from './Lang/isObject';
import isBoolean from './Lang/isBoolean';
import isElement from './Lang/isElement';
import isFunction from './Lang/isFunction';
import isNull from './Lang/isNull';
import isNumber from './Lang/isNumber';
import isString from './Lang/isString';
import isUndefined from './Lang/isUndefined';
import isText from './Lang/isText';
import isDate from './Lang/isDate';

// 类型转换
import toString from './Lang/toString';

// 对象方法
import set from './Object/set';
import get from './Object/get';

// 值判断
import eq from './Lang/eq';

// 日期
import valueOfDate from './Date/valueOfDate';

let __ = {

    isSymbol, isObject, isBoolean, isElement, isFunction,
    isNull, isNumber, isString, isUndefined, isText,
    isDate,

    toString,

    set, get,

    eq,

    valueOfDate

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
