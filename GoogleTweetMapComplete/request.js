module.exports = function(app){
    var elasticsearch = require('elasticsearch');

    var q = require("q");


    var client = new elasticsearch.Client({
        host: 'https://search-elastic-search-bpdenwadbhpyremjbywkf2sklm.us-east-1.es.amazonaws.com/domain/twits'
    });


    var category = ["Sports","Music","Trump","Food","Dance","Football","Movies","Entertainment","Election","Disney"];

    function es(type){
        var deferred = q.defer();

        var myLat = [];
        var myLng = [];
        
        if(type == "Sports"){type = category[0];}
        else if(type == "Music"){type = category[1];}
        else if(type == "Trump"){type = category[2];}
        else if(type == "Food"){type = category[3];}
        else if(type == "Dance"){type = category[4];}
        else if(type == "Football"){type = category[5];}
        else if(type == "Movies"){type = category[6];}
        else if(type == "Entertainment"){type = category[7];}
        else if(type == "Election"){type = category[8];}
        else if(type == "Disney"){type = category[9];}

        client.search({
            size: 10000,
            q: type

        }).then(function (body) {
            var hits = body.hits.hits;
            console.log("hits length count : "+hits.length);
            deferred.resolve(hits);
        }, function (error) {
            console.trace(error.message);
            deferred.reject(error);
        });
        return deferred.promise;

    }

    
    app.get("/api/tweet/:type",querysearch)


    function querysearch(req,res){

        var type=req.params.type;
        console.log(type);
       es(type)
           .then(function(result){
            console.log("hits length sent : "+result.length);
            res.json(result)});

    }

};