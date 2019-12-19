window.__helps = {};

// 绑定事件
window.__helps.bind = function (dom, eventType, callback) {
    if (window.attachEvent)
        dom.attachEvent("on" + eventType, callback);
    else
        dom.addEventListener(eventType, callback, false);
};

// 阻止冒泡
window.__helps.stopPropagation = function (event) {
    event = event || window.event;
    if (event.stopPropagation) { //这是其他非IE浏览器
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
};

// 阻止默认事件
window.__helps.preventDefault = function (event) {
    event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
};
