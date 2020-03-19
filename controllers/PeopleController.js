let peopleModel = require('../models/peopleData');

exports.addPerson = (req,res,next) => {
    
    let p_name = req.body.name;
    let p_about = req.body.about;
    let p_imageURL = req.body.imageURL;
    
    let pOject = {
       name: p_name,
       about: p_about,
       imageURL: p_imageURL
    }

    peopleModel.add(pOject);
    
}

exports.findPerson = (req,res,next) => {

    let p_name = req.body.namesearch;
    console.log(req.body.namesearch);
    console.log(req.body.name);

    if (p_name != undefined) {
        let Peoples = peopleModel.getpeople(p_name);
        Peoples.then( ([rows, fieldData]) => {
            res.render('home', { people: rows });
        });
    } else {
        let Peoples = peopleModel.getall();
        Peoples.then( ([rows, fieldData]) => {
            res.render('home', { people: rows });
        });
    }
}

exports.deletePerson = (req,res,next) => {

    peopleModel.deleteperson(req.body.id);
    let Peoples = peopleModel.getall();
    Peoples.then( ([rows, fieldData]) => {
        res.render('home', { people: rows });
    });
}