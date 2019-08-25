import isDate from '../Lang/isDate';

/**
 * 获取日期具体的各项值。
 *
 * @since Sun Aug 25 2019 GMT+0800
 * @public
 * @param {date} value
 * @param {boolean} needTrim 可选，默认false，表示是否需要对齐返回（返回会把1变成'01',而12这样的不变）
 * @returns {JSON} 返回各项值json
 */
export default function (value, needTrim) {
    return !isDate(value) ? undefined : ((
        year, month, date,
        hours, minutes, seconds,
        day
    ) => {
        if (day === 0) {
            day = 7;
        }
        return {
            year: year + "",
            month: !needTrim || month > 9 ? month + "" : ("0" + month),
            date: !needTrim || date > 9 ? date + "" : ("0" + date),

            hours: !needTrim || hours > 9 ? hours + "" : ("0" + hours),
            minutes: !needTrim || minutes > 9 ? minutes + "" : ("0" + minutes),
            seconds: !needTrim || seconds > 9 ? seconds + "" : ("0" + seconds),

            day: day + ""
        };
    })(
        // 年
        value.getFullYear(),
        // 月
        value.getMonth() - (-1),
        // 日
        value.getDate(),
        // 时
        value.getHours(),
        // 分
        value.getMinutes(),
        // 秒
        value.getSeconds(),
        // 星期
        value.getDay()
        );
};
