/**
 * 实现一个apply方法
 * .apply(this,[])
 */
Function.prototype.myApply = function(context, ...args) {
    const self = context || globalThis
    self.__fn__ = this
    let result = self.__fn__(args)

    return result
}

let a = {
    aa: 1
}
const showA = function(){console.log(this.aa)}

const main = () => {
    console.log(showA.myApply(a))
}



function shoB(){
    console.log(this.bb)
}

let b = {
    bb: 2,
    showB : shoB
}
b.showB()

// main()