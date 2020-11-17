ol.proj.proj4.register(proj4);
ol.proj.get("EPSG:3067").setExtent([-113172.302068, 6591686.570201, 1240002.863294, 7769517.321820]);
var wms_layers = [];

var format_municipalities_2020_0 = new ol.format.GeoJSON();
var features_municipalities_2020_0 = format_municipalities_2020_0.readFeatures(json_municipalities_2020_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3067'});
var jsonSource_municipalities_2020_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_municipalities_2020_0.addFeatures(features_municipalities_2020_0);
var lyr_municipalities_2020_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_municipalities_2020_0, 
                style: style_municipalities_2020_0,
                interactive: true,
                title: '<img src="styles/legend/municipalities_2020_0.png" /> municipalities_2020'
            });
var format_parishes_1938_1 = new ol.format.GeoJSON();
var features_parishes_1938_1 = format_parishes_1938_1.readFeatures(json_parishes_1938_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3067'});
var jsonSource_parishes_1938_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_parishes_1938_1.addFeatures(features_parishes_1938_1);
var lyr_parishes_1938_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_parishes_1938_1, 
                style: style_parishes_1938_1,
                interactive: true,
                title: '<img src="styles/legend/parishes_1938_1.png" /> parishes_1938'
            });

lyr_municipalities_2020_0.setVisible(true);lyr_parishes_1938_1.setVisible(true);
var layersList = [lyr_municipalities_2020_0,lyr_parishes_1938_1];
lyr_municipalities_2020_0.set('fieldAliases', {'name': 'name', });
lyr_parishes_1938_1.set('fieldAliases', {'NIMI': 'NIMI', });
lyr_municipalities_2020_0.set('fieldImages', {'name': 'TextEdit', });
lyr_parishes_1938_1.set('fieldImages', {'NIMI': 'TextEdit', });
lyr_municipalities_2020_0.set('fieldLabels', {'name': 'no label', });
lyr_parishes_1938_1.set('fieldLabels', {'NIMI': 'no label', });
lyr_parishes_1938_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});