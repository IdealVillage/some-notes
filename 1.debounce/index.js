(function () {
    var count = 1;
    var container = document.getElementById('container');

    function getUserAction(e) {
        container.innerHTML = count++;
        console.log(e);
    }

    function debounce(func, wait, immediate) {
        //result返回函数执行的结果
        var timeout, result;
        var debounced = function () {

            //修复this的指向
            var context = this;
            //传入参数，使得event对象正常
            var args = arguments;
            if (timeout) { clearTimeout(timeout); }
            if (immediate) {
                //已经执行过就不再执行
                //初始timeout为undefined，所以callnow为true
                var callnow = !timeout;
                timeout = setTimeout(() => {
                    //停止触发才能让timeout变成null，不然一直都是计时器，call为false
                    timeout = null;
                }, wait);
                if (callnow) {
                    result = func.apply(context, args);
                }
            } else {
                //每次触发事件，都会不断的创建计时器，后面的覆盖前面的，直到停止触发之后才执行函数
                timeout = setTimeout(() => {
                    func.apply(context, args);
                }, wait);
            }
            return result;
        };

        debounced.cancel = function () {
            clearTimeout(timeout);
            timeout = null;
        };

        return debounced;
    }


    function init() {
        //获取返回值
        var setUserAction = debounce(getUserAction, 10000, true);
        container.onmousemove = setUserAction;
        document.querySelector('#btn').addEventListener('click', () => {
            setUserAction.cancel();
        });
    }

    init();
})();