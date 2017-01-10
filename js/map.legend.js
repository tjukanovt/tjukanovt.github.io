// d3.legend
// Copyright (c) 2015 S Benten
//
// Create legends for maps and graphs

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module with d3 as a dependency.
        define(['d3'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = function (d3) {
            d3.legend = factory(d3);
            return d3.legend;
        }
    } else {
        // Browser global.
        root.d3.legend = factory(root.d3);
    }
}(this, function (d3) {

    // Public: Constant value for the rectangle shape
    RECT = "rect";
    // Public: Constant value for the ellipse shape
    ELLIPSE = "ellipse";


    // Public - contructs a new legend
    //
    // Returns a legend
    return function () {
        var svg = null,
            csv = d3_legend_csv,
            position = d3_legend_position,
            shape = d3_legend_shape,
            margin = d3_legend_margin,
            padding = d3_legend_padding,
            width = 0,
            height = 0;

        // Public: Constructor
        function legend(vis) {
            svg = getSVGNode(vis);

            var data = loadCSV();
        }

        // Public: sets or gets the csv data file for the legend
        //
        // v - String value of the csv location
        //
        // Returns value or legend
        legend.csv = function (v) {
            if (!arguments.length) return csv;
            csv = v == null ? v : d3.functor(v);

            return legend;
        }

        // Public: sets or gets the location for the legend
        //
        // v - Integer value of the legend location
        // Currently limited to the four corners defined below
        //
        //    +-+-+
        //    |0|1|
        //    +-+-+ 4
        //    |3|2|
        //    +-+-+
        //
        // Returns value or legend
        legend.position = function (v) {
            if (!arguments.length) return position;
            position = v == null ? v : d3.functor(v);

            return legend;
        }

        // Public: sets or gets the shape for the legend
        //
        // v - Constant string value of either RECT or ELLIPSE
        //
        // Returns value or legend
        legend.shape = function (v) {
            if (!arguments.length) return shape;
            shape = v == null ? v : d3.functor(v);

            return legend;
        }

        // Public: sets or gets the margin for the legend
        //
        // v - Interger value for the margin applied to the outside 
        // of the legend
        //
        // Returns value or legend
        legend.margin = function (v) {
            if (!arguments.length) return margin;
            margin = v == null ? v : d3.functor(v);

            return legend;
        }

        // Public: sets or gets the padding for the legend
        //
        // v - Interger value for the padding applied to the inside 
        // of the legend
        //
        // Returns value or legend
        legend.padding = function (v) {
            if (!arguments.length) return padding;
            padding = v == null ? v : d3.functor(v);

            return legend;
        }
        
        // Private: Load the CSV data 
        //
        // Returns the loaded data
        function loadCSV() {

            d3.csv(csv(), function (error, rows) {
                if (error) console.error(error);

                setup(rows);
                return rows;
            });

        }

        // Private: Setup the legend from the data
        function setup(rows) {
            var s = d3.select(svg)
            var g = s.append("g");

            var rect = g.append("rect")
              .attr("class", "legendouter")

            // Get the largest width and height
            var max = getMaxSize(rows);

            width = margin() + padding() + max[0];
            height = margin() + padding() + max[1] * rows.length;

            var items = g.selectAll(".legend")
              .data(rows)
              .enter()
              .append("g")
              .attr("class", "legend")
              .attr("transform", function (d, i) { return "translate(0," + (i * max[1]) + ")"; });

            // Add the color swatch
            var swatch = null;
            if (shape() == ELLIPSE)
                swatch = createEllipse(items, max);
            else
                swatch = createRect(items, max);

            // Add the textual prompt
            var txt = items.append("text")
              .attr("x", function (d) { return getTextX(max[0]); })
              .attr("y", function (d) { return getTextY(max[1]); })
              .text(function (d) { return d.Text; });

            // Resize the background based on the contents
            var x, textWidth = 0;
            for (x in items[0]) {
                var bbox = items[0][x].getBBox();
                if (textWidth < bbox.width)
                    textWidth = bbox.width;
            }

            reposition(g, rect, max[1])
        }

        function reposition(obj, rect, maxH) {
            // get the hodting svg node
            var s = svg.getBoundingClientRect();

            // get the legend grouping node 
            var g = obj[0][0].getBoundingClientRect();

            console.log(s);
            console.log(g);

            // default state
            var x = margin();
            var y = margin();

            switch (position()) {
                case 1:
                    // top right
                    x = s.width - g.width - (margin() * 4);
                    break;
                case 2:
                    // bottom right
                    x = s.width - g.width - (margin() * 4);
                    y = s.height - g.height - (margin() * 4);
                    break;
                case 3:
                    // bottom left
                    y = s.height - g.height - (margin() * 4);
                    break;
                case 4:
                    // external - adjust svg to size of contents
                    var w = g.width + (margin() * 4);
                    var h = g.height + (margin() * 4);

                    d3.select(svg)
                        .attr("width", (w > s.width) ? w : s.width)
                        .attr("height", (h > s.height) ? h : s.height);
            }

            // Add the legend background
            // There is no way of styling a grouping element in svg
            // so a rect will be used and carefully positioned
            rect.attr("x", x)
              .attr("y", y)
              .attr("width", g.width +  (margin() * 2 ))
              .attr("height", g.height + (margin() * 2));

            // move the container
            obj.attr("x", x)
              .attr("y", y)
              .attr("width", g.width + (margin() * 2))
              .attr("height", g.height + (margin() * 2))

            // move the legend items
            var items = obj.selectAll(".legend")
              .attr("transform", function (d, i) { return "translate(" + (x - margin()) + "," + (y + (i * maxH) - margin()) + ")"; });
        }        

        // Private: get the max width and height
        function getMaxSize(rows) {
            var max = [0, 0];
            var x = 0;
            for (x in rows) {
                if (max[0] < rows[x].Width)
                    max[0] = +rows[x].Width;
                if (max[1] < rows[x].Height)
                    max[1] = +rows[x].Height;
            }

            return max;
        }

        // Private: Get the text X position 
        function getTextX(maxW) {
            return margin() + (padding() * 2) + maxW;
        }

        //Private: Get the text Y poosition
        function getTextY(maxH) {
            return margin() + (padding() * 2) + (maxH / 2);
        }

        // Private: Create a set of rectangles
        function createRect(items, max) {
            return items.append("rect")
                .attr("x", function (d) { return getRectX(d.Width, max[0]); })
                .attr("y", function (d) { return getRectY(d.Height, max[1]); })
                .attr("width", function (d) { return getRectWidth(d.Width); })
                .attr("height", function (d) { return getRectHeight(d.Height); })
                .attr("class", function (d) { return d.Color; });
        }

        // Private: Get the rectangle X position
        function getRectX(v, maxW) {
            return margin() + padding() + ((maxW - +v) / 2);
        }

        // Private: Get the rectangle Y position
        function getRectY(v, maxH) {
            return margin() + padding() + ((maxH - +v) / 2);
        }

        // Private: Get the rectangle width
        function getRectWidth(v) {
            return +v;
        }

        // Private: Get the rectangle height
        function getRectHeight(v) {
            return +v;
        }

        // Private: Create a set of ellipses
        function createEllipse(items, max) {
            return items.append("ellipse")
                .attr("cx", function (d) { return getEllipseX(max[0]); })
                .attr("cy", function (d) { return getEllipseY(max[1]); })
                .attr("rx", function (d) { return getEllipseRX(d.Width); })
                .attr("ry", function (d) { return getEllipseRY(d.Height); })
                .attr("class", function (d) { return d.Color; });
        }

        // Private: Get the ellipse X position
        function getEllipseX(maxW) {
            return margin() + padding() + maxW / 2;
        }

        // Private: Get the ellipse Y position
        function getEllipseY(maxH) {
            return margin() + padding() + maxH / 2;
        }

        // Private: Get the ellipse radius for the X axis
        function getEllipseRX(v) {
            return +v / 2;
        }

        // Private: Get the ellipse radius for the Y axis
        function getEllipseRY(v) {
            return +v / 2;
        }

        // Private: Get the SVG element
        function getSVGNode(el) {
            el = el.node()
            if (el.tagName.toLowerCase() === 'svg')
                return el

            return el.ownerSVGElement
        }

        //-Default methods--------------------------------

        function d3_legend_csv() { return ''; }

        function d3_legend_position() { return 1; }

        function d3_legend_shape() { return legend.RECT; }

        function d3_legend_margin() { return 5; }

        function d3_legend_padding() { return 5; }

        return legend
    };

}));