//原始方法
function max(arr) {
    var result=arr[0];
    for(var i=1,len=arr.length;i<len;i++){
        result=Math.max(result,arr[i]);
    }
    return result;
}
//reduce
function max(pre,next) {
    return Math.max(pre,next);
}
console.log(arr.reduce(max));
//sort
arr.sort((a,b)=>{
    return a-b;
})
consol.log(arr[arr.length-1])
//apply
console.log(Math.max.apply(null,arr))
//ES6
console.log(Math.max(...arr));
