
const PENDING  = "PENDING"
const FULFILLED = "fulfilled"
const REJECT   = "REJECT"


class myPromise {
    
    /*初始化传入的function */
    constructor(initFn) {
        this.promiseState   = PENDING
        this.promiseResult  = undefined

        this.then    = this.then.bind(this)
        this.catch   = this.catch.bind(this)
        this.finally = this.finally.bind(this)
        this.all     = this.all.bind(this)
        
        initFn(this._reslove, this._reject)
    }

    then(userResolve, userReject){
        let returnPromise
        /*初始化 */
        userResolve = userResolve ? userResolve : val => {}
        userReject = userReject ? userReject : err => {}
        
        if(this.promiseState === PENDING) {
            return 
        }

        if(this.promiseState === FULFILLED) {
            return (
                returnPromise = new myPromise((resolve, reject) => {
                    let result = userResolve(this.promiseResult)
                    if(result === returnPromise) {
                        return reject(new Error("error"))
                    }
                    return resolve(result)
                })
            )
        }

        if(this.promiseState === REJECT) {
            return (
                new myPromise((resolve, reject) => {
                    try {
                        resolve(userReject(this.promiseResult))
                    } catch (error) {
                        reject(error)
                    }
                })
            )
        }

    }

    catch(userCatch){
        return (
            new myPromise((resolve, reject) => {
                try {
                    resolve(userReject(this.promiseResult))
                } catch (error) {
                    reject(error)
                }
            })
        )
    }

    finally(){

    }
    all(){

    }

    _reslove = val => {
        this.promiseState = FULFILLED
        this.promiseResult = val
    }

    _reject = err => {
        this.promiseState = REJECT
        this.promiseResult = err
    }


}

const main = () => {
    new myPromise((resolve, reject) => {
        resolve(1)
    }).then( val => {
        console.log(val);
        // return new myPromise((resolve, reject) => {
        //     resolve(2)
        // })
    })
        // }).then(val => console.log(val))
}

main()