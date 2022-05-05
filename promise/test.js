const main = () => {
    
    console.log(new Promise((resolve, reject) => {
            resolve(1)
        }).then(val => {
            console.log(val)
            return Promise.resolve(2)
        }).then(val => {
            console.log(val)
        })
    )
    
}

main()