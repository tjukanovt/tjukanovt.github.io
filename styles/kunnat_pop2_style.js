var size = 0;
var ranges_kunnat_pop2 = [[0.000000, 30000.000000, [ new ol.style.Style({
         fill: new ol.style.Fill({color: 'rgba(237,248,251,1.0)'})
    })]],
[30000.000000, 120000.000000, [ new ol.style.Style({
         fill: new ol.style.Fill({color: 'rgba(166,187,218,1.0)'})
    })]],
[120000.000000, 240000.000000, [ new ol.style.Style({
         fill: new ol.style.Fill({color: 'rgba(137,107,178,1.0)'})
    })]],
[240000.000000, 999999.000000, [ new ol.style.Style({
         fill: new ol.style.Fill({color: 'rgba(129,15,124,1.0)'})
    })]]];
var styleCache_kunnat_pop2={}
var style_kunnat_pop2 = function(feature, resolution){
    var value = feature.get("Population");
    var style = ranges_kunnat_pop2[0][2];
    for (i = 0; i < ranges_kunnat_pop2.length; i++){
        var range = ranges_kunnat_pop2[i];
        if (value > range[0] && value<=range[1]){
            style =  range[2];
        }
    };
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_kunnat_pop2[key]){
        var text = new ol.style.Text({
              font: '10.725px \'MS Shell Dlg 2\', sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: 'rgba(0, 0, 0, 255)'
              }),
            });
        styleCache_kunnat_pop2[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_kunnat_pop2[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};