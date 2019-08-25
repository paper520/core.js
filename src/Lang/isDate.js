import getType from '../.inner/getType';

/**
 * 判断一个值是不是Date。
 *
 * @since Sun Aug 25 2019 GMT+0800
 * @public
 * @param {*} value 需要判断类型的值
 * @returns {boolean} 如果是Date返回true，否则返回false
 */
export default function (value) {
    return value !== null && typeof value === 'object' && getType(value) === '[object Date]';
};
