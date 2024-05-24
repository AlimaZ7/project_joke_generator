//Name:Alima Zaman

const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

//middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//seting EJS as the template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//serve static files from the public folder, css
app.use(express.static('public'));

//route to homepage
app.get('/', (req,res) => {
    res.render('index');
});

//route to get a joke
app.post('/get-joke', async (req,res) => {
    const {name} = req.body;//get the user's name from the request
    try {
        //do a get request to API to get a joke
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?safe-mode');
        //get the joke from the response data
        const joke = response.data.joke || `${response.data.setup} - ${response.data.delivery}`;
        res.render('index', {joke}); //pass the joke variable to the template
    } catch (error) {
        console.error('Error fetching joke:', error);//error if cant get joke
        res.status(500).send('Error fetching joke');//send error message
    }
});

//to start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});