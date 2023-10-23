/*
    Peyton Adkins
    October 23rd, 2023

    This project is for personal understanding of FireBase and website deployment for use in future projects
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

function clearInputField(element) {
    element.value = "";
    return 0;
}

function appendShoppingListItem(parent, item) {
    let text = item[1];
    let id = item[0];

    // Create <li> element
    let li = document.createElement("li");
    li.textContent = text;

    // Delete functionality
    li.addEventListener("dblclick", function() {
        let locationInDB = ref(database, `shoppingList/${id}`)
        remove(locationInDB);
    });

    // Append to <ul> parent element
    parent.appendChild(li);

    disclaimer.classList.add("hidden");
}

function clearShoppingList(element) {
    element.innerHTML = "";
}

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// – – – Database Config

const appSettings = {
    databaseURL: 'https://add-to-cart-754eb-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

let buttonInput = document.querySelector("#input-field");
let addToCartButton = document.querySelector("#add-button");
let ulElement = document.querySelector('#shopping-list');
let disclaimer = document.querySelector('#disclaimer');

// – – – Database value realtime handling

onValue(shoppingListInDB, function(snapshot) {
    // If there exists items in the database
    if (snapshot.exists()) {
        let listItemsArray = Object.entries(snapshot.val());

        // Clear list on site
        clearShoppingList(ulElement);
    
        // Configure shopping list
        for (let i = 0; i < listItemsArray.length; i++) {
            let currentItem = listItemsArray[i];
    
            appendShoppingListItem(ulElement, currentItem);
        }
    }
    else {
        // Clear list on site
        clearShoppingList(ulElement);

        disclaimer.classList.remove("hidden");
        disclaimer.textContent = "No items here... yet";
    }
})

// – – – Enter click functionality for text input field

buttonInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    // If key pressed is "enter"
    if (event.keyCode === 13) {
        addToCartButton.click();
    }
});

// – – – Add to cart button functionality

addToCartButton.addEventListener("click", function() {

    let buttonInputValue = buttonInput.value;

    if (buttonInputValue != ""){
        // Push to realtime database
        push(shoppingListInDB, buttonInputValue);

        // Clear input field
        clearInputField(buttonInput);
    }
    else {
        disclaimer.classList.remove("hidden");
        disclaimer.textContent = "Add an item to the text field";
    }
})