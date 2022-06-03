mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_point = new mapboxgl.Map({
    container: 'map-point',
    style: 'mapbox://styles/angelinejcq/cl3ugxzwa008d14rwmgpbifqy',
    zoom: 3.75,
    maxZoom: 9,
    minZoom: 3,
    center: [-95, 37.7],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: "albers",
});

map_point.on("load", function () {
  map_point.addLayer(
      {
      id: "us_counties_centroids",
      type: "circle",
      source: {
          type: "geojson",
          data: "data/countiesPoints.geojson",
      },
      paint: {
          "circle-radius":['interpolate', ['linear'], ['zoom'],
          3, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 40], 1],
          9, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 15], 5],
      ],
          "circle-color": [
          "match",
          ["get", "Winner"],
          "Donald J Trump",
          "#cf635d",
          "Joseph R Biden Jr",
          "#6193c7",
          "Other",
          "#91b66e",
          "#ffffff",
          ],
          "circle-stroke-color": "#000000",
          "circle-opacity": [
          "step",
          ["get", "WnrPerc"],
          0.3,
          0.4,
          0.5,
          0.5,
          0.7,
          0.6,
          0.9,
          ],
      },
      minzoom: 3,
      },
      "waterway-label"
  );
  map_point.addLayer(
      {
      id: "us_states_elections_outline",
      type: "line",
      source: {
          type: "geojson",
          data: "data/statesElections.geojson",
      },
      paint: {
          "line-color": "#ffffff",
          "line-width": 0.7,
      },
      },
      "us_counties_centroids"
  );
  map_point.addLayer(
      {
      id: "us_counties_elections_outline",
      type: "line",
      source: {
          type: "geojson",
          data: "data/countiesElections.geojson",
      },
      minzoom: 6,
      paint: {
          "line-color": "#ffffff",
          "line-width": 0.25,
      },
      },
      "us_states_elections_outline"
  );
});
  
// Create the popup
map_point.on('click', 'us_counties_centroids', function (e) {
  var stateName = e.features[0].properties.State;
  var countyName = e.features[0].properties.County;
  var winner = e.features[0].properties.Winner;
  var wnrPerc = e.features[0].properties.WnrPerc;
  var totalVotes = e.features[0].properties.Total;
  wnrPerc = (wnrPerc * 100).toFixed(0);
  totalVotes = totalVotes.toLocaleString();
  stateName = stateName.toUpperCase();
  countyName = countyName.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+ countyName + ' - '+stateName+'</h4>'
          +'<h2>'+winner+'</h2>'
          + '<p>'+wnrPerc+'% - ('+totalVotes+' votes)</p>')
      .addTo(map_point);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map_point.on('mouseenter', 'us_states_elections', function () {
  map_point.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point.on('mouseleave', 'us_states_elections', function () {
  map_point.getCanvas().style.cursor = '';
});