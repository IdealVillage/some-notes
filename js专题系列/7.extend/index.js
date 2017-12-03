//extend：合并两个或更多的对象，如果两个对象出现相同的属性，后者覆盖前者
//第一版

function extend() {
    var options,copy,name;
    var target=arguments[1];
    for(var i=1,len=arguments.length;i<len;i++){
        options=arguments[i];
        if (options!=null) {
            for(name in options){
                copy=options[name];
                if (copy!==undefined) {
                    target=copy
                }
            }
        }
    }
    return target;
}

//第二版
function extend(params) {
    var deep=false;
    var name,options,src,copy;
    var length=arguments.length;
    var i=1;
    var target=arguments[0]||{};

    if (typeof target==='boolean') {
        deep=target;
        target=arguments[i];
        i++;
    }
    //target必须是一个对象，如果不是对象就不能在这个对象上扩展
    if (typeof target!=='object'&&!isFunction(target)) {
        target={};
    }

    for(;i<length;i++){
        options=arguments[i];
        if (options!=null) {
            for(name in options){
                //目标属性值
                src=target[name];
                //待复制的值
                copy=options[name];
                //避免出现嵌套循环
                if (target===copy) {
                    continue;
                }
                //待复制类型为数组，目标属性值类型不为数组，目标属性值就设为数组
                //带复制类型为对象，目标属性不为对象，目标属性就设为对象
                var clone,copyISArr;
                if (copy&&deep&&isPlainObject(copy)||(copyISArr=Array.isArray(copy))) {
                    if (copyISArr) {
                        copyISArr=false;
                        clone=src&&Array.isArray(src)?src:[];
                    }else{
                        clone=src&&isPlainObject(src)?src:{};
                    }
                    target[name]=extend(deep,clone,copy);
                }else if(copy!==undefined){
                    target[name]=copy;
                }
            }
        }
    }
    return target;
}