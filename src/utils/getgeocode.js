const request = require('request')

getgeocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?limit=1&access_token=pk.eyJ1IjoicGhhcnNoaXRoYSIsImEiOiJja241c2M0djEwNzhhMnBrYmF2Z2ZkbDV3In0.N7g2ztnjPagO2syVhvXudw"
    request({url, json:true },(error,{body = {}})=>{
        if(error){
            callback("can't connect to geocoding...")
        }
        else if(body.features.length == 0){
            callback("No matching location found...")
        }
        else{
            callback(undefined , {
                latitude :body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            } )
        }
    })
}

module.exports = getgeocode