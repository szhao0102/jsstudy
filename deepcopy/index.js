const deepClone = (object,map = new WeakMap()) => {
    let newObject = {}
    let getType = Object.prototype.toString

    for (const k in object) {
        if(getType.call(object[k]) === '[object Number]' ||
           getType.call(object[k]) === '[object String]' ||
           getType.call(object[k]) === '[object Boolean]' ||
           getType.call(object[k]) === '[object Undefined]' || 
           getType.call(object[k]) === '[object Null]' ||
           getType.call(object[k]) === '[object Symbol]'||
           getType.call(object[k]) === '[object Function]') 
        {
            newObject[k] = object[k]
        }
        
        if(getType.call(object[k]) === '[object Array]') {
            let newArray = object[k].map(item => item)
            newObject[k] = newArray
        }

        if(getType.call(object[k]) === '[object Object]') {
            if(map.get(object[k])) {
                newObject[k] = map.get(object[k])
            }
            newObject[k] = deepClone(object[k])
        }

       
    }
    return newObject
}

var a  = {a:1}
a.b = a
var aa = deepClone(a)
console.log(a, aa)
console.log(a, aa)