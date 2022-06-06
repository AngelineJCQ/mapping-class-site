mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxpbmVqY3EiLCJhIjoiY2wzdTh0MzNyMjlzNzNwbTlrOHZjbnFuZCJ9.MxT1rnnswLTBYgg2y7MB1w';
var map_point = new mapboxgl.Map({
    container: 'map-point',
    style: 'mapbox://styles/angelinejcq/cl41x1bro000w15mhl0ynpbd4',
    zoom: 3.2,
    maxZoom: 9,
    minZoom: 3,
    center: [105, 38],
});

map_point.on("load", function () {
  map_point.addLayer(
      {
      id: "cn_every_disaster",
      type: "circle",
      source: {
          type: "geojson",
          data: "data/placeDisaster.geojson",
      },
      paint: {
          "circle-radius":10,
          "circle-color": [
          "match",
          ["get", "disastertype"],
          'flood', '#F0EFEB',
          'storm', '#b5c6e0',
          'extreme temperature ', '#ffa585',
          'landslide', '#B08569',
          'drought','#ddb892',
          'mass movement (dry)', '#9c6644',
          'earthquake','#808080',
          "#ffffff",
          ],
          "circle-stroke-width": 0.8,
          "circle-stroke-color": "#2d031d",
      },
      minzoom: 5,
      },
      "country-boundaries (1)"
  );
  map_point.addLayer(
      {
      id: "china_province_disaster",
      type: "circle",
      source: {
          type: "geojson",
          data: "data/provinceDisaster.geojson",
      },
      paint: {
        'circle-radius': 
        [ '*',['sqrt', ['get', 'total']],2],
        "circle-color": [
        "match",
        ["get", "dominant_type"],
        'flood', '#F0EFEB',
        'storm', '#b5c6e0',
        'extreme temperature ', '#ffa585',
        'landslide', '#B08569',
        'drought','#ddb892',
        'mass movement (dry)', '#9c6644',
        'earthquake','#808080',
        "#ffffff",
        ],
        "circle-stroke-width": 0.8,
        "circle-stroke-color": "#2d031d",
        },
    maxzoom: 5,
    },
);

});
  
// Create the popup
map_point.on('click', 'china_province_disaster', function (e) {
  var provinceName = e.features[0].properties.adm1;
  var total = e.features[0].properties.total;
  var main = e.features[0].properties.dominant_type;
  var drought = e.features[0].properties.drought;
  var earthquake = e.features[0].properties.earthquake;
  var extremeTemperature= e.features[0].properties['extreme temperature '];
  var flood = e.features[0].properties.flood;
  var landslide = e.features[0].properties.landslide;
  var storm = e.features[0].properties.storm;
  var dry = e.features[0].properties['mass movement (dry)'];

  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>Number of Disaster: '+ total +'</h4>'
          +'<h2>The dominant type in <i>' + provinceName + '</i> is ' +main+'.</h2>'
          + '<p>drought: '  + drought + '</p>'
          + '<p>earthquake: '  + earthquake + '</p>'
          + '<p>extreme temperature: '  + extremeTemperature + '</p>'
          + '<p>flood: '  + flood + '</p>'
          + '<p>landslide: '  + landslide + '</p>'
          + '<p>storm: '  + storm + '</p>'
          + '<p>dry: '  + dry + '</p>')
      .addTo(map_point);
});
// Change the cursor to a pointer when the mouse is over the china_province_disaster layer.
map_point.on('mouseenter', 'china_province_disaster', function () {
  map_point.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map_point.on('mouseleave', 'china_province_disaster', function () {
  map_point.getCanvas().style.cursor = '';
});

// Create the popup
map_point.on('click', 'cn_every_disaster', function (e) {
    var provinceName = e.features[0].properties.adm1;
    var location = e.features[0].properties.location;
    var disastertype = e.features[0].properties.disastertype;
    var year = e.features[0].properties.year;
  
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+ provinceName + ' - '+ location +'</h4>'
            +'<h2>This '+disastertype+ ' happened in '+ year + '.</h2>'
)
        .addTo(map_point);
  });
  // Change the cursor to a pointer when the mouse is over the china_province_disaster layer.
  map_point.on('mouseenter', 'cn_every_disaster', function () {
    map_point.getCanvas().style.cursor = 'pointer';
  });
  // Change it back to a pointer when it leaves.
  map_point.on('mouseleave', 'cn_every_disaster', function () {
    map_point.getCanvas().style.cursor = '';
  });
  