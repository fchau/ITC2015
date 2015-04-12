/**
 * Created by Jason on 4/11/15.
 */


var Flickr = require("flickrapi");
var Reports = require('../models/flickr_model').reports;
var http = require('http');
var express = require('express');
var router = express.Router();
var flickrOptions = {
    api_key : "5d61227fe2e00928367db4d86ec49b6c",
    secret : "27da18ddf21cdeca",
    user_id: "130780226@N08",
    access_token: "72157651882156351-71ff922105badcb9",
    access_token_secret: "617c202f5d534360"
};

// Initial "start report" request to query 500 images from Flickr
var mostRecent = function(req, res) {
    var options = {
        api_key: "5d61227fe2e00928367db4d86ec49b6c",
        extras: 'description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o',
        per_page: 300,
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
            console.log("Try to save the result into the Reports collection...");
            // Writes the "report" to the collection in MongoDB
            newReport.save(function (err) {
                if (err) {
                    return console.error(err);
                }
                //console.log("Inside save function.", newReport);
                // Begin a subprocess that runs an agent performing color analysis
                var cp = require('child_process');
                var child = cp.fork('routes/process.js');

                child.on('message', function(data) {
                    return
                });
                child.send(newReport);
                res.status(200).jsonp(newReport);
            });
        });
    });
};

// GET request to retrieve report when prompted by client
var getReport = function(req, res) {
    var reportId = req.params.reportId;
    Reports.findById(reportId).exec(function(err, report) {
        if (err) {
            return res.status(400).jsonp({error: err});
        }
        else {
            return res.status(200).json(report);
        }
    });
};

// PUT request to update report with image metadata as they are analyzed in the child process
var updateImage = function(req, res) {
    var reportId = req.params.reportId;
    var imgId = req.params.imgId;

    var dominantColor = req.body.dominantColor;

    Reports.findById(reportId).exec(function(err, report) {
        if (err) {
            return res.status(400).jsonp({error: err});
        } else {
            var filtered = report.photo.filter(function (photo) {
                return photo.id === imgId;
            });
            console.log('Filtered photo array langth: ' + filtered.length);
            console.log("First filtered photo Id: ", filtered[0] ? filtered[0].id : 'No filtered photo found');
            filtered[0].dominantColor = dominantColor;
            report.save(function(err) {
                if (err) {
                    return res.status(400).jsonp({Error: err});
                } else {
                    return res.status(200).jsonp("Successfully updated report " + reportId);
                }
            });
        }
    });
};
exports.mostRecent = mostRecent;
exports.getReport = getReport;
exports.updateImage = updateImage;
