/**
 * Created by Jason on 4/11/15.
 */

var cp = require('child_process');
var http = require('http');
var photos = null;
var batchSize = 5;
var batches = [];

// Begin child process when prompted to create batch jobs of color analyses
process.on('message', function(m) {
    var rawPhotos = m.photo;
    var reportId = m._id;
    for (var i = 0; i < rawPhotos.length; i += batchSize) {
        var batch = rawPhotos.slice(i, i + batchSize);
        batches.push(batch);
        console.log("Pushed new batch: " + batch);
    }
    batches.forEach(function (batch) {
        var child = cp.fork('routes/analyze.js');
        child.on('message', function(data) {
            //Perform the PUT request to the server to update image metadata on report images
            var dataString = JSON.stringify(data);
            var headers = {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length
            };
            var options = {
                hostname: 'localhost',
                port: 3000,
                path: '/flickr/' + reportId + '/' + data.imageId,
                method: "PUT",
                headers: headers
            };

            var putReq=http.request(options, function(putRes) {
                putRes.setEncoding('utf8');
                putRes.on('data', function(chunk) {
                    console.log("Body: " + chunk)
                });
            });
            putReq.on('error', function(e) {
                console.log('Error with PUT request: ' + e.message);
            });
            putReq.write(dataString);
            putReq.end();
            return process.send(data)
        });
        child.send(batch);
    });
});