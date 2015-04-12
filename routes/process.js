/**
 * Created by Jason on 4/11/15.
 */
var Reports = require('../models/flickr_model').reports;
var http = require('http');
var converter = require('color-convert')();
var dominantcolor = require('dominant-color');

// Begin child process when prompted to perform color analysis
process.on('message', function(m) {
    console.log("I hit the process.");
    m.photo.forEach(function (photos) {
        var imgPath = photos.url_s;
        // Retrieves RGB values for each image in the loop
        return dominantcolor(imgPath, {format: 'rgb'}, function (err, clr) {
            if(err)next(err);
            var hslValues = converter.rgb(clr).hsl();
            var hue = hslValues[0];
            var color;
            if ((hue >= 1 && hue <= 18) || (hue >= 305 && hue <= 359)) {
                color = 'red';
            } else if (hue >= 19 && hue <= 41) {
                color = 'orange';
            } else if (hue >= 42 && hue <= 69) {
                color = 'yellow';
            } else if (hue >= 70 && hue <= 166) {
                color = 'green';
            } else if (hue >= 167 && hue <= 251) {
                color = 'blue';
            } else if (hue >= 252 && hue <= 305) {
                color = 'violet';
            }
            console.log("Color", color);
            console.log("Image ID? ", photos._id);
            var data = {
                dominantColor: color,
                imageId : photos._id
            };
            console.log("Data is ", data);
            return process.send(data);
        });
    });
});