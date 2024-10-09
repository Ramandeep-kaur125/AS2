// Importing the required fs module
const fs = require("fs");
const path = require("path");

// Global arrays to hold items and categories
let items = [];
let categories = [];

// Function to initialize the data
function initialize() {
    return new Promise((resolve, reject) => {
        // Read items.json
        fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
            if (err) {
                return reject("Unable to read items.json file");
            }
            // Parse the JSON data into an array of objects and assign it to items
            items = JSON.parse(data);

            // Read categories.json after items.json is successfully read
            fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
                if (err) {
                    return reject("Unable to read categories.json file");
                }
                // Parse the JSON data into an array of objects and assign it to categories
                categories = JSON.parse(data);

                // Resolve the promise indicating success
                resolve("Data initialized successfully");
            });
        });
    });
}

// Function to get all items
function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length > 0) {
            resolve(items);  // Resolve with the items array
        } else {
            reject("No results returned");  // Reject with an error message if empty
        }
    });
}

// Function to get published items
function getPublishedItems() {
    return new Promise((resolve, reject) => {
        // Filter items where published property is true
        const publishedItems = items.filter(item => item.published === true);
        
        if (publishedItems.length > 0) {
            resolve(publishedItems);  // Resolve with the published items array
        } else {
            reject("No results returned");  // Reject if no published items are found
        }
    });
}

// Function to get all categories
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length > 0) {
            resolve(categories);  // Resolve with the categories array
        } else {
            reject("No results returned");  // Reject if no categories found
        }
    });
}

// Export the initialize function
module.exports = {
    initialize,
    getAllItems,         // Export the getAllItems function
    getPublishedItems,   // Export the getPublishedItems function
    getCategories,       // Export the getCategories function
    getItems: () => items,         // Function to access items
    getCategories: () => categories  // Function to access categories
};
