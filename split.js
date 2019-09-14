import toString from './toString';

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
export default function (str, splitStr) {
    str = toString(str);

    let resultArray = [], temp = str.split(splitStr);
    for (let i = 0; i < temp.length; i++) {
        temp[i] = temp[i].trim();
        if (temp[i] != '') {
            resultArray.push(temp[i]);
        }
    }

    return resultArray;
};
