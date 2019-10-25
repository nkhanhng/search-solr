const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http')
const baseUrl = 'http://localhost:8983/solr/quotes/select?q='
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.route('/api/query:q').get((req, resultToSend) => {
    let q = req.params['q'];
    console.log(q)
    
    q = q.substring(1)
    let qSplited = q.split("+");
    let keyword = qSplited[0]
    let type = qSplited[1];;

    http.get(`${baseUrl}${type}:${keyword}`,(res)=>{
        res.setEncoding('utf8');
        let body = "";
        res.on("data", data => {
            body += data;
        });

        res.on("end", () => {
            body = JSON.parse(body);
            resultToSend.send({body});
            console.log(`....`)
        })
    })
})


app.listen(3000,()=>{
    console.log("app is running on port 3000")
})