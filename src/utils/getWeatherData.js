const request = require('request')

const getWeatherData = (lat,lang,callback)=> {
    const url  = "http://api.weatherstack.com/current?query=" + lat+","+lang + "&access_key=702e5719090543f02b6390c6964934c3";
    request(    {url , json:true},(error, { body = {} })=>{
        if(error){
            callback("can't connect to weather stack...")
        }else if(body.error){
            callback("unable to find location ...")
        }
        else{
            const current =    body.current;
            const descprition = current.weather_descriptions;
            descprition.forEach(desc => {
                console.log("Wheather Descrpition "+desc);
            });
            callback(undefined , " This is the current  "+ current.temperature +" degree . It feels like "+current.feelslike+" degree out.")
        }
    })
}   

module.exports = getWeatherData