mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_point_4 = new mapboxgl.Map({
    container: 'map-point-4',
    style: 'mapbox://styles/angelinejcq/cl4bp4jn5001015qo06ps90zl',
    zoom: 10.1,
    maxZoom: 15,
    minZoom: 9,
    center: [-74.0060, 40.75],
});

map_point_4.on("load", function () {
  map_point_4.addLayer(
      {
      id: "end_station_2021",
      type: "circle",
      source: {
          type: "geojson",
          data: "data/citiGeoEnd2021.geojson",
      },
      paint: {
          "circle-radius":5,
          "circle-color": "#0081a7",
          "circle-stroke-width": 0.8,
          "circle-stroke-color": "#2d031d",
      },
      minzoom: 5,
      },
  );
});
  
// Create the popup
map_point_4.on('click', 'end_station_2021', function (e) {
  var stationName = e.features[0].properties.end_station_name;
  var tripCount = e.features[0].properties.tripCount_2021;

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2>' + stationName + '</h2>'
          + '<p>In September 2021, there are '  + tripCount + ' trips ending from here.</p>')
      .addTo(map_point_4);
});

// Change the cursor to a pointer when the mouse is over the china_province_disaster layer.
map_point_4.on('mouseenter', 'end_station_2021', function () {
  map_point_4.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point_4.on('mouseleave', 'end_station_2021', function () {
  map_point_4.getCanvas().style.cursor = '';
});