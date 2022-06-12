mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_point_3 = new mapboxgl.Map({
    container: 'map-point-3',
    style: 'mapbox://styles/angelinejcq/cl4bp4jn5001015qo06ps90zl',
    zoom: 10.1,
    maxZoom: 15,
    minZoom: 9,
    center: [-73.700, 40.75],
});

map_point_3.on("load", function () {
  map_point_3.addLayer(
      {
      id: "start_station_2021",
      type: "circle",
      source: {
          type: "geojson",
          data: "data/citiGeoStart2021.geojson",
      },
      paint: {
          "circle-radius":5,
          "circle-color": "#00afb9",
          "circle-stroke-width": 0.8,
          "circle-stroke-color": "#2d031d",
      },
      minzoom: 5,
      },
  );
});
  
// Create the popup
map_point_3.on('click', 'start_station_2021', function (e) {
  var stationName = e.features[0].properties.start_station_name;
  var tripCount = e.features[0].properties.tripCount_2021;

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2>' + stationName + '</h2>'
          + '<p>In September 2021, there are '  + tripCount + ' trips starting from here.</p>')
      .addTo(map_point_3);
});

// Change the cursor to a pointer when the mouse is over the china_province_disaster layer.
map_point_3.on('mouseenter', 'start_station_2021', function () {
  map_point_3.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point_3.on('mouseleave', 'start_station_2021', function () {
  map_point.getCanvas().style.cursor = '';
});