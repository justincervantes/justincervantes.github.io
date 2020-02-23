let express = require('express')
let bodyParser = require('body-parser')
let path = require('path');
let app = express();
app.use(express.json());
let fs = require("fs");
let util = require('util');

const readFile = util.promisify(fs.readFile);

var users;

readFile("users.json","utf-8").
    then(d => users = JSON.parse(d)).
    catch(e => console.log(e))


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'views','home.html'));
})

app.get('/artists/load', (req,res) => {
    res.send(users);
})

app.post('/artist/add', (req,res)=>{
    
    let newuser = {
        name : req.body.name,
        about : req.body.about,
        url : req.body.url
    }

    users["profiles"].push(newuser);

    if(users == undefined) console.log("undefined")
    if(users != undefined) console.log(users);

    res.send(newuser);

    fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
})

app.post('/artist/search', (req,res)=>{

    let searchResults = {
        "profiles" : []
    }

    if(req.body.data == "") {        
        return res.send(users);
    } else {
        for(let i = 0; i < users["profiles"].length; i++) {
            if(users["profiles"][i].name.toLowerCase().includes(req.body.data)) {
                searchResults["profiles"].push(users["profiles"][i]);
            }
        }
        res.send(searchResults);
    }

})

app.delete('/artist/delete', (req,res)=>{
    
    console.log(req.body.data);

    for (let i = 0; i < users['profiles'].length; i++) {
        if(req.body.data == users['profiles'][i].name) {
            users['profiles'].splice(i, 1);
            i--;
        }
    }

    console.log(users);

    res.send("The server is deleting " + req.body.data);

    fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
})

app.listen(7000);