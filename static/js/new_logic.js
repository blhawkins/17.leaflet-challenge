//----------General Map Creation----------
//Create map object
var myMap = L.map('mapid',{
    center: [0, 0],
    zoom: 4,
});

//Add a streetMap layer to the map
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

//Add a darkMap layer to the map
var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
});

//Add a satelliteMap layer to the map
var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });

//Create a baseMaps object to contain the three map style layers
var baseMaps = {
    'Street Map': streetMap,
    'Dark Map': darkMap,
    'Satellite Map': satelliteMap
};

//----------Tectonic Plates Overlay----------

//Use D3.json to pull in the tectonic plates geojson data
d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json', function(tectonicPlatesData) {
    //Create an object to store the geoJSON portion of the tectonicPlatesData
    var tectonicOverlay = {
        'Tectonic Plates': L.geoJSON(tectonicPlatesData)
    };
    //Create a new layer control with the baseMaps and tectonicOverlay objects
    L.control.layers(baseMaps, tectonicOverlay, {
        collapsed: false
    }).addTo(myMap)
});

//----------Earthquake Data Overlay----------

var earthquakeQueryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';
//Perform a GET request to obtain the data from the queryURL
d3.json(earthquakeQueryUrl, function(earthquakeData) {
    earthquakeFeatures = earthquakeData.features;

    //Initialize the earthquakeMarkers list
    earthquakeMarkers = []

    //Create a function that allows for markers to be colored based on earthquake depth
    function colorGradient(earthquakeDepth) {
        if (earthquakeDepth <= 10) {
            return('#AF93F8')
        }
        else if (earthquakeDepth <= 30) {
            return('#D7F512')
        }
        else if (earthquakeDepth <= 50) {
            return('#F9D719')
        }
        else if (earthquakeDepth <= 70) {
            return('#FFAD29')
        }
        else if (earthquakeDepth <= 90) {
            return('#FF9754')
        }
        else {
            return('#FF4D5B')
        }
    }
    
    function onEachFeature(feature, layer) {
        layer.bindPopup('<h3>' + feature.properties.place + "</h3><hr><h3>" + feature.properties.mag + " Magnitude</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    };

    for (var i = 0; i <earthquakeFeatures.length; i++){
        earthquakeMarkers.push(
            L.circle(earthquakeFeatures[i].geometry.coordinates.slice(1), {
                stroke: false,
                fillOpacity: 0.75,
                fillColor: colorGradient(earthquakeFeatures[i].geometry.coordinates[2]),
                radius: earthquakeFeatures[i].properties.mag*50000
            })
        )
        onEachFeature: onEachFeature
    };

    var earthquakeOverlay = {
        'Earthquakes': earthquakeMarkers
    };
    
    L.control.layers(earthquakeOverlay).addTo(myMap);
});