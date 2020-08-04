var exp = require('express');                  // express 
var app = exp();                               // object of express to represent this application
var path = require('path');                    // path for getting absolute path
var bodyParser = require('body-parser');       // to parse objects in req.body
var cors = require('cors');                    // to connect to another platform
var routes = require('./routes/appRoutes');    // routes for functions
const PORT = 8081;                             // port number
const fs = require('fs');
const axios = require('axios');
var cmd = require('node-command-line');
var zipdir = require('zip-dir');
const find = require('find-process');
const converter = require('html-to-jsx/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const url = ' https://automl.googleapis.com/v1beta1/projects/167373267132/locations/us-central1/models/IOD7727574428195749888:predict';
const token = 'ya29.c.Ko8BzAcgn1vYJYY6JYbKDCwbxVMOCEKcpl5CywttJsMiuPhh7SuEP9WZGjwYxksGgopBEsaLBNDF5e4ZdtHouoYBTlaawlz8F3vmUYqeJSqbj8oT6nmHG7lwCK3ThCM6DgO4NgeMLNY83HCZ0JvyXp9Po3FpJOopOJhQ5VTSSRMNUDZm1qBEJY5Nhv2fqqf-Yo0';


app.post('/sample', (req, res) => {
        console.log(req.body);
        res.send(req.body);
});

app.get('/copyImage', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname,'./assets/default_image.jpg'));
    fs.writeFileSync(path.join(__dirname,'./images/default_image.jpg') , data , 'base64');
    res.send('done');
})

app.get('/converter', (req, res) => {
    const sample = converter('<div class="container" id="div0" style="position :relative; background-color: yellow;">\n  <div id="div1" style="position :relative; margin :2%; height :554.5px;">\n    <form>\n      <button (click)="sendData($event)" formaction="http://localhost:8081/sample" formmethod="post" formtarget="_blank" class="btn btn-primary" id="button1" style="top :347.21px; left :249.07px;  position :absolute; text-align: center;" type="button">Send</button>\n      <input class="form-control" id="textbox1" name="textbox1" style="top :28.81px; left :249.07px;  position :absolute; width :20%; text-align: center;" type="text">\n      <select class="form-control" id="dropdown1" name="dropdown1" style="top :124.36px; left :249.07px;  position :absolute; width :20%; text-align: center;">\n        <option value="select">select</option>\n        <option value=""></option>\n      </select>\n      <label class=" " id="label1" style="top :124.36px; left :75.93px;  position :absolute; width :79.98px; text-align: center;">type</label>\n      <label class=" " id="label2" style="top :290.2px; left :75.93px;  position :absolute; width :104.89px; text-align: center;">choice</label>\n      <p class=" " id="checkbox1" style="top :290.2px; left :249.07px;  position :absolute; text-align: center;">\n        <input id="checkbox1" name="checkbox1" type="checkbox" value="check I">check I\n      </p>\n      <label class=" " id="label3" style="top :223.71px; left :75.93px;  position :absolute; width :111.98px; text-align: center;">Strange</label>\n      <p class=" " id="radio1" style="top :223.71px; left :249.07px;  position :absolute; text-align: center;">\n        <input id="radio1" name="radio" type="radio" value="O Yes">O Yes\n      </p>\n      <p class=" " id="radio2" style="top :223.71px; left :357.84px;  position :absolute; text-align: center;">\n        <input id="radio2" name="radio" type="radio" value="No">No\n      </p>\n      <img alt="1" class="img-fluid" height="153.73" id="image1" onerror="this.onerror=null; this.src=\'../../../../assets/default_image.jpg\'" src="../../assets/default_image.jpg" style="top :28.81px; left :564.62px;  position :absolute; text-align: center;" width="196.16">\n      <label class=" " id="label4" style="top :28.81px; left :75.93px;  position :absolute; width :105.67px;text-align: center;">Name</label>\n      <p class=" " id="checkbox2" style="top :290.2px; left :427.4px;  position :absolute;">\n        <input id="checkbox2" name="checkbox2" type="checkbox" value="undeck">undeck\n      </p>\n      <label class=" " id="label5" style="top :190.56px; left :564.62px;  position :absolute; width :216.17px; text-align: center;">Seventy pe.in&gt;</label>\n    </form>\n  </div>\n</div>');
    console.log(typeof sample);
    res.send(sample);
});

