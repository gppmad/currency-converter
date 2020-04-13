"use strict"
const express = require('express')
const app = express()
const port = 8000
const axios = require('axios');

var bodyParser = require('body-parser'); 
var xml_parser = require('fast-xml-parser');
var _ = require('lodash');

// - - - Avoid conflict with app_request - - - 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/api/convert', (req, res) => {
    res.send("Welcome to Currency Converter Server");
});

// Root API
app.post('/api/convert', (req, res) => {
    
    var amount = "";
    var src_currency = "";
    var dest_currency = "";
    var reference_date = "";
    var flag_parameters_ok = false;

    // Fetch value from JSON
    try {
        amount = parseFloat(req.body.amount);
        src_currency = req.body.src_currency;
        dest_currency = req.body.dest_currency;
        reference_date = req.body.reference_date;
        
    }
    catch(error) {
        res.status(400).send("Something is wrong with your parameters");
        return;
    }

    //
    if(amount && src_currency && dest_currency && reference_date ) {

        var final_value = "";
        var jsonObj = {};
        var res_json_obj = {};


        //Fetch data from the ECB Site, if public API is available you are able to consume your API, else server raise a message error.
        axios.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml')
            .then(response => {

                var cube_currency_list = response.data;
                        
                try {
                    if( xml_parser.validate(cube_currency_list) === true) { 

                        var options = {
                            ignoreAttributes : false,
                            trimValues: true
                        };

                        jsonObj = xml_parser.parse(cube_currency_list,options); //Convert Our XML to JSON.
                                              
                        // (1) Find list of currency per Date.
                        var list_per_date = jsonObj['gesmes:Envelope'].Cube.Cube;
                        var index_reference_date = _.findIndex(list_per_date, function(o) { return o['@_time'] == reference_date; });

                        if(index_reference_date == -1 ) {
                            res.send("Date not valid");
                            return;
                        }

                        // (2) Find your currencies value.
                        var currency_list = jsonObj['gesmes:Envelope'].Cube.Cube[index_reference_date].Cube;
                        var src_currency_index = _.findIndex(currency_list, function(o) { return o['@_currency'] == src_currency; });
                        var dest_currency_index = _.findIndex(currency_list, function(o) { return o['@_currency'] == dest_currency; });                                            
                        
                        //Check if inserted currencies are right.
                        if( (src_currency != "EUR" && src_currency_index == -1) || ( dest_currency != "EUR" && dest_currency_index == -1)) {
                            res.send("Currencies not valid");
                            return;
                        }

                        //Case 0 - SRC Currency == DST Currency -- Nothing to do
                        if(src_currency == dest_currency ) {
                            console.log("Case 0 Called");
                            res_json_obj.amount = amount;
                            res_json_obj.currency = dest_currency;
                            res.send(res_json_obj);
                            console.log("Case 0 Executed ");
                            return;
                        }

                        //Case 1 - SRC Currency == "EUR" && Dest Currency != "EUR"
                        if(src_currency == "EUR" && dest_currency != "EUR" ) {
                            console.log("Case 1 Called");
                            var dest_currency_value = currency_list[dest_currency_index]['@_rate'];
                            final_value = amount * parseFloat(dest_currency_value);                                                

                            res_json_obj.amount = final_value.toFixed(2);
                            res_json_obj.currency = dest_currency; 
                            console.log("Case 1 Executed ");  
                        }

                        //Case 2 - SRC Currency != EUR && Dest Currency != EUR
                        if(src_currency != "EUR" && dest_currency != "EUR" ) {
                            console.log("Case 2 Called");
                            var src_currency_value = currency_list[src_currency_index]['@_rate'];
                            var dest_currency_value = currency_list[dest_currency_index]['@_rate'];
                            final_value = parseFloat(1/src_currency_value) * amount * parseFloat(dest_currency_value);

                            res_json_obj.amount = final_value.toFixed(2);
                            res_json_obj.currency = dest_currency; 
                            console.log("Case 2 Executed ");
                        
                        }

                        //Case 3 - SRC Currency != EUR && Dest Currency == EUR
                        if(src_currency != "EUR" && dest_currency == "EUR" ) {
                            console.log("Case 3 Called");
                            var src_currency_value = currency_list[src_currency_index]['@_rate'];
                            final_value = parseFloat(1/src_currency_value) * amount;   

                            res_json_obj.amount = final_value.toFixed(2);
                            res_json_obj.currency = dest_currency;
                            console.log("Case 3 Executed ");     
                        }

                        res.send(res_json_obj);
                    }
                }
                catch (err) {
                    console.log(err);
                }
                
        })
        .catch(error => {
            res.status(500).send ("Convert API Not Available");
        });
    }
    else {
        
        res.status(400).send("Something is wrong with your parameters");
    }
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))