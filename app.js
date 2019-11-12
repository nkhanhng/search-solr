const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const request = require('request')
const baseUrl = 'http://localhost:8983/solr/quotes/select?q='
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
    // const {query} = q
    // let queryString = query.replace("=",":");

    // pagination
    let pageNumber = req.query.page;
    const limit = 10;
    const start = 0;
    let offset;

    if(!pageNumber){
        offset = start;
    } else if(pageNumber > 0){
        offset = (pageNumber-1) * limit;
    }
    
    request({
        uri: baseUrl,
        method: 'POST',
        json:{
            "query":`text:${q}`,
            "offset": `${offset}`
        }
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