app.get('/reactHtml', (req, res) => {
    let htmlSampl = fs.readFileSync(path.join(__dirname,'./outputHtml/sample.html'));
    let pos = 0;let sIndex = 0; let equalIndex = 0; let fdqIndex = 0; let sdqIndex = 0; let tagStyle = '';
    htmlSampl = htmlSampl.toString();
    while(sIndex != -1) {
        sIndex = htmlSampl.indexOf('style', pos);
        equalIndex = htmlSampl.indexOf('=',sIndex+1);
        fdqIndex = htmlSampl.indexOf('"',sIndex+1);
        sdqIndex = htmlSampl.indexOf('"',fdqIndex+1);
        pos = sdqIndex + 1;
        tagStyle = htmlSampl.slice(fdqIndex, sdqIndex+1);
        tagStyle = '{{' + tagStyle.split(":").join(":'").split(";").join("';").split('"').join('').split(';').join(',') + '}}';
        htmlSampl = htmlSampl.slice(0,equalIndex+1) + tagStyle + htmlSampl.slice(pos);
    }
    console.log(htmlSampl);
    res.send(htmlSampl);
});

app.post('/updateData',(req,res)=>{
    // console.log(req.body.fileName);
    
    fs.writeFile(path.join(__dirname, "./outputHtml/"+req.body.fileName), req.body.code, (err)=>{
        if(err){
            res.status(404).send('Error '+err);
        }
        else{
            res.send('Done');
        }
    })
    // fs.readFile(path.join(__dirname, "./outputHtml/"+req.body.fileName),"utf8",(err,data)=>{
    //     if(err){
    //         res.status(404).send('Error '+err);
    //     }
    //     else{
    //         console.log(data);
    //         console.log(typeof(data));
    //         console.log(typeof req.body.code.replace('\\n',''));
    //         console.log(data === req.body.code.replace('\\n',''));
    //         res.send('Done');
    //     }
    // })
})

app.get('/image',(req,res)=>{
    data = fs.readFileSync(path.join(__dirname,'./CarRent.jpg'));
    // console.log(data.toString('base64'));
    console.log(data);
    console.log(typeof data);
    res.send('data');
})
app.get('/predict',(req,res)=>{
    // resultData = JSON.parse(fs.readFileSync(path.join(__dirname,'./productdata.json')));
    const image = fs.readFileSync(path.join(__dirname,'./t9img.JPG')).toString('base64');
    
    axios.post(url,
    {"payload": {"image": {"imageBytes":image}}},
    {headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token}})
    .then( (response)=> {
        console.log(response.data);
        if(response.data.payload){
            res.send(postProcess(response.data.payload));
        } else {
            res.send([]);
        }
        
      })
      .catch( (error) => {
        console.log(error);
        res.status(400).send(error);
      });
    //  console.log(resultData);
     
    // res.send(postProcess(resultData.payload));
})

function postProcess(data) {
    result = data.reduce((r,a) => {
        r[a.displayName] = (r[a.displayName] || []).concat(a);
        return r;
    },{});

    if(result.column) {
        result.column.sort((a,b) => (a.imageObjectDetection.boundingBox.normalizedVertices[0].x > b.imageObjectDetection.boundingBox.normalizedVertices[0].x) ? 1 : ((a.imageObjectDetection.boundingBox.normalizedVertices[0].x < b.imageObjectDetection.boundingBox.normalizedVertices[0].x) ? -1 : 0));
    } else {
        result['column'] = [];
    }

    if(result.row) {
        result.row.sort((a,b) => (a.imageObjectDetection.boundingBox.normalizedVertices[0].y > b.imageObjectDetection.boundingBox.normalizedVertices[0].y) ? 1 : ((a.imageObjectDetection.boundingBox.normalizedVertices[0].y < b.imageObjectDetection.boundingBox.normalizedVertices[0].y) ? -1 : 0));
    } else {
        result['row'] = [];
    }

    if(result.table) {
        result.table.sort((a,b) => (a.imageObjectDetection.boundingBox.normalizedVertices[0].y > b.imageObjectDetection.boundingBox.normalizedVertices[0].y) ? 1 : ((a.imageObjectDetection.boundingBox.normalizedVertices[0].y < b.imageObjectDetection.boundingBox.normalizedVertices[0].y) ? -1 : 0));
    } else {
        result['table'] = [];
    }

    response = {data:[]}

    result.table.map((tab, ti) => {
        response.data.push({x1: tab.imageObjectDetection.boundingBox.normalizedVertices[0].x, y1: tab.imageObjectDetection.boundingBox.normalizedVertices[0].y, x2: tab.imageObjectDetection.boundingBox.normalizedVertices[1].x, y2: tab.imageObjectDetection.boundingBox.normalizedVertices[1].y});
        
        result.column.forEach((col, ci) => {
            if(col && tab.imageObjectDetection.boundingBox.normalizedVertices[1].y >= col.imageObjectDetection.boundingBox.normalizedVertices[0].y) {
                response.data[ti]['column'] = (response.data[ti]['column'] || []).concat({x1: col.imageObjectDetection.boundingBox.normalizedVertices[0].x, y1: col.imageObjectDetection.boundingBox.normalizedVertices[0].y, x2: col.imageObjectDetection.boundingBox.normalizedVertices[1].x, y2: col.imageObjectDetection.boundingBox.normalizedVertices[1].y});
                delete result.column[ci];
            }
        });
        result.row.forEach((ro, ri) => {
            if(ro && tab.imageObjectDetection.boundingBox.normalizedVertices[1].y >= ro.imageObjectDetection.boundingBox.normalizedVertices[0].y) {
                response.data[ti]['row'] = (response.data[ti]['row'] || []).concat({x1: ro.imageObjectDetection.boundingBox.normalizedVertices[0].x, y1: ro.imageObjectDetection.boundingBox.normalizedVertices[0].y, x2: ro.imageObjectDetection.boundingBox.normalizedVertices[1].x, y2: ro.imageObjectDetection.boundingBox.normalizedVertices[1].y});
                delete result.row[ri];
            }
        });
    })
    
    return response.data;
}

