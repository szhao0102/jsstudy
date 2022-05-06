
const PENDING  = "PENDING"
const FULFILLED = "fulfilled"
const REJECT   = "REJECT"


class myPromise {
    
    /*初始化传入的function */
    constructor(initFn) {
        this.promiseState   = PENDING
        this.promiseResult  = undefined
        this.promiseThen    = undefined
        this.then    = this.then.bind(this)
        
        initFn(this._reslove, this._reject)
    }

    then(userResolve, userReject){
        let returnPromise
        /*初始化 */
        userResolve = userResolve ? userResolve : val => {}
        userReject = userReject ? userReject : err => {}
        // console.log(userResolve, 11111)
        if(this.promiseState === PENDING) {
            
            return (
                returnPromise = new myPromise((resolve, reject) => {
                    this.promiseThen = () => {
                        this.then(userResolve, userReject)
                    }
                })
            )
        }

        if(this.promiseState === FULFILLED) {
            return (
                returnPromise = new myPromise((resolve, reject) => {
                    let result = userResolve(this.promiseResult)
                    if(result === returnPromise) {
                        return reject(new Error("error"))
                    }
                    if(result instanceof myPromise) {
                        
                        if(result.promiseState !== PENDING) {
                            return result.then(resolve, reject)
                        }
                    }
                    return resolve(result)
                })
            )
        }

        if(this.promiseState === REJECT) {
            return (
                new myPromise((resolve, reject) => {

                    let result = userReject(this.promiseResult)
                    if(result === returnPromise) {
                        return reject(new Error("error"))
                    }
                    if(result instanceof myPromise) {
                        if(result.promiseState !== PENDING) {
                            return result.then(resolve, reject)
                        }
                    }
                    return reject(result)
                })
            )
        }

    }

    _reslove = val => {
        this.promiseState = FULFILLED
        this.promiseResult = val
        this.promiseThen && this.promiseThen()

    }

    _reject = err => {
        this.promiseState = REJECT
        this.promiseResult = err
        this.promiseThen && this.promiseThen()
    }


}

const main = () => {
    console.log(new myPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 1000 * 5)
    }).then( val => {
        console.log(val);
    })
    )
}

main()