
//节流
const underscore = (func, waitTime) => {
    let thisStartTime = 0, lastEndTime = 0

    return (...args) => {
        thisStartTime = Date.now()
        if(thisStartTime - lastEndTime > waitTime) {
            func.apply(this, args)
            lastEndTime = Date.now()
        }
    }
}
//防抖
const debounce = (func, waitTime, immediate) => {
    let timer = 0

    const setTimer = (args) => {
        return setTimeout(()=> {
            if(!immediate) {
                func.apply(this, args)
            }
        }, waitTime)
    }

    return (...args) => {
        if(!timer && immediate) {
            func.apply(this, args)
        }
        
        timer && clearTimeout(timer)
        timer = setTimer(args)

    }
}




const f = (f1, f2) => console.log(`${f1} ${f2}`)

const main = () => {
    let df = underscore(f, 1)
    for(let i = 0; i < 50000; i++) {
        df('hello', 'world')
    }
}

main()