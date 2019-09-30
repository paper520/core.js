(function () {
    'use strict';

    /**
     * 在(a,b,c)方向位移d
     * @private
     */
    function _move (d, a, b, c) {
        c = c || 0;
        let sqrt = Math.sqrt(a * a + b * b + c * c);
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            a * d / sqrt, b * d / sqrt, c * d / sqrt, 1
        ];
    }

    /**
     * 围绕0Z轴旋转
     * 其它的旋转可以借助transform实现
     * 旋转角度单位采用弧度制
     * 
     * @private
     */
    function _rotate (deg) {
        let sin = Math.sin(deg),
            cos = Math.cos(deg);
        return [
            cos, sin, 0, 0,
            -sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    /**
     * 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
     * 
     * @private
     */
    function _scale (xTimes, yTimes, zTimes, cx, cy, cz) {
        cx = cx || 0; cy = cy || 0; cz = cz || 0;
        return [
            xTimes, 0, 0, 0,
            0, yTimes, 0, 0,
            0, 0, zTimes, 0,
            cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1
        ];
    }

    /**
     * 针对任意射线(a1,b1,c1)->(a2,b2,c2)
     * 计算出二个变换矩阵
     * 分别为：任意射线变成OZ轴变换矩阵 + OZ轴变回原来的射线的变换矩阵
     * 
     * @private
     */
    function _transform (a1, b1, c1, a2, b2, c2) {

        if (typeof a1 === 'number' && typeof b1 === 'number') {

            // 如果设置二个点
            // 表示二维上围绕某个点旋转
            if (typeof c1 !== 'number') {
                c1 = 0; a2 = a1; b2 = b1; c2 = 1;
            }
            // 只设置三个点(设置不足六个点都认为只设置了三个点)
            // 表示围绕从原点出发的射线旋转
            else if (typeof a2 !== 'number' || typeof b2 !== 'number' || typeof c2 !== 'number') {
                a2 = a1; b2 = b1; c2 = c1; a1 = 0; b1 = 0; c1 = 0;
            }

            if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error('It\'s not a legitimate ray!');

            let sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
                cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
                sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,

                b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
                c = c2 - c1,

                sqrt2 = Math.sqrt(b * b + c * c),
                cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
                sin2 = sqrt2 != 0 ? b / sqrt2 : 0;

            return [

                // 任意射线变成OZ轴变换矩阵
                [
                    cos1, cos2 * sin1, sin1 * sin2, 0,
                    -sin1, cos1 * cos2, cos1 * sin2, 0,
                    0, -sin2, cos2, 0,
                    b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1
                ],

                // OZ轴变回原来的射线的变换矩阵
                [
                    cos1, -sin1, 0, 0,
                    cos2 * sin1, cos2 * cos1, -sin2, 0,
                    sin1 * sin2, cos1 * sin2, cos2, 0,
                    a1, b1, c1, 1
                ]

            ];
        } else {
            throw new Error('a1 and b1 is required!');
        }
    }

    // 二个4x4矩阵相乘
    // 或矩阵和齐次坐标相乘
    let _multiply = function (matrix4, param) {
        let newParam = [];
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < param.length / 4; j++)
                newParam[j * 4 + i] =
                    matrix4[i] * param[j * 4] +
                    matrix4[i + 4] * param[j * 4 + 1] +
                    matrix4[i + 8] * param[j * 4 + 2] +
                    matrix4[i + 12] * param[j * 4 + 3];
        return newParam;
    };

    /**
     * 4x4矩阵
     * 列主序存储
     * @since V0.2.0
     * @public
     */
    function Matrix4 (initMatrix4) {

        let matrix4 = initMatrix4 || [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        let matrix4Obj = {

            // 移动
            "move": function (dis, a, b, c) {
                matrix4 = _multiply(_move(dis, a, b, c), matrix4);
                return matrix4Obj;
            },

            // 旋转
            "rotate": function (deg, a1, b1, c1, a2, b2, c2) {
                var matrix4s = _transform(a1, b1, c1, a2, b2, c2);
                matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
                return matrix4Obj;
            },

            // 缩放
            "scale": function (xTimes, yTimes, zTimes, cx, cy, cz) {
                matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
                return matrix4Obj;
            },

            // 乘法
            // 可以传入一个矩阵(matrix4,flag)
            "multiply": function (newMatrix4, flag) {
                matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
                return matrix4Obj;
            },

            // 对一个坐标应用变换
            // 齐次坐标(x,y,z,w)
            "use": function (x, y, z, w) {
                // w为0表示点位于无穷远处，忽略
                z = z || 0; w = w || 1;
                var temp = _multiply(matrix4, [x, y, z, w]);
                temp[0] = +temp[0].toFixed(7);
                temp[1] = +temp[1].toFixed(7);
                temp[2] = +temp[2].toFixed(7);
                temp[3] = +temp[3].toFixed(7);
                return temp;
            },

            // 矩阵的值
            "value": function () {
                return matrix4;
            }

        };

        return matrix4Obj;

    }

    /**
     * 初始化配置文件
     * 
     * @private
     * @param {Json} init 默认值
     * @param {Json} data
     * @return {Json}
     */
    function initConfig (init, data) {
        for (let key in data)
            try {
                init[key] = data[key];
            } catch (e) {
                throw new Error("Illegal property value！");
            }
        return init;
    }

    /**
     * Hermite三次插值
     * @since V0.2.0
     * @public
     * @param {Json} config 可选
     */
    function Hermite (config) {

        config = initConfig({
            // 张弛系数
            "u": 0.5
        }, config);

        let MR, a, b;

        /**
         * 根据x值返回y值
         * @param {Number} x
         */
        let hermite = function (x) {
            if (MR) {
                let sx = (x - a) / (b - a),
                    sx2 = sx * sx,
                    sx3 = sx * sx2;
                let sResult = sx3 * MR[0] + sx2 * MR[1] + sx * MR[2] + MR[3];
                return sResult * (b - a);
            } else throw new Error('You shoud first set the position!');
        };

        /**
         * 设置点的位置
         * @param {Number} x1 左边点的位置
         * @param {Number} y1
         * @param {Number} x2 右边点的位置
         * @param {Number} y2
         * @param {Number} s1 二个点的斜率
         * @param {Number} s2
         */
        hermite.setP = function (x1, y1, x2, y2, s1, s2) {
            if (x1 < x2) {
                // 记录原始尺寸
                a = x1; b = x2;
                let p3 = config.u * s1,
                    p4 = config.u * s2;
                // 缩放到[0,1]定义域
                y1 /= (x2 - x1);
                y2 /= (x2 - x1);
                // MR是提前计算好的多项式通解矩阵
                // 为了加速计算
                // 如上面说的
                // 统一在[0,1]上计算后再通过缩放和移动恢复
                // 避免了动态求解矩阵的麻烦
                MR = [
                    2 * y1 - 2 * y2 + p3 + p4,
                    3 * y2 - 3 * y1 - 2 * p3 - p4,
                    p3,
                    y1
                ];
            } else throw new Error('The point x-position should be increamented!');
            return hermite;
        };

        return hermite;
    }

    /**
     * 无论绘制的树结构是什么样子的
     * 计算时都假想目标树的样子如下：
     *  1.根结点在最左边，且上下居中
     *  2.树是从左往右生长的结构
     *  3.每个结点都是一块1*1的正方形，top和left分别表示正方形中心的位置
     * @since V0.2.0
     * @public
     */
    function tree (_config) {

        let config = _config || {},
            // 维护的树
            alltreedata,
            // 根结点ID
            rootid;

        /**
         * 把内部保存的树结点数据
         * 计算结束后会调用配置的绘图方法
         */
        let update = function () {

            let beforeDis = [], size = 0, maxDeep = 0;
            (function positionCalc(pNode, deep) {

                if (deep > maxDeep) maxDeep = deep;
                let flag;
                for (flag = 0; flag < pNode.children.length; flag++)
                    // 因为全部的子结点的位置确定了，父结点的y位置就是子结点的中间位置
                    // 因此有子结点的，先计算子结点
                    positionCalc(alltreedata[pNode.children[flag]], deep + 1);

                // left的位置比较简单，deep从0开始编号
                // 比如deep=0，第一层，left=0+0.5=0.5，也就是根结点
                alltreedata[pNode.id].left = deep + 0.5;
                if (flag == 0) {

                    // beforeDis是一个数组，用以记录每一层此刻top下边缘（每一层是从上到下）
                    // 比如一层的第一个，top值最小可以取top=0.5
                    // 为了方便计算，beforeDis[deep] == undefined的时候表示现在准备计算的是这层的第一个结点
                    // 因此设置最低上边缘为-0.5
                    if (beforeDis[deep] == undefined) beforeDis[deep] = -0.5;
                    // 父边缘同意的进行初始化
                    if (beforeDis[deep - 1] == undefined) beforeDis[deep - 1] = -0.5;

                    // 添加的新结点top值第一种求法：本层上边缘+1（比如上边缘是-0.5，那么top最小是top=-0.5+1=0.5）
                    alltreedata[pNode.id].top = beforeDis[deep] + 1;

                    let pTop = beforeDis[deep] + 1 + (alltreedata[pNode.pid].children.length - 1) * 0.5;
                    // 计算的原则是：如果第一种可行，选择第一种，否则必须选择第二种
                    // 判断第一种是否可行的方法就是：如果第一种计算后确定的孩子上边缘不对导致孩子和孩子的前兄弟重合就是可行的
                    if (pTop - 1 < beforeDis[deep - 1])
                        // 必须保证父亲结点和父亲的前一个兄弟保存1的距离，至少
                        // 添加的新结点top值的第二种求法：根据孩子取孩子结点的中心top
                        alltreedata[pNode.id].top = beforeDis[deep - 1] + 1 - (alltreedata[pNode.pid].children.length - 1) * 0.5;

                } else {

                    // 此刻flag!=0
                    // 意味着结点有孩子，那么问题就解决了，直接取孩子的中间即可
                    // 其实，flag==0的分支计算的就是孩子，是没有孩子的叶结点，那是关键
                    alltreedata[pNode.id].top = (alltreedata[pNode.children[0]].top + alltreedata[pNode.children[flag - 1]].top) * 0.5;
                }

                // 因为计算孩子的时候
                // 无法掌握父辈兄弟的情况
                // 可能会出现父亲和兄弟重叠问题
                if (alltreedata[pNode.id].top <= beforeDis[deep]) {
                    let needUp = beforeDis[deep] + 1 - alltreedata[pNode.id].top;
                    (function doUp(_pid, _deep) {
                        alltreedata[_pid].top += needUp;
                        if (beforeDis[_deep] < alltreedata[_pid].top) beforeDis[_deep] = alltreedata[_pid].top;
                        let _flag;
                        for (_flag = 0; _flag < alltreedata[_pid].children.length; _flag++) {
                            doUp(alltreedata[_pid].children[_flag], _deep + 1);
                        }
                    })(pNode.id, deep);
                }

                // 计算好一个结点后，需要更新此刻该层的上边缘
                beforeDis[deep] = alltreedata[pNode.id].top;

                // size在每次计算一个结点后更新，是为了最终绘图的时候知道树有多宽（此处应该叫高）
                if (alltreedata[pNode.id].top + 0.5 > size) size = alltreedata[pNode.id].top + 0.5;

            })(alltreedata[rootid], 0);

            // 传递的参数分别表示：记录了位置信息的树结点集合、根结点ID和树的宽
            return {
                "node": alltreedata,
                "root": rootid,
                "size": size,
                "deep": maxDeep + 1
            };

        };

        /**
         * 根据配置的层次关系（配置的id,child,root）把原始数据变成内部结构，方便后期位置计算
         * @param {any} initTree
         *
         * tempTree[id]={
         *  "data":原始数据,
         *  "pid":父亲ID,
         *  "id":唯一标识ID,
         *  "children":[cid1、cid2、...]
         * }
         */
        let toInnerTree = function (initTree) {

            let tempTree = {};
            // 根结点
            let temp = config.root(initTree), id, rid;
            id = rid = config.id(temp);
            tempTree[id] = {
                "data": temp,
                "pid": null,
                "id": id,
                "children": []
            };
            // 根据传递的原始数据，生成内部统一结构
            (function createTree(pdata, pid) {
                let children = config.child(pdata, initTree), flag;
                for (flag = 0; children && flag < children.length; flag++) {
                    id = config.id(children[flag]);
                    tempTree[pid].children.push(id);
                    tempTree[id] = {
                        "data": children[flag],
                        "pid": pid,
                        "id": id,
                        "children": []
                    };
                    createTree(children[flag], id);
                }
            })(temp, id);

            return [rid, tempTree];
        };

        // 可以传递任意格式的树原始数据
        // 只要配置对应的解析方法即可
        let tree = function (initTree) {

            let treeData = toInnerTree(initTree);
            alltreedata = treeData[1];
            rootid = treeData[0];
            return update();

        };

        // 获取根结点的方法:root(initTree)
        tree.root = function (rootback) {
            config.root = rootback;
            return tree;
        };

        // 获取子结点的方法:child(parentTree,initTree)
        tree.child = function (childback) {
            config.child = childback;
            return tree;
        };

        // 获取结点ID方法:id(treedata)
        tree.id = function (idback) {
            config.id = idback;
            return tree;
        };

        return tree;

    }

    // 字典表
    let dictionary = {

        // 数字
        48: [0, ')'], 49: [1, '!'], 50: [2, '@'], 51: [3, '#'], 52: [4, '$'], 53: [5, '%'], 54: [6, '^'], 55: [7, '&'], 56: [8, '*'], 57: [9, '('],

        // 字母
        65: ["a", "A"], 66: ["b", "B"], 67: ["c", "C"], 68: ["d", "D"], 69: ["e", "E"], 70: ["f", "F"], 71: ["g", "G"],
        72: ["h", "H"], 73: ["i", "I"], 74: ["j", "J"], 75: ["k", "K"], 76: ["l", "L"], 77: ["m", "M"], 78: ["n", "N"],
        79: ["o", "O"], 80: ["p", "P"], 81: ["q", "Q"], 82: ["r", "R"], 83: ["s", "S"], 84: ["t", "T"],
        85: ["u", "U"], 86: ["v", "V"], 87: ["w", "W"], 88: ["x", "X"], 89: ["y", "Y"], 90: ["z", "Z"],

        // 方向
        37: "left", 38: "up", 39: "right", 40: "down",
        33: "pre", 34: "next", 35: "bottom", 36: "top",

        // 控制键
        16: "shift", 17: "ctrl", 18: "alt", 91: "ctrl", 93: "ctrl", 9: "tab", 20: "lock", 32: "spacebar", 8: "delete", 13: "enter", 27: "esc",

        // 功能键
        112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 120: "f9", 121: "f10", 122: "f11", 123: "f12",

        // 余下键
        189: ["-", "_"], 187: ["=", "+"], 219: ["[", "{"], 221: ["]", "}"], 220: ["\\", "|"], 186: [";", ":"], 222: ["'", '"'], 188: [",", "<"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"]

    };

    // 非独立键字典
    let help_key = ["shift", "ctrl", "alt", "lock"];

    /**
     * 键盘按键
     * 返回键盘此时按下的键的组合结果
     * @since V0.2.5
     * @public
     */
    function keyString (event) {
        event = event || window.event;

        let keycode = event.keyCode || event.which;
        let key = dictionary[keycode] || keycode;
        if (!key) return;
        if (key.constructor !== Array) key = [key, key];
        let shift = event.shiftKey ? "shift+" : "",
            alt = event.altKey ? "alt+" : "",
            ctrl = event.ctrlKey ? "ctrl+" : "";

        let resultKey = "";

        if (help_key.indexOf(key[0]) >= 0 && key[0] !== 'lock') {
            key[0] = key[1] = "";
        }

        resultKey = (ctrl + shift + alt + (
            // 判断是否按下了caps lock
            (event.code == "Key" + event.key && !shift) ? key[1] : key[0])).replace(/\+$/, "") || 'ctrl';

        return resultKey;
    }

    window.__tools = {
        Matrix4,
        Hermite,
        tree,
        keyString
    };

}());
