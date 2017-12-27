function findIndex(arr, predicate, context) {
    for (var i = 0; i < arr.length; i++) {
        if (predicate.call(context, arr[i], i, arr)) return i;
    }
    return -1;
}

function createIndexFinder(dir) {
    return function (arr, predicate, context) {
        var length = arr.length;
        var index = dir > 0 ? 0 : length - 1;

        for (; index >= 0 && index < length; index += dir) {
            if (predicate.call(context, arr[index], index, arr));
        }

        return -1;
    };
}

// function sortedIndex(arr,obj) {
//     var low=0,high=arr.length;

//     while (low<high) {
//         var mid=Math.floor((low+high)/2);
//         if(arr[mid]<obj)low=mid+1;
//         else high=mid;
//     }
//     return high;
// }

function cb(fn, context) {
    return function (obj) {
        return fn ? fn.call(context, obj) : obj;
    };
}

function sortedIndex(arr, obj, iteratee, context) {
    iteratee = cb(iteratee, context);

    var low = 0, high = arr.length;
    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee(arr[mid]) < obj) low = mid + 1;
        else high = mid;
    }
    return high;
}

// function createIndexOfFinder(dir) {
//     return function(arr,item) {
//         var length=arr.length;
//         var index=dir>0?0:length-1;
//         for(;index>=0&&index<length;index+=dir){
//             if(arr[index]===item)return index;
//         }
//         return -1;  
//     };
// }

function createIndexOfFinder(dir, predicate, sortedIndex) {
    return function (arr, item, idx) {
        var length = arr.length;
        var i = 0;

        if (typeof idx == 'number') {
            if (dir > 0) {
                i = idx >= 0 ? idx : Math.max(length + idx, 0);
            } else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            }
        } else if (sortedIndex && idx && length) {
            idx = sortedIndex(arr, item);
            return arr[idx] === item ? idx : -1;
        };
        if (item !== item) {
            idx = predicate(arr.slice(i, length), isNaN);
            return idx >= 0 ? idx + i : -1;
        }
        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
            if (arr[idx] === item) return idx;
        }
        return -1;
    };
}