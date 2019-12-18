const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request')
// const baseUrl = 'http://localhost:8983/solr/spiderum/select?q='
// const baseUrl = "http://localhost:8983/solr/spiderum/select?hl.fl=post_overview&hl.simple.post=%3C%2Fstrong%3E&hl.simple.pre=%3Cstrong%3E&hl=on&q="
const baseUrl = "http://localhost:8983/solr/spiderum/select?hl.fl=post_overview&hl.simple.post=%3C%2Fspan%3E&hl.simple.pre=%3Cspan%20style%3D%22color%3Aviolet%3Bfont-weight%3Abold%22%3E&hl=on&q="

const path = require('path')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/view'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
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