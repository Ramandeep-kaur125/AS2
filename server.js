/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part * of this assignment has
been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.
Name: Ramandeep Kaur
Student ID: 129222238
Date: 10/09/2024
Cyclic Web App URL: https://efficient-four-jumpsuit.glitch.me
GitHub Repository URL: https://github.com/Ramandeep-kaur125/AS2
********************************************************************************/

// Importing the express module
const express = require('express');
const path = require('path');

// Import the store-service module
const storeService = require('./store-service');

// Initializing the express app
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 8080;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route "/" to redirect the user to the "/about" page
app.get('/', (req, res) => {
    res.redirect('/about');
});

// Route "/about" to return the "about.html" file from the "views" folder
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Initialize the store data
storeService.initialize()
    .then(() => {
        console.log("Store data initialized successfully");

        // Start the server after initialization
        app.listen(PORT, () => {
            console.log(`Express http server listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(err);
    });

    // Route for "/items"
app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then(data => {
            res.json(data);  // Send the items as JSON response
        })
        .catch(err => {
            res.status(404).json({ message: err});  // Send the error message if no items found
        });
});

// Route for "/shop"
app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then(data => {
            res.json(data);  // Send the published items as JSON response
        })
        .catch(err => {
            res.status(404).json({ message: err});  // Send the error message if no published items found
        });
});

// Route for "/categories"
app.get('/categories', (req, res) => {
    storeService.getCategories()
        .then(data => {
            res.json(data);  // Send the categories as JSON response
        })
        .catch(err => {
            res.status(404).json({ message: err});  // Send the error message if no categories found
        });
});


// Catch-all route for unmatched routes
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});




