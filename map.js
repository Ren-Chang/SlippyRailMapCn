var map;
var cartodb, terrain, imagery, rail;
cartodb = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'http://s.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
		attributions: [new ol.Attribution({ html: ['&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://cartodb.com/attributions">CartoDB.</a>'] })]
	}),
	visible: true, type: 'base', title: 'CartoDB light'
});
terrain = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'http://t{0-1}.tianditu.com/ter_w/wmts?' + 
			'service=WMTS&request=GetTile&version=1.0.0&layer=ter&style=default&format=tiles&' + 
			'tileMatrixSet=w&tileMatrix={z}&tileRow={y}&tileCol={x}',
		attributions: [new ol.Attribution({ html: '&copy; <a href="http://map.tianditu.com/help/contract/contract.html">MapWorld</a>'})]
	}),
	visible: false, type: 'base', title: 'MapWorld terrain'
});
imagery = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'http://t{0-1}.tianditu.com/img_w/wmts?' + 
			'service=WMTS&request=GetTile&version=1.0.0&layer=img&style=default&format=tiles&' + 
			'tileMatrixSet=w&tileMatrix={z}&tileRow={y}&tileCol={x}',
		attributions: [new ol.Attribution({ html: '&copy; <a href="http://map.tianditu.com/help/contract/contract.html">MapWorld</a>'})]
	}),
	visible: false, type: 'base', title: 'MapWorld imagery'
});
rail = new ol.layer.Tile({
	source: new ol.source.XYZ({
		attributions: [new ol.Attribution({
			html: 'Rail data 2017 <a href="http://weibo.com/u/3513941704">贵广十标段</a>, tile <a href="http://github.com/Ren-Chang">任畅</a>.'
		})],
		url: 'http://oogkf4i1x.bkt.clouddn.com/anno17/{z}/{x}/{y}.png?v=20170419'
	}),
	title: 'China railway',
	extent: ol.proj.transformExtent([75.9659042903028,18.2916806610885,134.51125735793,53.0040163201993],'EPSG:4326','EPSG:3857')
});
var boundary = new ol.layer.Tile({
	source: new ol.source.TileWMS({
		attributions: [new ol.Attribution({
			html: '&copy; <a href="http://map.tianditu.com/help/contract/contract.html">MapWorld</a>'
		})],
		url: 'https://zhfw.tianditu.com/gisserver/ZHFW/wms',
		params: {'LAYERS':'030100','FORMAT':'image/png','TRANSPARENT':'true','TILED':true}
	}),
	title: 'China boundary', crossOrigin: null,
	extent: ol.proj.transformExtent([73,1,135,55],'EPSG:4326','EPSG:3857'),
	opacity: 0.7
});
boundary.on('precompose', function(e){
	var ctx = e.context;
	ctx.save();
	ctx.filter = 'hue-rotate(' + 210 + 'deg)';
})
boundary.on('postcompose', function(e){
	e.context.restore();
})

var base = new ol.layer.Group({
	title: 'Base maps',
	layers: [cartodb, terrain, imagery]
});
var overlay = new ol.layer.Group({
	title: 'Overlays',
	layers: [rail, boundary]
});

map = new ol.Map({
	controls: ol.control.defaults({
		attributionOptions:({
			collapsible: false
		})
	}),
	layers: [base, overlay],
	target: document.getElementById('map'),
	view: new ol.View({
		center: ol.proj.fromLonLat([105, 35]),
		zoom: 4
	})
});
var layerSwitcher = new ol.control.LayerSwitcher({
	tipLabel: 'Choose layer'
});
map.addControl(layerSwitcher);
