/*
    Peyton Adkins
    October 23rd, 2023

    This project is for personal understanding of FireBase and website deployment for use in future projects
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

function clearInputField(element) {
    element.value = "";
    return 0;
}

function appendShoppingListItem(parent, HTML) {
    parent.innerHTML += HTML;
}

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// – – – Database Config

const appSettings = {
    databaseURL: 'https://add-to-cart-754eb-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

// – – – Add to cart button functionality

let buttonInput = document.querySelector("#input-field");

let addToCartButton = document.querySelector("#add-button");
addToCartButton.addEventListener("click", function() {

    let buttonInputValue = buttonInput.value;
    let liElement = `<li>${buttonInputValue}</li>`;
    let ulElement = document.querySelector('#shopping-list');

    // Push to Firebase realtime database
    push(shoppingListInDB, buttonInputValue);
    
    // Append <li> element
    appendShoppingListItem(ulElement, liElement);

    // Clear input field
    clearInputField(buttonInput);
})