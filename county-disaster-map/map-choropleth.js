mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_choropleth = new mapboxgl.Map({
    container: 'map-choropleth',
    style: 'mapbox://styles/angelinejcq/cl406qgly000715qr0c7esm4f',
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

map_choropleth.on("load", function () {
  map_choropleth.addLayer({
    id: "us_county_type_outline",
    type: "line",
    source: {
      type: "geojson",
      data: "data/countiesTypologyCodesNew.geojson",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.3,
    },
  },"waterway-label");

  map_choropleth.addLayer({
    id: "us_county_type",
    type: "fill",
    source: {
      type: "geojson",
      data: "data/countiesTypologyCodesNew.geojson",
    },
    paint: {
      "fill-color": [
        "match",
        ["get", "Economic_Type_Label"],
        "Farming", "#D1D0A3",
        "Nonspecialized", "#bababa",
        "Maufacturing", "#4A6C6F",
        "Federal/State Government", "#B9D6F2",
        "Recreation","#FCD0A1",
        "Mining","#201E50",
        "#ffffff",
      ],
      "fill-outline-color": "#ffffff",
      "fill-opacity": [
        "match",
        ["get", "sum"],
        0, 0.1,
        1, 0.3,
        2, 0.4,
        3, 0.5,
        4, 0.7,
        5, 0.9,
        6, 1,
        0.1
      ]
    },
  }, "us_county_type_outline");

// Create the popup
map_choropleth.on('click', 'us_county_type', function (e) {
  var stateName = e.features[0].properties['State'];
  var countyName = e.features[0].properties.County_name;
  var EconomicType = e.features[0].properties.Economic_Type_Label;
  var Sum = e.features[0].properties.sum;
  var Ed = e.features[0].properties['Low Education'];
  var Em = e.features[0].properties['Low Employment'];
  var Pop = e.features[0].properties['Population Loss'];
  var Ret = e.features[0].properties['Retirement Destination'];
  var Pp = e.features[0].properties['Persistent Poverty'];
  var Pcp = e.features[0].properties['Persistent Child Poverty'];
  stateName = stateName.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + countyName + ' - ' + stateName + ' - ' + Sum + 'issue</h4>'
          +'<h2>'+ EconomicType + '</h2>'
          +'<p>' + Ed + '</p>'
          +'<p>' + Em + '</p>'
          +'<p>' + Pop + '</p>'
          +'<p>' + Ret + '</p>'
          +'<p>' + Pp + '</p>'
          +'<p>' + Pcp + '</p>')
      .addTo(map_choropleth);
});
// Change the cursor to a pointer when the mouse is over the us_county layer.
map_choropleth.on('mouseenter', 'us_county_type', function () {
  map_choropleth.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_choropleth.on('mouseleave', 'us_county_type', function () {
  map_choropleth.getCanvas().style.cursor = '';
});
});