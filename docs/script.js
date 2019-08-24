var menus = [], bigMenus = [];

// 调整滚动位置
function adjustScroll() {
    window.setTimeout(function () {
        document.getElementById('content').scrollTop -= 90;
    }, 100);
};

// 控制菜单打开或关闭
function togger(target) {
    if (target.getAttribute('class') == 'close') {
        target.setAttribute('class', 'open');
    } else {
        target.setAttribute('class', 'close');
    }
}

// 跳转
function toItem(target) {
    window.location.href = "#" + target;
    adjustScroll();
}

// 菜单查询
function doSearch(value) {
    var i;

    for (i = 0; i < bigMenus.length; i++) {
        bigMenus[i].setAttribute('class', 'hidden');
    }

    for (i = 0; i < menus.length; i++) {
        if (new RegExp(value).test(menus[i].innerText)) {
            menus[i].style.display = 'block';
            menus[i].parentNode.parentNode.setAttribute('class', 'show');
        } else {
            menus[i].style.display = 'none';
        }
    }
}

// 初始化菜单管理结点
function initMenus() {
    menus = document.getElementById('menu').getElementsByTagName('li');
    bigMenus = document.getElementsByName('menu-frame');
}
