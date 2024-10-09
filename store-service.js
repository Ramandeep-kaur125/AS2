const fs = require('fs');
const path = require('path');

// Function to initialize store service (for example, loading data from items.json)
let items = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, 'data', 'items.json'); // Ensure this path is correct
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Unable to read items.json file');
            } else {
                items = JSON.parse(data);
                resolve();
            }
        });
    });
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length > 0) {
            resolve(items);
        } else {
            reject('No items found');
        }
    });
}

function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published);
        if (publishedItems.length > 0) {
            resolve(publishedItems);
        } else {
            reject('No published items found');
        }
    });
}

function getCategories() {
    return new Promise((resolve, reject) => {
        // Example: assuming categories array is populated somewhere
        if (categories.length > 0) {
            resolve(categories);
        } else {
            reject('No categories found');
        }
    });
}

module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories
};
