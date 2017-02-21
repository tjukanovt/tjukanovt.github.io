var format_kunnatOGRGeoJSONMultiPolygon = new ol.format.GeoJSON();
var features_kunnatOGRGeoJSONMultiPolygon = format_kunnatOGRGeoJSONMultiPolygon.readFeatures(geojson_kunnatOGRGeoJSONMultiPolygon, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kunnatOGRGeoJSONMultiPolygon = new ol.source.Vector();
jsonSource_kunnatOGRGeoJSONMultiPolygon.addFeatures(features_kunnatOGRGeoJSONMultiPolygon);var lyr_kunnatOGRGeoJSONMultiPolygon = new ol.layer.Vector({
                source:jsonSource_kunnatOGRGeoJSONMultiPolygon, 
                style: style_kunnatOGRGeoJSONMultiPolygon,
                title: "kunnat OGRGeoJSON MultiPolygon"
            });

lyr_kunnatOGRGeoJSONMultiPolygon.setVisible(true);
var layersList = [lyr_kunnatOGRGeoJSONMultiPolygon];
lyr_kunnatOGRGeoJSONMultiPolygon.set('fieldAliases', {'nimi': 'nimi', });
lyr_kunnatOGRGeoJSONMultiPolygon.set('fieldImages', {'nimi': 'TextEdit', });
lyr_kunnatOGRGeoJSONMultiPolygon.set('fieldLabels', {'nimi': 'no label', });
