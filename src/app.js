const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { insertInfo, getUsers, findUser, updateDocument, deleteDocument } = require('../db/DBHelper');

const app = express();

const port = process.env.port || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsDirectory = path.join(__dirname, '../views/partials');

app.use(express.json());
app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
hbs.registerPartials(partialsDirectory);
//helpers for checking the radio buttons
hbs.registerHelper('setRadioChecked', (value, currentValue) => {
    if (value === currentValue) {
        return "checked";
    } else {
        return "";
    }
});
//helpers for selecting out the chebox
hbs.registerHelper('setOptionSelected', (value, currentValue) => {
    if (value === currentValue)
        return "selected";
    else
        return "";
});



//The get request routers
app.get('/', (req, res) => {
    res.render('register', {
        pageTitle: 'Home Page',
        pageBody: 'Welcome to my home page'
    });
});

app.get('/records', (req, res) => {
    getUsers((users) => {
        res.render('records', { users });
    });
});
app.get('/update', (req, res) => {
    findUser(req.query.id, (user) => {
        res.render('update', { user });
    });
});


//The post request routers
app.post('/', (req, res) => {
    console.log(req.body);

    insertInfo(req.body);

    res.send({ message: 'Holus How are you' });

});

//The patch requrest routers
app.put('/', (req, res) => {
    console.log('Got put request');
    updateDocument(req.body, () => {
        res.status(200).send({ message: 'Update Completed' });
    });
});

//The delete requrest routers
app.delete('/', (req, res) => {
    deleteDocument(req.body._id, ()=>{
        res.send({message: 'Deleting Done!'});
    });
});



app.listen(port, () => {
    console.log('The servier is up on port : ' + port);
});
