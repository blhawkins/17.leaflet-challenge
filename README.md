# Quakes and Plates
### Visualizing Earthquakes with Leaflet 🗺🌎


# Main Contents:
    logic.js
    index.html
    style.css

# Tools Used:
    Javascript
    Leaflet.js
    D3.js
    HTML
    CSS

# Description:

This assignment explores earthquake GeoJSON records by visualizing them using the Leaflet.js Javascript library. Inside the [logic.js](https://github.com/blhawkins/QuakesAndPlates/blob/main/Static/JS/logic.js) file, the earthquake data is called from the [USGS Earthquake Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson). Then, the data is incorporated into an interactive map object. For the challenge portion of the assignment, an additional GeoJSON file containing the [Earth's tectonic plates](https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json) was successfully imported and added as an optional overlay feature on the map. The program is supported by an HTML template ([index.html](https://github.com/blhawkins/QuakesAndPlates/blob/main/index.html)) and the cooresponding stylesheet ([style.css](https://github.com/blhawkins/QuakesAndPlates/blob/main/Static/CSS/style.css)).

### [Logic.js](https://github.com/blhawkins/QuakesAndPlates/blob/main/Static/JS/logic.js)
Components of the logic.js file include:
1. Creation of a map object with a selection of three base map styles: a street map, a dark map, and a satellite map.
2. Use of D3.json to perform an API call for earthquakes with magnitudes greater than 2.5 that occured in the previous 30 days.
3. Use of Leaflet.js functionality to create a circle marker and cooresponding tooltip for each earthquake present in the dataset.
    <ul>
    <li>The radius of each circle marker is proportional to the magnitude of the cooresponding earthquake.</li>
    <li>The color of each circle marker is representative of the depth at which the cooresponding earthquake originated. A legend was created to show the significance of the colors.</li>
    </ul>
4. Use of D3.json to import in a GeoJSON file containing the shape of the Earth's tectonic plates.
5. Use of Leaflet.js functionality to create a layer control panel whereby users can select one of the three base maps as well as toggle both the earthquake marker layer and the tectonic plate layer.

#### Screen Capures:
##### Earthquake Overlay on Street Base Map
![alt text](https://github.com/blhawkins/QuakesAndPlates/blob/main/Static/Images/Screenshots/street_earthquakes.png 'Earthquake Overlay on Street Base Map')
##### Earthquake Overlay on Dark Base Map
![alt text](https://github.com/blhawkins/QuakesAndPlates/blob/main/Static/Images/Screenshots/dark_earthquakes.png 'Earthquake Overlay on Dark Base Map')
##### Earthquake Overlay on Satellite Base Map
![alt text](https://github.com/blhawkins/QuakesAndPlates/blob/main/Static/Images/Screenshots/satellite_earthquakes.png 'Earthquake Overlay on Satellite Base Map')
##### Tectonic Plates Overlay on Satellite Base Map
![alt text](https://github.com/blhawkins/QuakesAndPlates/blob/main/Static/Images/Screenshots/satellite_plates.png 'Tectonic Plates Overlay on Satellite Base Map')
##### Earthquakes Overlay and Tectonic Plates Overlay on Satellite Base Map
![alt text](https://github.com/blhawkins/QuakesAndPlates/blob/main/Static/Images/Screenshots/satellite_earthquakes_plates.png 'Earthquakes Overlay and Tectonic Plates Overlay on Satellite Base Map')
