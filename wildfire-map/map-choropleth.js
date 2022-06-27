mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_choropleth = new mapboxgl.Map({
    container: 'map-choropleth',
    style: 'mapbox://styles/angelinejcq/cl4wta4g1001714jqt4p4k1yg',
    zoom: 3.5,
    maxZoom: 9,
    minZoom: 3,
    center: [-95, 37.7],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: "albers",
});

map_choropleth.on("load", function () {
  map_choropleth.addLayer({
    id: "us_states_wildfire_outline",
    type: "line",
    source: {
      type: "geojson",
      data: "data/statesWildfire.geojson",
    },
    maxzoom: 4,
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.7,
    },
  },"waterway-label");

  map_choropleth.addLayer({
    id: "us_states_wildfire",
    type: "fill",
    source: {
      type: "geojson",
      data: "data/statesWildfire.geojson",
    },
    maxzoom: 4,
    paint: {
      "fill-color": [
        "match",
        ["get", "naturalBreaks"],
        "3 - 75", "#ffd29d",
        "75 - 181", "#fbba72",
        "181 - 331", "#ca5310",
        "331 - 568","#bb4d00",
        "568 - 870","#8f250c",
        "870 - 1893","#691e06",
        "#ffffff",
      ],
      "fill-outline-color": "#ffffff",
    },
  }, "us_states_wildfire_outline");

  map_choropleth.addLayer(
    {
      id: "us_counties_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/countiesWildfire.geojson",
      },
      minzoom: 4,
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.5,
      },
    },
    "waterway-label"
  );
  map_choropleth.addLayer(
    {
      id: "us_counties_wildfire",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countiesWildfire.geojson",
      },
      minzoom: 4,
      paint: {
        "fill-color": [
          "match",
          ["get", "naturalBreaks"],
          "0 - 63", "#ffd29d",
          "63 - 171","#fbba72",
          "171 - 320","#ffba08",
          "320 - 539","#faa307",
          "539 - 902","#f48c06",
          "902 - 1433","#e85d04",
          "1433 - 2242","#bb4d00",
          "2242 - 3809","#8f250c",
          "3809 - 7167","#691e06",
          "#ffffff",
        ],
      },
    },
    "us_states_wildfire_outline"
  );
// Create the popup
map_choropleth.on('click', 'us_states_wildfire', function (e) {
  var stateName = e.features[0].properties.NAME;
  var whp = e.features[0].properties['Mean WHP'].toFixed(2);
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+stateName+'</h4>'
          +'<h2>'+whp+'</h2>')
      .addTo(map_choropleth);
});
// Change the cursor to a pointer when the mouse is over the us_states_wildfire layer.
map_choropleth.on('mouseenter', 'us_states_wildfire', function () {
  map_choropleth.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map_choropleth.on('mouseleave', 'us_states_wildfire', function () {
  map_choropleth.getCanvas().style.cursor = '';
});

map_choropleth.on('click', 'us_counties_wildfire', function (e) {
  var stateName = e.features[0].properties.STATE_NAME;
  var countyName = e.features[0].properties.NAME_x;
  var whp = e.features[0].properties['Mean WHP'].toFixed(2);
  var p_state = e.features[0].properties['Mean WHP percentile within state'];
  p_state = (p_state * 100).toFixed(0);
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + countyName + ' - ' + stateName + '</h4>'
          + '<h2>' + whp + '</h2>'
          + '<p>Percentile within states: ' + p_state + '% </p>')
      .addTo(map_choropleth);
});
map_choropleth.on('mouseenter', 'us_counties_wildfire', function () {
  map_choropleth.getCanvas().style.cursor = 'pointer';
});
map_choropleth.on('mouseleave', 'us_counties_wildfire', function () {
  map_choropleth.getCanvas().style.cursor = '';
});
});

// legend based on zoom level
const stateLegendEl = document.getElementById('state-legend');
const countyLegendEl = document.getElementById('county-legend');
map_choropleth.on('zoom', () => {
if (map_choropleth.getZoom() > 4) {
stateLegendEl.style.display = 'none';
countyLegendEl.style.display = 'block';
} else {
stateLegendEl.style.display = 'block';
countyLegendEl.style.display = 'none';
}
});
