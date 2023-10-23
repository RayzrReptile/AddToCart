/*
    Peyton Adkins
    October 23rd, 2023

    This project is for personal understanding of FireBase and website deployment for use in future projects
*/

// Add to cart button functionality
let addToCartButton = document.querySelector("#add-button");
addToCartButton.addEventListener("click", function() {
    let buttonInputValue = document.querySelector("#input-field").value;
    console.log(buttonInputValue);
})