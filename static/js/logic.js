//Save the API source as queryURL
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
//Perform a GET request to obtain the data from the queryURL
d3.json(queryUrl, function(data) {
    //Send the data.features object to the createFeatures function
    createFeatures(data.features)
});

function createFeatures(earthquakeData) {
    //Create a function that creates a popup with the location and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup('<h3>' + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    };

    //Run the onEachFeature function for each element in the earthquakeData
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    //Send the earthquake layer to the createMap function
    createMap(earthquakes);
};

function createMap(earthquakes) {
    //Define streetmap layer
    var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: API_KEY
    });
    //Define darkmap layer
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10", 
        accessToken: API_KEY
    })
    //Define the baseMaps object to hold the streetmap and darkmap base layers
    var baseMaps = {
        'Street Map': streetmap,
        'Dark Map': darkmap
    };
    //Create an overlayMaps object to hold the earthquake labels overlay
    var overlayMaps = {
        Earthquakes: earthquakes
    };
    //Create the map using the streetmap baselayer and the earthquakes overlay object
    var myMap = L.map('mapid',{
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });
    //Create a layer control with the baseMaps and overlayMaps objects
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap)
};

// var myMap = L.map("mapid", {
//     center: [45.52, -122.67],
//     zoom: 13
//   });
  
//   // Adding a tile layer (the background map image) to our map
//   // We use the addTo method to add objects to our map
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);