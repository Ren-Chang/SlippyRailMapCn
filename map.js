var map;
var cartodb, terrain, imagery, rail;
function toggleNav() {
	if (document.getElementById("mySidebar").offsetWidth === 0) {
		document.getElementById("mySidebar").style.width = "250px";
	    document.getElementById("map").style.marginRight = "250px";
		document.getElementById("keybtn").innerHTML = '&times;';
	} else {
	    document.getElementById("mySidebar").style.width = "0";
	    document.getElementById("map").style.marginRight= "0";
		document.getElementById("keybtn").innerHTML = '&#9776;';
	}
}

cartodb = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://s.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
		attributions: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://carto.com/attribution">CartoDB.</a>'
	}),
	visible: true, type: 'base', title: 'CartoDB light'
});
terrain = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://t{0-1}.tianditu.gov.cn/ter_w/wmts?' + 
			'service=WMTS&request=GetTile&version=1.0.0&layer=ter&style=default&format=tiles&' + 
			'tileMatrixSet=w&tileMatrix={z}&tileRow={y}&tileCol={x}&tk=462b67df67e3c81d60140b1ebda58bc2', //remove once key is no longer free
		attributions: '<a href="http://www.tianditu.gov.cn/about/contact.html?type=3">&copy;</a> '
		 + '<a href="http://www.tianditu.gov.cn">天地图</a>, <a href="http://www.tianditu.gov.cn/about/contact.html?type=2">terms</a>'
	}),
	visible: false, type: 'base', title: 'MapWorld terrain'
});
imagery = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://t{0-1}.tianditu.gov.cn/img_w/wmts?' + 
			'service=WMTS&request=GetTile&version=1.0.0&layer=img&style=default&format=tiles&' + 
			'tileMatrixSet=w&tileMatrix={z}&tileRow={y}&tileCol={x}&tk=462b67df67e3c81d60140b1ebda58bc2', //remove once key is no longer free
		attributions: '<a href="http://www.tianditu.gov.cn/about/contact.html?type=3">&copy;</a> '
		+ '<a href="http://www.tianditu.gov.cn">天地图</a>, <a href="http://www.tianditu.gov.cn/about/contact.html?type=2">terms</a>'
	}),
	visible: false, type: 'base', title: 'MapWorld imagery'
});
rail = new ol.layer.Tile({
	source: new ol.source.XYZ({
		attributions: 'Rail data 2023b <a href="http://weibo.com/u/3513941704">贵广十标段</a>, tile <a href="http://github.com/Ren-Chang">任畅</a>.',
		url: 'https://tile.renchang.me/{z}/{x}/{y}.png',
		tilePixelRatio: 2
	}),
	title: 'China railway',
	extent: ol.proj.transformExtent([75.9659042903028,18.2916806610885,134.51125735793,53.0040163201993],'EPSG:4326','EPSG:3857')
});
var boundary = new ol.layer.Tile({
	source: new ol.source.XYZ({
		attributions: '<a href="http://www.tianditu.gov.cn/about/contact.html?type=3">&copy;</a> '
		+ '<a href="http://www.tianditu.gov.cn">天地图</a>, <a href="http://www.tianditu.gov.cn/about/contact.html?type=2">terms</a>',
		url: 'https://t{0-1}.tianditu.gov.cn/ibo_w/wmts?' + 
		'service=WMTS&request=GetTile&version=1.0.0&layer=ibo&style=default&format=tiles&' + 
		'tileMatrixSet=w&tileMatrix={z}&tileRow={y}&tileCol={x}&tk=462b67df67e3c81d60140b1ebda58bc2'
	}),
	title: 'China boundary', crossOrigin: null,
	extent: ol.proj.transformExtent([73,1,135,55],'EPSG:4326','EPSG:3857'),
	opacity: 0.7 //, visible: false
});
boundary.on('prerender', function(e){
	var ctx = e.context;
	ctx.save();
	ctx.filter = 'hue-rotate(' + 210 + 'deg)';
})
boundary.on('postrender', function(e){
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
		}),
		rotate: false
	}),
	layers: [base, overlay],
	target: document.getElementById('map'),
	view: new ol.View({
		center: ol.proj.fromLonLat([105, 35]),
		zoom: 4, 
		enableRotation: false
	}),
	interactions: ol.interaction.defaults({
		altShiftDragRotate:false, 
		pinchRotate:false
	})
});
var layerSwitcher = new ol.control.LayerSwitcher({
	tipLabel: 'Choose layer'
});
map.addControl(layerSwitcher);
