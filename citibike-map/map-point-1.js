mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_point = new mapboxgl.Map({
    container: 'map-point-1',
    style: 'mapbox://styles/angelinejcq/cl4bp4jn5001015qo06ps90zl',
    zoom: 10.5,
    maxZoom: 15,
    minZoom: 9,
    center: [-73.9800, 40.75]
});

map_point.on("load", function () {
  map_point.addLayer(
      {
      id: "start_station_2020",
      type: "circle",
      source: {
          type: "geojson",
          data: "data/citiGeoStart2020.geojson",
      },
      paint: {
          "circle-radius":
          ["interpolate", ["exponential", 3], ["zoom"],
          10, ["interpolate", ["linear"], ["get", "tripCount_2020"],
          0, 2,
          14000, 15],
          15, ["interpolate", ["linear"], ["get", "tripCount_2020"],
          0, 20,
          14000, 80]
          ],
          "circle-color": "#fdfcdc",
          "circle-stroke-width": 0.8,
          "circle-stroke-color": "#2d031d",
      },
      minzoom: 5,
      },
  );
});
  
// Create the popup
map_point.on('click', 'start_station_2020', function (e) {
  var stationName = e.features[0].properties.start_station_name;
  var tripCount = e.features[0].properties.tripCount_2020;

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2>' + stationName + '</h2>'
          + '<p>In September 2020, there are '  + tripCount + ' trips starting from here.</p>')
      .addTo(map_point);
});

// Change the cursor to a pointer when the mouse is over the china_province_disaster layer.
map_point.on('mouseenter', 'start_station_2020', function () {
  map_point.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point.on('mouseleave', 'start_station_2020', function () {
  map_point.getCanvas().style.cursor = '';
});