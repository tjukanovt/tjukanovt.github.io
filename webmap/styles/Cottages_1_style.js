var size = 0;
var placement = 'point';

var style_Cottages_1 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("Summer cottages total");
    var labelText = "";
    size = 0;
    var labelFont = "10px, sans-serif";
    var labelFill = "rgba(0, 0, 0, 1)";
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    if (value >= 1.000000 && value <= 23.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(0,0,4,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 23.000000 && value <= 52.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(12,9,39,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 52.000000 && value <= 88.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(35,17,81,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 88.000000 && value <= 126.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(65,15,116,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 126.000000 && value <= 168.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(94,23,127,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 168.000000 && value <= 218.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(123,34,130,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 218.000000 && value <= 276.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(152,44,128,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 276.000000 && value <= 341.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(182,54,121,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 341.000000 && value <= 420.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(211,66,110,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 420.000000 && value <= 513.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(235,87,97,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 513.000000 && value <= 637.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(248,118,92,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 637.000000 && value <= 758.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(254,153,105,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 758.000000 && value <= 948.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(254,187,128,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 948.000000 && value <= 1383.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(254,220,157,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    } else if (value >= 1383.000000 && value <= 1818.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(252,253,191,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement)
    })]
                    };

    return style;
};
