var map;
var raster;
raster = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'http://s.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        attributions: [new ol.Attribution({ html: ['&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://cartodb.com/attributions">CartoDB.</a>'] })]
      })
    })
/*var parser = new ol.format.WMTSCapabilities();
//$.ajax('http://t0.tianditu.com/ter_w/wmts?request=GetCapabilities&service=wmts').then(function(response) {
	var result = parser.read(response);
	var options = ol.source.WMTS.optionsFromCapabilities(result, 
		{layer:'ter', matrixSet:'w'});
	raster = new ol.layer.Tile({
		source: new ol.source.WMTS(options)
	});*/

	map = new ol.Map({
	//var map = new ol.Map({
		controls: ol.control.defaults({
			attributionOptions:({
				collapsible: false
			})
		}),
		layers: [raster],
		target: document.getElementById('map'),
		view: new ol.View({
			center: ol.proj.fromLonLat([105, 35]),
			zoom: 4
		})
	});
	var xyz = new ol.layer.Tile({
	  source: new ol.source.XYZ({
		attributions: [new ol.Attribution({
			html: ' <a href="http://weibo.com/u/3513941704">贵广十标段</a>, <a href="http://github.com/Ren-Chang">任畅</a>.'
		})],
		url: './tiles/{z}/{x}/{y}.png'
	  })
	});
	map.addLayer(xyz);
//});