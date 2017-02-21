var format_kunnat_pop2 = new ol.format.GeoJSON();
var features_kunnat_pop2 = format_kunnat_pop2.readFeatures(geojson_kunnat_pop2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kunnat_pop2 = new ol.source.Vector();
jsonSource_kunnat_pop2.addFeatures(features_kunnat_pop2);var lyr_kunnat_pop2 = new ol.layer.Vector({
                source:jsonSource_kunnat_pop2, 
                style: style_kunnat_pop2,
                title: "kunnat_pop2"
            });

lyr_kunnat_pop2.setVisible(true);
var layersList = [lyr_kunnat_pop2];
lyr_kunnat_pop2.set('fieldAliases', {'nimi': 'nimi', 'Population': 'Population', });
lyr_kunnat_pop2.set('fieldImages', {'nimi': 'TextEdit', 'Population': 'TextEdit', });
lyr_kunnat_pop2.set('fieldLabels', {'nimi': 'no label', 'Population': 'inline label', });
