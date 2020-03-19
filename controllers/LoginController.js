let peopleModel = require('../models/peopleData');

exports.getAllPeople = (req,res,next) => {
    if(req.body.usrnm == "A01040888" && req.body.psw == "password") {
        let Peoples = peopleModel.getall();
        Peoples.then( ([rows, fieldData]) => {
             res.render('home', { people: rows });
        });
    } else {
        res.send("Incorrect login details");
    }

};