/**
 * ResizerCanvas.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
 * Resizes image/canvas using canvas
 */
define("moxie/runtime/html5/image/ResizerCanvas", [], function() {

    function scale(image, ratio) {
        var sW = image.width;
        var dW = Math.floor(sW * ratio);
        var scaleCapped = false;

        if (ratio < 0.5 || ratio > 2) {
            ratio = ratio < 0.5 ? 0.5 : 2;
            scaleCapped = true;
        }

        var tCanvas = _scale(image, ratio);

        if (scaleCapped) {
            return scale(tCanvas, dW / tCanvas.width);
        } else {
            return tCanvas;
        }
    }


    function _scale(image, ratio) {
        var sW = image.width;
        var sH = image.height;
        var dW = Math.floor(sW * ratio);
        var dH = Math.floor(sH * ratio);

        var canvas = document.createElement('canvas');
        canvas.width = dW;
        canvas.height = dH;
        canvas.getContext("2d").drawImage(image, 0, 0, sW, sH, 0, 0, dW, dH);

        image = null; // just in case
        return canvas;
    }

    return {
        scale: scale
    };

});
