let db = require('../util/database');

// Add a single individual to the database
function addPeople(data) {
    let sql = "Insert into people (name, about, imageURL) values ('" + data.name+ "','"+ data.about+ "','" + data.imageURL + "')";
    db.execute(sql);
}

// Gets all the individuals in the database
function getAllPeople() {
    return db.execute('Select * from people');
}

// Gets a specific individual from the database
function getPeople(name) {
    return db.execute("Select * from people where name LIKE '%" + name + "%'");
}


function deletePerson(id) {
    console.log(id);
    let sql = "DELETE FROM people WHERE id='" + id + "'";
    db.execute(sql);
}
module.exports = {
    add : addPeople,
    getall : getAllPeople,
    getpeople: getPeople,
    deleteperson: deletePerson
}