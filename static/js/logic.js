//Save the API source as queryURL
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson';
//Perform a GET request to obtain the data from the queryURL
d3.json(queryUrl, function(data) {
    //Send the data.features object to the createFeatures function
    createFeatures(data.features)
});



function createFeatures(earthquakeData) {

    //Create a function that creates a popup with the location and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup('<h3>' + feature.properties.place + "</h3><hr><h3>" + feature.properties.mag + " Magnitude</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    };
    //Run the onEachFeature function for each element in the earthquakeData
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
             return L.circle(latlng, radius = feature.properties.mag*30000);
        }
    });
    //Send the earthquake layer to the createMap function
    createMap(earthquakes);
};

function createMap(earthquakes) {
    //Define streetmap layer
    var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: 'streets-v11',
        accessToken: API_KEY
    });
    //Define darkmap layer
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10", 
        accessToken: API_KEY
    });
    //Define satellite layer
    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-v9", 
        accessToken: API_KEY
    });
    //Define the baseMaps object to hold the streetmap and darkmap base layers
    var baseMaps = {
        'Street Map': streetmap,
        'Dark Map': darkmap,
        'Satellite Map': satellitemap
    };
        //To find more map styles: https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters
    //Create an overlayMaps object to hold the earthquake labels overlay
    var overlayMaps = {
        Earthquakes: earthquakes
    };
    //Create the map using the streetmap baselayer and the earthquakes overlay object
    var myMap = L.map('mapid',{
        center: [0, 0],
        zoom: 4,
        layers: [satellitemap, earthquakes]
    });
    //Create a layer control with the baseMaps and overlayMaps objects
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap)
};

d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json', function(data) {
    //Send the data.features object to the createFeatures function
    
});