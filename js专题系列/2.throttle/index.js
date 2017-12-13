
var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
}

// //第一版
// function throttle(func,wait) {
//     var context,args;
//     var previous=0;

//     return function() {
//         var now=+new Date();
//         context=this;
//         args=arguments;
//          //判断时间间隔
//          //第一次就设置定时器
//         if (now-previous>wait) {
//             func.apply(context,arguments);
//             previous=now;
//         }  
//     };
// }

//第二版

//1.触发事件时，由于timeout的是undefined所以设置一个定时器
//2.再次触发事件时，如果定时器存在，就不执行，直到过了设置的延迟时间之后，再执行函数
//3.清空定时器，接下来就可以设置下个定时器了
// function throttle(func,wait){
//     var timeout;
//     var context,args;
    
//     return function() {
//         context=this;
//         args=arguments;
//         if(!timeout){
//             timeout=setTimeout(() => {  
//                 timeout=null;
//                 func.apply(context,args);
//             }, wait);
//         }
//     };
// }

//第三版
function throttle(func,wait) {
    var timeout,context,args;
    var previous=0;

    var later=function() {
        previous=+new Date();
        //执行完清除定时器，接下来就可以设置下个定时器了
        timeout=null;
        func.apply(context,args);
        console.log("再次执行");
    };

    var throttled=function() {
        var now=+new Date();
        var remaining=wait-(now-previous);
        context=this;
        args=arguments;
        if (remaining<=0||remaining>wait) {
            //如果有定时器就清除
            if (timeout) {
                clearTimeout(timeout);
                timeout=null;
            }
            previous=now;
            //一开始执行一次
            func.apply(context,args);
            console.log("执行");
        }else if(!timeout){
            //剩余时间结束后执行函数
            //事件停止触发后执行一次
            timeout=setTimeout(later,remaining);
        }  
    };

    throttle.cancel=function() {
        clearTimeout(timeout);
        previous=0;
        timeout=null;  
    };

    return throttled;
}
var setUserAction = throttle(getUserAction, 1000);

container.onmousemove=setUserAction;

document.querySelector('#btn').addEventListener('click',()=>{
    setUserAction.cancel();
});



