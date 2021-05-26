p = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('tetetetete')
    }, 123)
})


async function main(){
    var test = await p
    console.log(test);
}


main()