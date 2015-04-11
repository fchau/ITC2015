/**
 * Created by Jason on 4/11/15.
 */
var Reports = require('../models/flickr_model').reports;
var http = require('http');

// Begin child process when prompted to perform color analysis
process.on('message', function(m) {
    var color = require('dominant-color');
    var converter = require('color-convert')();
    m.photo.forEach(function(photos) {
        imgPath = photos.url_m;
        var hueColor;
        console.log("This is imgPath: " + imgPath);
        // Retrieves RGB values for each image in the loop
        color(imgPath, {format: 'rgb'}, function(err, color) {
            console.log("Color ", color);
            console.log("Color1 " + color[0]);
            // Given the RGB values for each image, find the hue of the dominant color to identify simple color name
            hueColor = converter.rgb(color[0],color[1], color[2]).hsl();
            console.log(hueColor);
            var hue = hueColor[0];
            var color;
            // Determine name of color based on perceived color hues
            if ((hue >=1 && hue <=18) || (hue>=305 && hue <=359)) {
                color = 'red';
            } else if (hue >=19 && hue <= 41) {
                color = 'orange';
            } else if (hue >=42 && hue <=69) {
                color = 'yellow';
            } else if (hue >=70 && hue <=166) {
                color = 'green';
            } else if (hue >=167 && hue <=251) {
                color = 'blue';
            } else if (hue >=252 && hue <=305) {
                color = 'violet';
            }
            var data = {
                colorData : {
                    dominantColor : color
                }
            };
            // Returns the data object back to the process to begin the PUT request
            return data;
        });

    });
});

process.send(data);