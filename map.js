var projection = ol.proj.get('EPSG:3857');
var raster = new ol.layer.Tile({
	source: new ol.source.OSM()
});

var map = new ol.Map({
	controls: ol.control.defaults({
		attributionOptions:({
			collapsible: false
		})
	}),
	layers: [raster],
	target: document.getElementById('map'),
	view: new ol.View({
		center: ol.proj.fromLonLat([105, 30]),
		zoom: 4
	})
});
var kml = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: './data/bjline.kml',
		format: new ol.format.KML()
	})
});
map.addLayer(kml);