ol.proj.get("EPSG:3067").setExtent([-551475.870508, 6586605.466250, 1349207.249492, 7804606.516250]);
var wms_layers = [];

        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap_0',
            'type': 'base',
            'opacity': 0.35000,
            
            
            source: new ol.source.XYZ({
    attributions: [new ol.Attribution({html: '<a href=""></a>'})],
                url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });var format_Cottages_1 = new ol.format.GeoJSON();
var features_Cottages_1 = format_Cottages_1.readFeatures(json_Cottages_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3067'});
var jsonSource_Cottages_1 = new ol.source.Vector({
    attributions: [new ol.Attribution({html: '<a href=""></a>'})],
});
jsonSource_Cottages_1.addFeatures(features_Cottages_1);var lyr_Cottages_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Cottages_1, 
                style: style_Cottages_1,
    title: 'Cottages<br />\
    <img src="styles/legend/Cottages_1_0.png" />  1 - 23 <br />\
    <img src="styles/legend/Cottages_1_1.png" />  23 - 52 <br />\
    <img src="styles/legend/Cottages_1_2.png" />  52 - 88 <br />\
    <img src="styles/legend/Cottages_1_3.png" />  88 - 126 <br />\
    <img src="styles/legend/Cottages_1_4.png" />  126 - 168 <br />\
    <img src="styles/legend/Cottages_1_5.png" />  168 - 218 <br />\
    <img src="styles/legend/Cottages_1_6.png" />  218 - 276 <br />\
    <img src="styles/legend/Cottages_1_7.png" />  276 - 341 <br />\
    <img src="styles/legend/Cottages_1_8.png" />  341 - 420 <br />\
    <img src="styles/legend/Cottages_1_9.png" />  420 - 513 <br />\
    <img src="styles/legend/Cottages_1_10.png" />  513 - 637 <br />\
    <img src="styles/legend/Cottages_1_11.png" />  637 - 758 <br />\
    <img src="styles/legend/Cottages_1_12.png" />  758 - 948 <br />\
    <img src="styles/legend/Cottages_1_13.png" />  948 - 1383 <br />\
    <img src="styles/legend/Cottages_1_14.png" />  1383 - 1818 <br />'
        });

lyr_Cottages_1.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_Cottages_1];
lyr_Cottages_1.set('fieldAliases', {'fid': 'Hexagon ID', 'Summer cottages total': 'Cottages total', 'Name': 'Area name', });
lyr_Cottages_1.set('fieldImages', {'fid': 'TextEdit', 'Summer cottages total': 'Range', 'Name': '', });
lyr_Cottages_1.set('fieldLabels', {'fid': 'header label', 'Summer cottages total': 'header label', 'Name': 'header label', });
lyr_Cottages_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
