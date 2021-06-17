var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_Statuelocation_1 = new ol.format.GeoJSON();
var features_Statuelocation_1 = format_Statuelocation_1.readFeatures(json_Statuelocation_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Statuelocation_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Statuelocation_1.addFeatures(features_Statuelocation_1);
var lyr_Statuelocation_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Statuelocation_1, 
                style: style_Statuelocation_1,
                interactive: true,
                title: '<img src="styles/legend/Statuelocation_1.png" /> Statue location'
            });
var format_Bufferlines_2 = new ol.format.GeoJSON();
var features_Bufferlines_2 = format_Bufferlines_2.readFeatures(json_Bufferlines_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Bufferlines_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Bufferlines_2.addFeatures(features_Bufferlines_2);
var lyr_Bufferlines_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Bufferlines_2, 
                style: style_Bufferlines_2,
                interactive: true,
                title: '<img src="styles/legend/Bufferlines_2.png" /> Buffer lines'
            });

lyr_OpenStreetMap_0.setVisible(true);lyr_Statuelocation_1.setVisible(true);lyr_Bufferlines_2.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_Statuelocation_1,lyr_Bufferlines_2];
lyr_Statuelocation_1.set('fieldAliases', {'Precision': 'Precision', });
lyr_Bufferlines_2.set('fieldAliases', {'Precision': 'Precision', });
lyr_Statuelocation_1.set('fieldImages', {'Precision': '', });
lyr_Bufferlines_2.set('fieldImages', {'Precision': '', });
lyr_Statuelocation_1.set('fieldLabels', {'Precision': 'no label', });
lyr_Bufferlines_2.set('fieldLabels', {'Precision': 'inline label', });
lyr_Bufferlines_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});