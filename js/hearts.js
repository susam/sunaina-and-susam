/*
SIMPLIFIED BSD LICENSE

Copyright (c) 2014 Susam Pal & Sunaina Pai
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

  1. Redistributions of source code must retain the above copyright
     notice, this list of conditions and the following disclaimer.
  2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in
     the documentation and/or other materials provided with the
     distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

;var Util = function()
{
    // Return a random element from the specified a.
    //
    // Argument:
    //   a -- An array
    //
    // Return:
    //   An element selected randomly from the array a
    function random(a, b)
    {
        if (typeof a == 'number') {
            if (typeof b == 'number') {
                a = Math.floor(a)
                b = Math.floor(b)
                return Math.floor(Math.random() * (b - a + 1)) + a
            } else {
                return Number.NaN
            }
        } else if (a instanceof Array) {
            return a[Math.floor(Math.random() * a.length)]
        }
    }


    // Add children to a DOM node.
    //
    // This function accepts a variable number of arguments. The first
    // argument must be a parent node to which the child nodes are to be
    // added. The first argument is followed by one or more arguments,
    // one argument each for every child node that must be added to the
    // parent node.
    //
    // If any child node argument is not found to be an instance of
    // Node, then a Text node is created from this argument after
    // converting it into a string.
    //
    // If this function is called with 0 or 1 arguments, then this
    // function does nothing.
    //
    // Arguments:
    //   node -- Parent node (type: Node)
    //   childNode, ... -- One or more child nodes (type: Node ...)
    function addChildren()
    {
        // If no children nodes are specified, then there is nothing to
        // do.
        if (arguments.length <= 1) {
            return
        }

        var node = arguments[0]
        var childNodes = Array.prototype.slice.call(arguments, 1)
        var childNode
        var i

        for (i = 0; i < childNodes.length; i++) {
            childNode = childNodes[i]

            if (childNode instanceof Node) {
                node.appendChild(childNode)
            } else {
                node.appendChild(document.createTextNode(childNode + ''))
            }
        }
    }


    // Util object
    return {
        random: random,
        addChildren: addChildren,
    }
}()


;var Hearts = function()
{
    var animationID = null

    // Create an HTML element to display a pink heart and add it to the
    // HTML page.
    //
    // Return:
    //   HTML element with containing the heart
    function createHeart()
    {
        var span = document.createElement('span')

        span.style.position = 'fixed'
        span.style.color = '#f52887'
        span.style.opacity = '0'
        Util.addChildren(span, '\u2665')

        document.body.appendChild(span)
        return span
    }


    // Display growing hearts all over the page.
    function growingHearts()
    {
        var ox = 0
        var oy = 80

        var w = document.body.clientWidth - ox - 200
        var h = window.innerHeight - oy - 200

        var newInterval = Util.random(200, 2000)

        animationID = window.setInterval(function()
        {

            var heart = createHeart()
            heart.style.fontSize = '0%'
            heart.style.left = Util.random(ox, ox + w) + 'px'
            heart.style.top = Util.random(oy, oy + h) + 'px'

            var growInterval = Util.random(10, 50)
            var size = Util.random(50, 1000)
            var i = 0
            var id = window.setInterval(function()
            {
                i += 20
                heart.style.fontSize = i + '%'

                if (i < size / 2 ) {
                    heart.style.opacity = '1'
                } else {
                    heart.style.opacity = (1 - (2 * i - size) / size ) + ''
                }

                if (i >= size) {
                    window.clearInterval(id)
                    document.body.removeChild(heart)
                }
            }, growInterval)
        }, newInterval)
    }


    // Display hearts rising across the page
    function risingHearts()
    {
        var ox = 0
        var oy = 80

        var w = document.body.clientWidth - ox - 200
        var h = window.innerHeight - oy - 200

        var newInterval = Util.random(200, 2000)

        animationID = window.setInterval(function()
        {
            var x = Util.random(ox, ox + w)
            var y = Util.random(oy + h - 100, oy + h)

            var heart = createHeart()
            heart.style.fontSize = Util.random(100, 400) + '%'
            heart.style.left = x + 'px'
            heart.style.top = y + 'px'

            var riseInterval = Util.random(10, 50)
            var rise = Util.random(h / 4, h)
            var drift = Util.random(-1, 1)
            var i = 0
            var id = window.setInterval(function()
            {
                i++
                if (Util.random(1, 100) <= 1) {
                    drift = (drift == Util.random(-1, 1) ? 1 : 0)
                }

                x = Math.min(Math.max(x + drift, ox), ox + w)

                heart.style.left = x + 'px'
                heart.style.top = (y - i) + 'px'

                if (i < rise / 4) {
                    heart.style.opacity = (4 * i / rise) + ''
                } else if (i < rise / 2 ) {
                    heart.style.opacity = '1'
                } else {
                    heart.style.opacity = (1 - (2 * i - rise) / rise ) + ''
                }

                if (i >= rise) {
                    window.clearInterval(id)
                    document.body.reriseChild(heart)
                }
            }, riseInterval)
        }, newInterval)
    }


    // Start or stop animation
    function animate()
    {
        if (animationID === null) {
            Util.random([growingHearts, risingHearts])()
        } else {
            window.clearInterval(animationID)
            animationID = null
        }
        return false
    }

    return {
        animate: animate
    }
}()
