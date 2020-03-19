let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./util/database');

const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false})); // middleware
app.use(bodyParser.json()); // middleware
let peopleRoutes = require('./routes/peoples');
app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req,res) => {
    res.render('login', {login:true});
})



app.use(peopleRoutes);
app.listen(process.env.PORT || 3000);