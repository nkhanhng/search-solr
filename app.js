const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request')
const baseUrl = 'http://localhost:8983/solr/new_core/select?q='
const path = require('path')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/view'));

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.route('/api/search').get((req, resultToSend) => {
    let q = req.query.text;
    const searchOption = req.query.searchOption;
    let rows = req.query.limit || 10;
    let fields = req.query.fields
    let sort = req.query.sort

    // pagination
    let pageNumber = req.query.page;
    const start = 0;
    let offset;

    if(!pageNumber){
        offset = start;
    } else if(pageNumber > 0){
        offset = (pageNumber-1) * rows;
    }
    
    let searchObject = {
        "query":`${searchOption}:${q}`,
        "offset": `${offset}`,
        "limit": `${rows}`
    }

    if(fields)  searchObject['fields'] = fields;
    if(sort) searchObject['sort'] = sort

    request({
        uri: baseUrl,
        method: 'POST',
        json: searchObject
    },function(error, response, body) {
        if (!error && response.statusCode == 200) {
            resultToSend.json(body)
        }
    })
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/view/search.html'));
})

app.listen(3000,()=>{
    console.log("app is running on port 3000")
}) 