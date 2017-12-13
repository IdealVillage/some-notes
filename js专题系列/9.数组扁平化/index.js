function flatten(arr) {
    var result=[];
    for(var i=0,len=arr.length;i<len;i++){
        if (Array.isArray(arr[i])) {
            result=flatten(arr[i]);
        }else{
            result.push(arr[i]);
        }
    }
    return result;
}

//toString方法
function flatten(arr) {
    return arr.split(",").map(function(item) {
        return +item;
    });
}

//reduce方法
function flatten(arr) {
    return arr.reduce(function(prev,next) {
        return prev.concat(Array.isArray(next)?flatten(next):next);        
    });
}

//扩展运算符方法
function flatten(arr) {
    while(arr.some(item=>Array.isArray(item))){
        arr=[].concat(...arr);
    }
}



//underscore的方法
function flatten(input,shallow,strict,output) {
    //便于递归调用
    output=output||[];
    var idx=output.length;

    for(var i=0,ilen=input.length;i<ilen;i++){
        var value=input[i];
        if(Array.isArray(value)){
            if (shallow) {
                var j=0,len=value.length;
                while(j<len)output[idx++]=value[j++];
            }else{
                flatten(value,shallow,strict,output);
                //递归结束时处理这个语句
                idx=output.length;
            }
        }else if(!strict){
            output[idx++]=value;
        }
    }
}

//shallow true+strict false :扁平一层
//shallow false+strict false:扁平所有层
//shallow true+strict true：去掉非数组元素
//shallow false+stric：true： 返回空数组

function unique(arr) {
    return [...new Set(arr)];
}

var union=function() {
    //去重，扁平化，跳过非数组元素
    return unique(flatten(arguments,true,true));
};

var difference=function(arr,rest) {
    rest=flatten(rest,true,true);
    return arr.filter(function(item) {
        return rest.indexOf(item)===-1;
    });
};