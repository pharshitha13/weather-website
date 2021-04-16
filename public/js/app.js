console.log("app.js loaded")
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherform   =   document.querySelector('form')
const search        =   document.querySelector('input')
const p1            =   document.querySelector('#p1')
const p2            =   document.querySelector('#p2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    p1.textContent= "loading...."
    p2.textContent= ""

    const query = search.value;
    if(query.length > 0){
        fetch('/weather?address='+query).then((response)=>{
            response.json().then((data)=>{
              if(data.error){
                    p1.textContent= data.error
              }else{
                p1.textContent= data.address
                p2.textContent= data.forecast
              }
            })
        })
    }else{
        p1.textContent= "location should be given"
    }
})