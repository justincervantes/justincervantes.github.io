const express = require('express');
const loginController = require('../controllers/LoginController');
const peopleController = require('../controllers/PeopleController');
const router = express.Router();

// User logout router
router.get('/logout', (req,res) => {
    res.render('login', {login:true});
})

// User login router
router.post('/',  loginController.getAllPeople);

// Add an artist router
router.post('/add',  peopleController.addPerson);

// Search for an artist name
router.post('/search', peopleController.findPerson);

// Delete artist
router.post('/delete', peopleController.deletePerson);

module.exports = router;
