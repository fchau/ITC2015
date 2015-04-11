/**
 * Created by Jason on 4/11/15.
 */


var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key : "5d61227fe2e00928367db4d86ec49b6c",
        secret : "27da18ddf21cdeca",
        user_id: "130780226@N08",
        access_token: "72157651882156351-71ff922105badcb9",
        access_token_secret: "617c202f5d534360"
    },
    express = require('express'),
    router = express.Router(),
    Reports = require('../models/flickr_model').reports,
    http = require('http');

// Initial "start report" request to query 500 images from Flickr
function mostRecent(req, res) {
    var options = {
        api_key: "5d61227fe2e00928367db4d86ec49b6c",
        extras: 'description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o',
        per_page: 500,
        page: 1
    };
    console.log('Authenticating with Flickr...');
    // Perform initial authentication with Flickr and import authorization tokens to bypass user prompts to proceed
    Flickr.authenticate(flickrOptions, function (error, flickr) {
        console.log('Authenticated, getting most recent...');
        // Prompt Flickr API to retrieve most recent images
        flickr.photos.getRecent(options, function (error, results) {
            console.log('Most recent returned!');
            console.log("Most recent returned length", results.photos.photo.length)
            if (error) {
                return;
            }
            var reportData = results.photos
            var newReport = new Reports(reportData);
            //console.log("Results", reportData);
            console.log("Try to save the result into the Reports collection...");
            // Writes the "report" to the collection in MongoDB
            newReport.save(function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("Inside save function.", newReport);
                // Begin a subprocess that runs an agent performing color analysis
                childprocess = require('child_process').fork();
                var cp = require('child_process');
                var child = cp.fork('process.js');

                child.on('message', function(data) {
                    // Perform the PUT request to the server to update image metadata on report images
                    var putData = querystring.stringify({
                        colorData : data.colorData
                    });
                    var options = {
                        hostname: 'localhost',
                        port: 80,
                        path: data.reportId + '/' + data.imgId,
                        method: PUT,
                        headers: {
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                    };

                    var req=http.request(options, function(res) {
                        res.setEncoding('utf8');
                        res.on('data', function(chunk) {
                            console.log("Body: " + chunk)
                        });
                    });
                    req.on('error', function(e) {
                        console.log('Error with PUT request: ' + e.message);
                    });
                    req.write(putData);
                    req.end();

                });
                child.send(newReport);
                res.status(200).jsonp(newReport);
            });
        });
    });
}
// GET request to retrieve report when prompted by client
router.get(':/reportId', function(req, res) {
    var reportId = req.params.reportId;
    Reports.findOne({_id : reportId}).exec(function(err, report) {
        if (err) {
            return res.status(400).jsonp({error: err});
        }
        else {
            return res.status(200).json(report);
        }
    });
});

// PUT request to update report with image metadata as they are analyzed in the child process
router.put(':/reportId/:imgId', function(req, res) {
    var reportId = req.params.reportId;
    var imgId = req.params.imgId;

    var colorData = req.body;

    Reports.findOne({_id : reportId}).exec(function(err, report) {
        if (err) {
            return res.status(400).jsonp({error: err});
        } else {
            var filtered = report.photo.filter(function (photo) {
                return photo.id = imgId;
            });
            filtered[0].colorData = colorData;
            report.save(function(err) {
                if (err) {
                    return res(400).jsonp({Error: err});
                } else {
                    return res(200).jsonp("Successfully updated report " + reportId);
                }
            });
        }
    });
});


module.exports = router;
exports.mostRecent = mostRecent;