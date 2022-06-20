mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_point = new mapboxgl.Map({
    container: 'map-point',
    style: 'mapbox://styles/angelinejcq/cl4mtcmx3004v15ny114xztix',
    zoom:  2.5,
    minZoom: 2,
    maxZoom: 6,
    center: [115, 30],
});

map_point.on("load", function () {
  map_point.addLayer(
      {
      id: "temp_change",
      type: "circle",
      source: {
          type: "geojson",
          data: "data/asianTemp.geojson",
      },
      paint: {
          "circle-radius":
          ["interpolate", ["exponential", 3], ["zoom"],
          2, 5,
          6,15,
          ],
          "circle-color": [
          "step",
          ["get", "diff"],
          "#d0d0d0",
          -12, '#07306b',
          -5,"#c6dbef",
          0, "#fcbba1",
          2, "#e43528",
          5, "#68000d",
          ],
          "circle-opacity": 0.7,
      },
      },
      "admin-0-boundary"
  );
});
  
// Create the popup
map_point.on('click', 'temp_change', function (e) {
  var temp_1975	 = e.features[0].properties.temp_1975.toFixed(2);
  var temp_2015	 = e.features[0].properties.temp_2015.toFixed(2);
  var diff = e.features[0].properties.diff.toFixed(2);

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>1975: '+ temp_1975 +'°C</h4>'
          + '<h4>2015: '+ temp_2015 +'°C</h4>'
          +'<h2>The temperature changes <i>' + diff + '</i>°C in 40 years.</h2>')
      .addTo(map_point);
});
// Change the cursor to a pointer when the mouse is over the china_province_disaster layer.
map_point.on('mouseenter', 'temp_change', function () {
  map_point.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point.on('mouseleave', 'temp_change', function () {
  map_point.getCanvas().style.cursor = '';
});
  