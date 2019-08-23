import castPath from './castPath';
import isObject from '../isObject';
import assignValue from './assignValue';
import toKey from './toKey';

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
export default function (object, path, value, customizer) {
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
                newValue = customizer ? customizer(objValue, key, nested) : {};
            } else {
                newValue = objValue;
            }
        }

        assignValue(nested, key, newValue);
        nested = nested[key];
    }

    return object;
};
