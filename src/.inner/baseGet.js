import castPath from './castPath';
import toKey from './toKey';

/**
 * 获取一个对象属性值的基础方法，没有默认值。
 *
 * @private
 * @param {Object} object 操作的对象
 * @param {Array|string} path 属性或路径
 * @returns {*} 返回设置的结果
 */
export default function (object, path) {

    // 统一把路径变成['a','b','c',...]这种
    path = castPath(path, object);

    let index = 0;
    for (; index < path.length && object !== null; index++) {
        object = object[toKey(path[index])];
    }

    return (index && index === path.length) ? object : undefined;
};
