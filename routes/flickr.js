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
    router = express.Router();

function mostRecent(req, res) {
    var options = {
        api_key : "5d61227fe2e00928367db4d86ec49b6c",
        extras: 'description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o',
        page: 1,
        per_page: 500
    };
    console.log('Authenticating with Flickr...');
    Flickr.authenticate(flickrOptions, function(error, flickr) {
        console.log('Authenticated, getting most recent...');
        flickr.photos.getRecent(options, function(error, results) {
            console.log('Most recent returned!');
            if (error) { return; }
            res.send(results);
        });
    });
}

exports.mostRecent = mostRecent;