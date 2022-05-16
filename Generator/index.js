const gen = function *(){
    yield 1
    setTimeout(*() =>{
        yield 11
    }, 0)
    yield 2
    yield 3
    return
}
const main = () => {
    let g = gen()
    let gn = g.next(123)
    
    while(!gn.done) {
        console.log(gn)
        gn = g.next()
    }
    console.log(gn)
}

main()