app.get('/cmd',(req,res)=>{
    let result = [{"x1":0.08131335,"y1":0.5838722,"x2":0.75013304,"y2":0.9637501,"column":[{"x1":0.107279375,"y1":0.6382201,"x2":0.23464361,"y2":0.95975417},{"x1":0.23614743,"y1":0.64156276,"x2":0.3368647,"y2":0.9610705},{"x1":0.33286548,"y1":0.634039,"x2":0.44071144,"y2":0.95899695},{"x1":0.44105506,"y1":0.63090914,"x2":0.7082432,"y2":0.9503824}],"row":[{"x1":0.111808084,"y1":0.59227633,"x2":0.7616031,"y2":0.6432953},{"x1":0.10297922,"y1":0.6420183,"x2":0.7321277,"y2":0.6966628},{"x1":0.0965579,"y1":0.69140047,"x2":0.7458533,"y2":0.7459031},{"x1":0.09219977,"y1":0.74449754,"x2":0.72975963,"y2":0.8036777},{"x1":0.09965847,"y1":0.80687857,"x2":0.73662144,"y2":0.8690068},{"x1":0.11016931,"y1":0.8723457,"x2":0.7360015,"y2":0.9444709}]}];
    cmd.run('python D:/node/nodejsproject/src/trial.py -c D:/node/nodejsproject/src/agent-minutes-lufthansa-cargo-685d47a1897c.json -i D:/node/nodejsproject/src/flight_search.JPG -r '+JSON.stringify(result).split('"').join("'")).then(()=>{console.log('done');
    // cmd.run('python --version').then(()=>{
    res.send('success')
    }).catch(err=>{console.log(err);
        res.status(400).send(err);
    });
})

app.get('/run',(req,res)=>{
    cmd.run("cd "+path.join(__dirname,"./outpuAngular/CarRent")+" && npm start &").then(()=>{
    // cmd.run('start  /D "D:/node/nodejsproject/src/outpuAngular/CarRent" /b npm start').then(()=>{
        res.send('Working');
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    })
    
})

app.get('/zipProject/:projectName',(req,res)=>{
    find('port',4202, true).then((result)=>{
        if (result.length != 0) {
        process.kill(result[0].pid)
        }
    }).then(()=>{
        zipdir('D:/node/nodejsproject/src/outpuAngular/'+req.params.projectName, { filter: (path, stat) => !/node_modules$/.test(path) }, function (err, buffer) {
            if(err){
                console.log(err);
                res.status(400).send(err);
            }
            res.setHeader("Content-Type", "application/zip");
            res.setHeader("Content-Disposition", "attachment; filename="+req.params.projectName+".zip");
            res.send(buffer);
        });
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    })
    
})

app.use('/src/outputtestimage', exp.static(path.join(__dirname, "./outputtestimage")));
app.use('/src/outputHtml', exp.static(path.join(__dirname, "./outputHtml")));
app.use('/', routes);


app.listen(PORT, () => {                                      //application to listen to that PORT
    console.log("Server is running in localhost:" + PORT);
})

