const fs = require('fs');
const path = require('path');

// Function to initialize store service 
let items = [];
let categories = [];
 
function initialize() {
    return new Promise((resolve, reject) => {
        const itemsFilePath = path.join(__dirname, 'items.json');
        const categoriesFilePath = path.join(__dirname, 'categories.json');
        
        fs.readFile(itemsFilePath, 'utf8', (err, data) => {
            if (err) {
                reject('Unable to read items.json file');
            } else {
                items = JSON.parse(data);

                // Read categories after items
                fs.readFile(categoriesFilePath, 'utf8', (err, data) => {
                    if (err) {
                        reject('Unable to read categories.json file');
                    } else {
                        categories = JSON.parse(data);
                        resolve();
                    }
                });
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

    items = []; // Array to hold items

function addItem(itemData) {
  return new Promise((resolve, reject) => {
    // Set the published property to false if it's undefined
    itemData.published = itemData.published !== undefined;

    // Set the id property to the length of the items array + 1
    itemData.id = items.length + 1;

    // Add the new item to the items array
    items.push(itemData);

   // Save updated items back to the file
   const itemsFilePath = path.join(__dirname, 'items.json');
   fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), (err) => {
       if (err) {
           reject('Unable to save item to items.json');
       } else {
           resolve(itemData); // Resolve with the new item
       }
   });
   
  });
}

// New function to filter items by category
function getItemsByCategory(category) {
    return new Promise((resolve, reject) => {
        const filteredItems = items.filter(item => item.category == category);
        if (filteredItems.length > 0) {
            resolve(filteredItems);
        } else {
            reject('No items found for the specified category');
        }
    });
}

function getItemsByMinDate(minDateStr) {
    return new Promise((resolve, reject) => {
        const filteredItems = items.filter(item => new Date(item.postDate) >= new Date(minDateStr));
        if (filteredItems.length > 0) {
            resolve(filteredItems);
        } else {
            reject('no results returned');
        }
    });
}

function getItemById(id) {
    return new Promise((resolve, reject) => {
        const foundItem = items.find(item => item.id === id);
        if (foundItem) {
            resolve(foundItem);
        } else {
            reject('no result returned');
        }
    });
}


module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories,
    getItems: () => items, 
    addItem,
    getItemsByCategory,
    getItemsByMinDate,
    getItemById
}

