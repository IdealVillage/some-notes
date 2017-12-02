var arr=[1,1,2,3];

// function unique(arr) {
//     var res=[];
//     for(var i=0,arrlen=arr.length;i<arrlen;i++){
//         for(var j=0;j<res.length;j++){
//             if (arr[i]===res[j]) {
//                 break;
//             }
//         }
//         if (j===reslen) {
//             res.push(arr[i]);
//         }
//     }
//     return res;
// }


//indexOf版本
// function unique(arr) {
//     var res=[];
//     for(var i=0,len=arr.length;i<len;i++){
//         var current=arr[i];
//         if (res.indexOf(current)===-1) {
//             res.push(current);
//         }
//     }
//     return res;
// }

//sort版本
// function unique(arr) {
//     var res=[];
//     var sortedArr=arr.concat().sort();
//     var seen;
//     for(var i=0,len=sortedArr.length;i<len;i++){
//         if (!i||seen!==sortedArr[i]) {
//             res.push(sortedArr[i]);
//         }
//         seen=sortedArr[i];
//     }
//     return res;
// }

//第一版
// function unique(arr,isSorted) {
//     var res=[];
//     var seen;
//     for(var i=0,len=arr.length;i<len;i++){
//         var value=arr[i];
//         if (isSorted) {
//             if (!i||seen!==value) {
//                 res.push(value);
//             }
//             seen=value;
//         }else if (res.indexOf(value)===-1) {
//             res.push(value);
//         }
//     }
//     return res;
// }

// var a=unique([1,2,3,4,1,2],true);
// console.log(a);

//第二版
// function unique(arr,isSorted,iteratee) {
//     var res=[];
//     var seen=[];

//     for (var i = 0, len = arr.length; i < len; i++){
//         var value=arr[i];
//         var computed=iteratee?iteratee(value):value;
//         //排序数组的情况
//         if (isSorted) {
//             if (!i||seen!==computed) {
//                 res.push(value);
//             }
//             seen=computed;
//         }else if(iteratee){
//             if (seen.indexOf(computed)===-1) {
//                 seen.push(computed);
//                 res.push(value);
//             }
//         }else if(res.indexOf(value)===-1){
//             res.push(value);
//         }
//     }
//     return res;
// }

// console.log(unique([1,1,'a','A',2,2],false,function(item) {
//     return typeof item==='string'?item.toLowerCase():item;
// }));

//filter
// function unique(arr) {
//     var res=arr.filter(function(item,index,arr) {
//         return arr.indexOf(item)===index;
//     });
//      return res;
// }

//排序去重
// function unique(arr) {
//     var res=arr.concat().sort().filter(function(item,index,arr) {
//         return arr.indexOf(item)===index;
//     });
//     return res;
// }

//空对象法
// function unique(arr) {
//     var obj={};
//     return arr.filter(function(item,index,arr) {
//         return obj.hasOwnerProperty(item+JSON.stringify(item))?false:(obj[item+JSON.stringify(item)]=true);
//     });
// }


//ES6
function unique(params) {
    return Array.from(new Set(arr));
    // return [...new Set(arr)];
}
