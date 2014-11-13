var util = require('util'),
  twitter = require('twitter');

var twit = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var app = {};

app.isLive = function() { };

// atpfm: 1253355925
// atpfm_tester: 2898401162

app.init = function() {
  twit.stream('statuses/filter', { follow: process.env.TWITTER_WATCH_ID }, function(stream) {
    stream.on('data', function(data) {
      if (data.text.match(/We['’]re live/i)) {
        app.isLive();
      }
    });
  });
};

module.exports = app;
