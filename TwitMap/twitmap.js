var fs = require("fs");
var request = require("request");
var keys = require('./config.js');
var Twitter = require('twit');

var client = new Twitter({
    consumer_key: keys.storageConfig.TWITTER_key,
    consumer_secret: keys.storageConfig.TWITTER_secret,
    access_token: keys.storageConfig.TWITTER_access_token,
    access_token_secret: keys.storageConfig.TWITTER_access_token_secret
});

var topics = 'Arsenal,virat,kohli,football,trump,kim,kardashian,music,ManUtd,religion,food, ' +
    'movies,hilary,clinton,chelsea,africa,asia,europe,america,celebraties,disney,goal,GOT,WalkingDead_AMC,cricket,'+
    'president,debate,wwe,india,entertainment,faith,god,premierleague,LaLiga,ChampionsLeague,SerieA_TIM,election,apple'+
    'social,politics,rvp,dance,australia,';


var stream = client.stream('statuses/filter', {track: topics}, {locations: ['-180','-90','180','90']});

    stream.on('tweet', function(tweet) {
        if(tweet.geo != null) { 
            console.log("Tweet: "+tweet.text);
            request({
                uri: 'https://search-elastic-search-bpdenwadbhpyremjbywkf2sklm.us-east-1.es.amazonaws.com/domain/twits',
                method: "POST",
                json: {
                    'username': tweet.user.name,
                    'text': tweet.text,
                    'location': tweet.geo
                }
            }).on('response', function(response) {
                console.log("Row "+response.statusMessage+" with location: "+JSON.stringify(tweet.geo.coordinates));
            });
        }
    });
    stream.on('error', function(error) {
        throw error;
    });

