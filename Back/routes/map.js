//importar libs externas
// import H from '@here/maps-api-for-javascript'



const express = require('express'); //npm i express
const H = require('here-js-api');

//O router permite separar nosso servidor em rotas
const mapRouter = express.Router();    

//libs para banco de dados
const fs = require('fs');
const path = require('path');

//Validação do token
const jwt = require('jsonwebtoken');

//Conexao com banco de dados
const bdPath = path.join(__dirname,'..','db','localidades.json');
const localidades = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

// Initialize the platform object
var platform = new H.service.Platform({
    'apikey': 'El7O8U0SD-D3gBWpF7O9aiaWQErLIqPljaEgGRXhuSE' // Ensure this is your actual API key
});


mapRouter.get('/', autenticarToken, (req, res) => {
    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.createElement('div'),
    maptypes.vector.normal.map,
    {
        zoom: 0,
        center: { lng: 13.4, lat: 52.51 }
    });

    var icon = new H.map.Icon(imageUrl, {size: {w: 50, h: 50}}); // Adjust size if necessary

    function addMarkerToMap(lat, lng) {
        var coords = {lat: lat, lng: lng};
        var marker = new H.map.Marker(coords, { icon: icon });
  
        // Add click event listener to the marker
        marker.addEventListener('tap', function(evt) {
          console.log('Pin clicked!');
          alert('Pin clicked!');
        });
  
        map.addObject(marker);
      }

    for(let local of localidades){

        addMarkerToMap(local.latitude, local.longitude);
    }

    res.status(200).send(map);
})














function autenticarToken(req,res,next){
    const authH = req.headers['authorization'];
    const token = authH && authH.split(' ')[1];
    if(token === null) return res.status(401).send('Token não encontrado');
    
    //verificando o token
    try {
        const user = jwt.verify(token, process.env.TOKEN);
        req.user = user;
        next(); //Se token é válido, avança chamando next()
    } catch (error) {
        res.status(403).send('Token inválido');
    }
   
}

module.exports = { mapRouter }