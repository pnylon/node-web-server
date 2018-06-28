const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname  + '/views')

// Middleware function
app.use((req, res, next) => {
    let now = new Date().toString();
    //let time = new Date().getTime().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res) => {
//     res.render('maintenance', {
//         pageTitle: 'Maintenance',
//     })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('scream', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'How the hell did you get here?'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Big fat error happened'
    });
});

app.get('/json', (req, res) => {
    //res.send('<h1>Express is working</h1>');
    res.send({
        name: 'Jom',
        likes: [
            'Peace',
            'Calmness'
        ]
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});