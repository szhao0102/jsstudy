
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
        if(this.promiseState === PENDING) {
            
            return (
                returnPromise = new myPromise((resolve, reject) => {
                    this.promiseThen = () => {
                        this.then(userResolve, userReject)
                    }
                })
            )
        }
        return (
            returnPromise = new myPromise((resolve, reject) => {
                let result = this.promiseState === FULFILLED ? 
                             userResolve(this.promiseResult) :
                             userReject(this.promiseResult)

                if(result === returnPromise) {
                    return reject(new Error("error"))
                }
                
                if(result instanceof myPromise) {
                    if(result.promiseState !== PENDING) {
                        return result.then(resolve, reject)
                    }

                }

                if(result != null && (typeof result === 'object' || typeof result === 'function')) {
                    let then = result.then
                    if(typeof then === 'function') {
                        result = then.call(result)
                    }
                }

                return (
                    this.promiseState === FULFILLED ? resolve(result) : reject(result)
                ) 
            })
        )
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
    new myPromise((resolve, reject) => {
        resolve(1)
    }).then( val => {
        console.log(val);
        return {
            then: () => 111
        }
    }).then(val => console.log(val))
}

main()