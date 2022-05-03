
const PENDING  = Symbol('pending')
const RESOLVED = Symbol('resolved')
const REJECT   = Symbol('reject')


class myPromise {
    
    /*初始化传入的function */
    constructor(initFn) {
        this.currentState     = PENDING
        this.resolveCallbacks = []
        this.rejectCallbacks  = []

        // this._reslove = this._reslove.bind(this)
        // console.log(this)
        initFn(this._reslove, this._reject)
    }

    then(userResolve, userReject){
        if(this.currentState === PENDING) {

        }

        if(this.currentState === RESOLVED) {
            console.log('then')
            this.resolveCallbacks.push(userResolve)
        }

        if(this.currentState === REJECT) {
            this.rejectCallbacks.push(userReject)
        }

    }

    catch(){

    }

    finally(){

    }

    _reslove = val => {
        this.currentState = RESOLVED
        for(let i of this.resolveCallbacks) {
            console.log(i)
          this.resolveCallbacks[i](val)
        }
    }

    _reject = err => {
        this.currentState = REJECT
        for(let i of this.rejectCallbacks) {
          this.rejectCallbacks[i](err)
        }
    }
    


}

const main = () => {
    new myPromise((resolve, reject) => {resolve(1)}).then( val => {
        console.log(val)
    })
}

main()