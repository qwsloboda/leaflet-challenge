// Javascipt Order Article:  https://www.jsdiaries.com/does-javascript-function-order-matter/
// Store our API endpoint inside queryUrl
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake

  function popUpMsg(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

 // Define streetmap and darkmap layers
 var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  
// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
    center: [ 37.09, -95.71 ],
    zoom: 5,
    layers: [streetmap]     //default selected layer
    });


streetmap.addTo(myMap);

var earthquakes = new L.LayerGroup();

var overlayMaps = {
  Earthquakes: earthquakes
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(queryUrl, function(data) {

  L.geoJSON(data, {
    onEachFeature: popUpMsg
  }).addTo(earthquakes);

  // Here are some additional examples:  https://geospatialresponse.wordpress.com/2015/07/26/leaflet-geojson-pointtolayer/ 

  earthquakes.addTo(myMap);
});

L.geoJSON(geojsonFeature).addTo(map);

var geojsonFeature = {
  "type": "Feature",
  "properties": {
      "name": "Coors Field",
      "amenity": "Baseball Stadium",
      "popupContent": "This is where the Rockies play!"
  },
  "geometry": {
      "type": "Point",
      "coordinates": [-104.99404, 39.75621]
  }
};

var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

L.geoJSON(someGeojsonFeature, {
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
  }
}).addTo(map);
// Another good example is Day 3 Citibike; I slacked out a linear version of the code that does not include all the functions.
// Just like onEachFeature, there are other options that can be included, see the documentation
// https://leafletjs.com/reference-1.7.1.html#geojson-option 
// https://leafletjs.com/examples/geojson/

// Here is a common structure

// Step 1: Define Tile Layers
// Step 2.  Define Basemaps
// Step 3:  Define Leaflet map with default layers included 
// Step 4:  If there is only one tile then Add one tile with Addto(map); in L.control use null as first parameter
// Step 5:  Create a layer for each dataset that can be used as an overlay in the controls
// Step 5.  Add Overlays
// Step 6.  Add controls to L; Use null for first term if only one tile (see Step4 and this example)
//Step 7.  Load GeoJson via d3.json so that the file is loaded
	// Step 8.  Add data to map via geojson
	// Step 8a.  May include these options.. see https://leafletjs.com/reference-1.7.1.html#geojson-option
  //    pointToLayer - change from default marker - see pointToLayer example here https://leafletjs.com/examples/geojson/ especially geojsonMarkerOptions definition; this variable could also be set to the style:; look up examples via google
  //    style  - example of use in Day 2 Activity 1; but styles the marker/feature; look up examples in conjunction with pointToLayer
  //    onEachFeature - many examples mostly of popups; action that occurs when marker is clicked on the map
  //    filter - not used in activites or in the homework
// Step 8b.  addTo(layer***)     Note:  not map; choose a layer group
// Step 9.  Add layergroup to map with addTo(map)

// Pulling info from Day 3 Activity 1 Advanced

// Step 10.  Create legend
// Step 11.  Use onAdd to include legend + DomUtil.create
// Step 12.  Add legend to map with .addTo(map)

// IF there are more data to be added and it is unrelated to first data set then steps 7-9 can be mimicked.
// Always check the data to see what type of json data it is.  L.geoJson() will map whatever geometries found in a
// json or geojson file.  If it is a geometry.type of polygon then it will be an enclosed shape; if it is a Linestring then it will be multiple lines connected, etc.

