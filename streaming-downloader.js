var AWS = require('aws-sdk'),
    request = require('request'),
    moment = require('moment'),
    s3Stream = require('s3-upload-stream')(new AWS.S3());

var app = {};

app.download = function() {
  var upload = s3Stream.upload({
    "Bucket": process.env.S3_BUCKET,
    "Key": "atpfm-" + moment().format('YYYY-MM-DD') + ".mp3"
  });

  upload.on('error', function (error) {
    console.log("We got an error.");
    console.log(error);
  });

  upload.on('part', function (details) {
    console.log("Part.");
    console.log(details);
  });

  upload.on('uploaded', function (details) {
    console.log("Upload complete.");
    console.log(details);

    // Finished.
  });

  // http://marco.org:8001/listen

  request.get(process.env.STREAMING_ENDPOINT).pipe(upload);
};

module.exports = app;
