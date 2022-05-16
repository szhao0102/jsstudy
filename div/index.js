const main = ()=> {
    let x = new Event('x')
    document.getElementById("root").dispatchEvent(x)

}

document.getElementById("root").addEventListener("x", function(){
    console.log(11111)
})
function a(){
    console.log(11111)
}

document.getElementById("root").onx = function(){
    console.log(33333)
}

main()
// const main =() => {
//     const root = document.querySelector("#root")
//     let str = ''
//     console.time('start')
//     for(let i = 0; i <= 5000; i++) {
//         str += '<div class="b">'+ i +'</div>'
//     }
//     root.innerHTML = str
//     console.timeEnd('start')

//     setTimeout(()=>{
//         setInput()
//     },2000)

//     // setTimeout(()=>{
//     //     setInput2()
//     // },2000)
    


// }

// const setInput = () => {
//     const root = document.querySelector("#root")
//     // let str = ''
//     console.time('input')
//     // for(let i = 0; i <= 5000; i++) {
//     //     root.children[i].setAttribute("contenteditable", true)
//     // }
//     root.querySelectorAll('div').setAttribute("contenteditable", true)
//     // root.innerHTML = str
//     console.timeEnd('input')
// }

// const setInput2 = () => {
//     const root = document.querySelector("#root")
//     let str = ''
//     console.time('input2')
//     for(let i = 0; i <= 5000; i++) {
//         str += '<input type="text" class="b" value="' +i+ '"/>'
//     }
//     root.innerHTML = str
//     console.timeEnd('input2')
// }

// main()