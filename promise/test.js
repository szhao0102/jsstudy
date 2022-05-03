const main = () => {
    new Promise((resolve, reject) => {
        setTimeout(()=> {
            console.log(2)
            resolve(2)
        },100)
        resolve(1)
    }).then(val => {
        console.log(val)
        return Promise.reject(3)
    }).then(val => {
        console.log(val)
    }).catch(err => {
        console.log('err', err)
    })
}

main()