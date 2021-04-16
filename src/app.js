const express = require('express')
const path      =    require('path')
const hbs = require('hbs')
const getgeocode = require('../src/utils/getgeocode')
const getWeatherData = require('../src/utils/getWeatherData')

//express expose a single function  called express
//to watch changes for js ,css => nodemon src/app.js -e js,hbs

//intialises the app server
const app = express()
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


//setting the view engine
app.set('view engine','hbs')
app.set('views',viewsPath)



//first express will match for express in public folder..  later indidival get till end 
app.use(express.static(path.join(__dirname,"../public")))



hbs.registerPartials(partialPath)

// console.log(__dirname);
// console.log(path.join(__dirname,"../public"));

app.get("",(req,res)=>{
    res.render('index',{
        //objects view can access
        name:"harshitha",
        title:"weather app"
    })
})

app.get("/about",(req,res)=>{
    res.render('about',{
        //objects view can access
        name:"Harshitha",
        title:"About Page"
    })
})





app.get("/help",(req,res)=>{
    res.render('help',{
        //objects view can access
        message:"THis is help message in a paragrph",
        title:"Help Page",
        name:"appu"
    })
})


//to define routes 
//request object , contains incoming request information to the server
//respose object , contains bunch of methods what we send back to the requestor 


app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide address"
        })
    }

    getgeocode(req.query.address , (error,{latitude,longitude,location }={})=>{
        if(error){
           return  res.send({error})
        }else{
            getWeatherData(latitude,longitude,(error,data)=>{
                if(error){
                    return  res.send({error})
                }
                return  res.send({
                        address:req.query.address,
                        forecast:data,
                        location:location
                })

            })
        }
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"No help article found"
    })
})



app.get("*",(req,res)=>{
    res.render("404",{
        title:"Page not found"
    })
})

//start the server up , use it single time => to listen on port 
app.listen(3000,()=>{
    console.log("server started")
})