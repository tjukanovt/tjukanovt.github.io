// d3.tip
// Copyright (c) 2013 Justin Palmer
//
// Tooltips for d3.js SVG visualizations
//
// 2015 S Benten
//
// Extended for central and external tooltips

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module with d3 as a dependency.
        define(['d3'], factory)
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = function (d3) {
            d3.tip = factory(d3)
            return d3.tip
        }
    } else {
        // Browser global.
        root.d3.tip = factory(root.d3)
    }
}(this, function (d3) {

    // Public - contructs a new tooltip
    //
    // Returns a tip
    return function () {
        var direction = d3_tip_direction,
            offset = d3_tip_offset,
            html = d3_tip_html,
            node = initNode(),
            svg = null,
            point = null,
            target = null,
            centervariant = null,
            adjust = d3_tip_adjust
            ext = d3_tip_ext;

        function tip(vis) {
            svg = getSVGNode(vis)
            point = svg.createSVGPoint()
            document.body.appendChild(node)
        }

        // Public - show the tooltip on the screen
        //
        // Returns a tip
        tip.show = function () {
            if (isExternalTip()) {
                el = getExternalNode();

                if (el != null)
                    el.html(html());

            } else {
                var args = Array.prototype.slice.call(arguments)
                if (args[args.length - 1] instanceof SVGElement) target = args.pop()

                var content = html.apply(this, args),
                    poffset = offset.apply(this, args),
                    dir = direction.apply(this, args),
                    nodel = getNodeEl(),
                    i = directions.length,
                    coords,
                    scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                    scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft

                nodel.html(content)
                  .style({ opacity: 1, 'pointer-events': 'all' })

                //remove old styles
                while (i--) nodel.classed(directions[i], false)
                if (centervariant != null)
                    nodel.classed(centervariant, false);

                coords = direction_callbacks.get(dir).apply(this)
                nodel.classed(dir, true).style({
                    top: (coords.top + poffset[0]) + scrollTop + 'px',
                    left: (coords.left + poffset[1]) + scrollLeft + 'px'
                })
                //additional styling for center gravity
                if (centervariant != null)
                    nodel.classed(centervariant, true);
            }

            return tip
        }

        // Public - hide the tooltip
        //
        // Returns a tip
        tip.hide = function () {
            if (isExternalTip()) {
                el = getExternalNode();

                if (el != null)
                    el.html("");

            } else {
                var nodel = getNodeEl()
                nodel.style({ opacity: 0, 'pointer-events': 'none' })
            }

            return tip
        }

        // Public: Proxy attr calls to the d3 tip container.  Sets or gets attribute value.
        //
        // n - name of the attribute
        // v - value of the attribute
        //
        // Returns tip or attribute value
        tip.attr = function (n, v) {
            if (arguments.length < 2 && typeof n === 'string') {
                return getNodeEl().attr(n)
            } else {
                var args = Array.prototype.slice.call(arguments)
                d3.selection.prototype.attr.apply(getNodeEl(), args)
            }

            return tip
        }

        // Public: Proxy style calls to the d3 tip container.  Sets or gets a style value.
        //
        // n - name of the property
        // v - value of the property
        //
        // Returns tip or style property value
        tip.style = function (n, v) {
            if (arguments.length < 2 && typeof n === 'string') {
                return getNodeEl().style(n)
            } else {
                var args = Array.prototype.slice.call(arguments)
                d3.selection.prototype.style.apply(getNodeEl(), args)
            }

            return tip
        }

        // Public: Set or get the direction of the tooltip
        //
        // v - One of n(north), s(south), e(east),  w(west), nw(northwest),
        //     sw(southwest), ne(northeast), se(southeast), or c(center)
        //
        // Returns tip or direction
        tip.direction = function (v) {
            if (!arguments.length) return direction
            direction = v == null ? v : d3.functor(v)

            return tip
        }

        // Public: Sets or gets the offset of the tip
        //
        // v - Array of [x, y] offset
        //
        // Returns offset or
        tip.offset = function (v) {
            if (!arguments.length) return offset
            offset = v == null ? v : d3.functor(v)

            return tip
        }

        // Public: sets or gets the html value of the tooltip
        //
        // v - String value of the tip
        //
        // Returns html value or tip
        tip.html = function (v) {
            if (!arguments.length) return html
            html = v == null ? v : d3.functor(v)

            return tip
        }

        // Public: sets or gets the position adjustment value to 
        // align the arrow pointer during central positioning
        //
        // v - Integer value in pixels
        //
        // Returns value or tip
        tip.adjust = function (v) {
            if (!arguments.length) return adjust
            adjust = v == null ? v : d3.functor(v)

            return tip
        }

        // Public: sets or gets the external element name to use 
        // to host the tooltip 
        //
        // v - String value of the placeholder id
        //
        // Returns value or tip
        tip.ext = function (v) {
            if (!arguments.length) return adjust
            ext = v == null ? v : d3.functor(v)

            return tip
        }

        // Public: destroys the tooltip and removes it from the DOM
        //
        // Returns a tip
        tip.destroy = function () {
            if (node) {
                getNodeEl().remove();
                node = null;
            }
            return tip;
        }

        function d3_tip_direction() { return 'n' }
        function d3_tip_offset() { return [0, 0] }
        function d3_tip_html() { return ' ' }
        function d3_tip_adjust() { return 6; }
        function d3_tip_ext() { return null; }

        function isExternalTip() {
            if (ext() != null)
                return true;
            else
                return false;
        }

        //Private - Get the external node for the tip
        function getExternalNode() {
            var el = null;
            if (ext() != null) {
                // check to see if the external element starts with an id selector
                var n = ext();
                if (n.substr(0, 1) != "#") {
                    n = "#" + n;
                    ext(n);
                }

                el = d3.select(n);
            }
            return el;
        }

        var direction_callbacks = d3.map({
            n: direction_n,
            s: direction_s,
            e: direction_e,
            w: direction_w,
            nw: direction_nw,
            ne: direction_ne,
            sw: direction_sw,
            se: direction_se,
            c: direction_c
        }),

        directions = direction_callbacks.keys()

        function direction_n() {
            var bbox = getScreenBBox()
            return {
                top: bbox.n.y - node.offsetHeight,
                left: bbox.n.x - node.offsetWidth / 2
            }
        }

        function direction_s() {
            var bbox = getScreenBBox()
            return {
                top: bbox.s.y,
                left: bbox.s.x - node.offsetWidth / 2
            }
        }

        function direction_e() {
            var bbox = getScreenBBox()
            return {
                top: bbox.e.y - node.offsetHeight / 2,
                left: bbox.e.x
            }
        }

        function direction_w() {
            var bbox = getScreenBBox()
            return {
                top: bbox.w.y - node.offsetHeight / 2,
                left: bbox.w.x - node.offsetWidth
            }
        }

        function direction_nw() {
            var bbox = getScreenBBox()
            return {
                top: bbox.nw.y - node.offsetHeight,
                left: bbox.nw.x - node.offsetWidth
            }
        }

        function direction_ne() {
            var bbox = getScreenBBox()
            return {
                top: bbox.ne.y - node.offsetHeight,
                left: bbox.ne.x
            }
        }

        function direction_sw() {
            var bbox = getScreenBBox()
            return {
                top: bbox.sw.y,
                left: bbox.sw.x - node.offsetWidth
            }
        }

        function direction_se() {
            var bbox = getScreenBBox()
            return {
                top: bbox.se.y,
                left: bbox.e.x
            }
        }

        // Private - gets the screen coordinates for the tip
        //
        // Currently limited to the four quadrants defined below
        // Returns the screen coordinates for the tip and assigns 
        // the quadrant value for extra styling
        //
        //    +--+--+
        //    |q1|q2|
        //    +--+--+
        //    |q4|q3|
        //    +--+--+
        //
        // Returns an Object {top, left}
        function direction_c() {
            var rect = svg.getBoundingClientRect();
            var mouse = d3.mouse(svg);
            if (mouse[1] < (rect.height / 2)) {
                if (mouse[0] < (rect.width / 2)) {
                    centervariant = 'q1';
                    return {
                        top: (rect.top + mouse[1] - node.offsetHeight / 2) - adjust(),
                        left: (rect.left + mouse[0]) + adjust()
                    }
                } else {
                    centervariant = 'q2';
                    return {
                        top: (rect.top + mouse[1] - node.offsetHeight / 2) - adjust(),
                        left: (rect.left + mouse[0] - node.offsetWidth) - adjust()
                    }
                }
            } else {
                if (mouse[0] < (rect.width / 2)) {
                    centervariant = 'q4';
                    return {
                        top: (rect.top + mouse[1] - node.offsetHeight / 2) - adjust(),
                        left: (rect.left + mouse[0]) + adjust()
                    }
                } else {
                    centervariant = 'q3';
                    return {
                        top: (rect.top + mouse[1] - node.offsetHeight / 2) -adjust(),
                        left: (rect.left + mouse[0] - node.offsetWidth) - adjust()
                    }
                }
            }
        }

        function initNode() {
            var node = d3.select(document.createElement('div'))
            node.style({
                position: 'absolute',
                top: 0,
                opacity: 0,
                'pointer-events': 'none',
                'box-sizing': 'border-box'
            })

            return node.node()
        }

        function getSVGNode(el) {
            el = el.node()
            if (el.tagName.toLowerCase() === 'svg')
                return el

            return el.ownerSVGElement
        }

        function getNodeEl() {
            if (node === null) {
                node = initNode();
                // re-add node to DOM
                document.body.appendChild(node);
            };
            return d3.select(node);
        }

        // Private - gets the screen coordinates of a shape
        //
        // Given a shape on the screen, will return an SVGPoint for the directions
        // n(north), s(south), e(east), w(west), ne(northeast), se(southeast), nw(northwest),
        // sw(southwest).
        //
        //    +-+-+
        //    |   |
        //    +   +
        //    |   |
        //    +-+-+
        //
        // Returns an Object {n, s, e, w, nw, sw, ne, se}
        function getScreenBBox() {
            var targetel = target || d3.event.target;

            while ('undefined' === typeof targetel.getScreenCTM && 'undefined' === targetel.parentNode) {
                targetel = targetel.parentNode;
            }

            var bbox = {},
                matrix = targetel.getScreenCTM(),
                tbbox = targetel.getBBox(),
                width = tbbox.width,
                height = tbbox.height,
                x = tbbox.x,
                y = tbbox.y

            point.x = x
            point.y = y
            bbox.nw = point.matrixTransform(matrix)
            point.x += width
            bbox.ne = point.matrixTransform(matrix)
            point.y += height
            bbox.se = point.matrixTransform(matrix)
            point.x -= width
            bbox.sw = point.matrixTransform(matrix)
            point.y -= height / 2
            bbox.w = point.matrixTransform(matrix)
            point.x += width
            bbox.e = point.matrixTransform(matrix)
            point.x -= width / 2
            point.y -= height / 2
            bbox.n = point.matrixTransform(matrix)
            point.y += height
            bbox.s = point.matrixTransform(matrix)

            return bbox
        }

        return tip
    };

}));