/**
 * Created by Jason on 4/11/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReportSchema = new Schema ({
    page: {
        type: Number,
        default: ''
    },
    pages: {
        type: Number,
        default: ''
    },
    perpage: {
        type: Number,
        default: ''
    },
    total: {
        type: Number,
        default: ''
    },
    photo: [{type: Schema.Types.ObjectId, ref: 'FlickrAsset'}],
    stat : {
        type: String,
        default: ''
    }
});

var FlickrSchema = new Schema ({
    id: {
        type: Number,
        default: ''
    },
    owner: {
        type: Number,
        default: ''
    },
    secret: {
        type: String,
        default: ''
    },
    server: {
        type: Number,
        default: ''
    },
    farm: {
        type: Number,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    ispublic: {
        type: Boolean,
        default: ''
    },
    isfriend: {
        type: Boolean,
        default: ''
    },
    isfamily: {
        type: Boolean,
        default: ''
    },
    license: {
        type: Boolean,
        default: ''
    },
    description: [{
        _content: {
            type: Schema.Types.ObjectId, ref: 'Description'}
        }],
    dateupload: {
        type: Number,
        default: ''
    },
    lastupdate: {
        type: Number,
        default: ''
    },
    datetaken: {
        type: Date,
        default: ''
    },
    datetakengranularity : {
        type: Boolean,
        default: ''
    },
    datetakenunknown: {
        type: Boolean,
        default: ''
    },
    ownername: {
        type: String,
        default: ''
    },
    iconserver: {
        type: Number,
        default: ''
    },
    iconfarm: {
        type: Number,
        default: ''
    },
    views: {
        type: Number,
        default: ''
    },
    tags: {
        type: String,
        default: ''
    },
    machine_tags: {
        type: String,
        default: ''
    },
    latitude: {
        type: Number,
        default: ''
    },
    longitude: {
        type: Number,
        default: ''
    },
    accuracy: {
        type: Number,
        default: ''
    },
    context: {
        type: String,
        default: ''
    },
    media: {
        type: String,
        default: ''
    },
    media_status: {
        type: String,
        default: ''
    },
    url_sq: {
        type: String,
        default: ''
    },
    height_sq: {
        type: Number,
        default: ''
    },
    width_sq: {
        type: Number,
        default: ''
    },
    url_t: {
        type: String,
        default: ''
    },
    height_t: {
        type: Number,
        default: ''
    },
    width_t: {
        type: Number,
        default: ''
    },
    url_s: {
        type: String,
        default: ''
    },
    height_s : {
        type: Number,
        default: ''
    },
    width_s: {
        type: String,
        default: ''
    },
    url_q: {
        type: String,
        default: ''
    },
    height_q: {
        type: Number,
        default: ''
    },
    width_q: {
        type: Number,
        default: ''
    },
    url_m: {
        type: String,
        default: ''
    },
    height_m: {
        type: Number,
        default: ''
    },
    width_m: {
        type: Number,
        default: ''
    },
    url_n: {
        type: String,
        default: ''
    },
    height_n: {
        type: Number,
        default: ''
    },
    width_n: {
        type: Number,
        default: ''
    },
    url_z: {
        type: String,
        default: ''
    },
    height_z: {
        type: Number,
        default: ''
    },
    width_z: {
        type: Number,
        default: ''
    },
    pathalias: {
        type: String,
        default: ''
    }
});

exports.flickr = mongoose.model('Reports', ReportSchema);
exports.flickr = mongoose.model('FlickrAsset', FlickrSchema);