//This section controls the dice roll behavior when the zero dice image is clicked. It shakes the dice image, changes the value of the dice, and plays a dice rolling sound.
let images = ["images/dice-00.png",
"images/dice-01.png",
"images/dice-02.png",
"images/dice-03.png",
"images/dice-04.png",
"images/dice-05.png",
"images/dice-06.png",
"images/dice-07.png",
"images/dice-08.png",
"images/dice-09.png",
"images/dice-10.png"];

let dice = document.querySelectorAll(".dice-wrapper");

//This function plays a rolling dice audio file when the dice is clicked.
function play() {
    var audio = document.getElementById("diceAudio");
    audio.play();
  }

//This function shakes the dice image, picks a random dice roll between 1 & 10 and then displays the corresponding new dice image.
function roll(){
    dice.forEach(function(die){
        die.classList.add("shake");   
    });
    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake");
        });
        let dieValue = Math.floor(Math.random()*(10-1+1))+1
        ;
        Math.floor(Math.random()*10)+1
        ;
        console.log(dieValue);
        document.querySelector("#die-0").setAttribute("src", images[dieValue]);
    },
    1250
    );
}

//This informs the user that the "Changes you made may not be saved" if you reload the page. It is a fail safe option in case someone accidentally refreshes their screen. If a refresh is successful, then the data on the page is lost.
window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = '';
});

document.addEventListener("DOMContentLoaded", function() {
// Get the character parameter (e.g. ?character=mario) from the URL
const urlParams = new URLSearchParams(window.location.search);
const character = urlParams.get('character');

// This defines the CSS files and character name to be displayed when a character is chosen on the character selection page. For instance, if Mario is the chosen character, then the page that is displayed on click has a red background and says "Mario" at the top of the page.
const characterData = {
    'mario': {
        cssFile: 'mario.css',
        name: 'Mario',
        image: 'images/mario_main_img.svg'
    },
    'boo': {
        cssFile: 'boo.css',
        name: 'Boo',
        image: 'images/boo_main_img.png'
    },
    'bobomb': {
        cssFile: 'bobomb.css',
        name: 'Bob-omb',
        image: 'images/bobomb.svg'
    },
    'drybones': {
        cssFile: 'drybones.css',
        name: 'Dry Bones',
        image: 'images/drybones.svg'
    },
    'yoshi': {
        cssFile: 'yoshi.css',
        name: 'Yoshi',
        image: 'images/yoshi.jpeg'
    },
    'peach': {
        cssFile: 'peach.css',
        name: 'Peach',
        image: 'images/peach.svg'
    },
    'rosalina': {
        cssFile: 'rosalina.css',
        name: 'Rosalina',
        image: 'images/rosalina.svg'
    },
    'koopa': {
        cssFile: 'koopa.css',
        name: 'Koopa',
        image: 'images/koopa.svg'
    },
    'cattoad': {
        cssFile: 'cattoad.css',
        name: 'Cat Toad',
        image: 'images/cattoad.svg'
    },
    // Add more characters and CSS files as needed
};

// Dynamically load the CSS file for the selected character
if (characterData[character]) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = characterData[character].cssFile;
    document.head.appendChild(link);

    // Update the character name in the <h1> element
    document.getElementById('character-name').textContent = characterData[character].name;

    // Update the character and item images
    document.getElementById('character-image').src = characterData[character].image;
}

// Define item images for each item
const itemImages = {
    'Item': 'images/item_box_alt.svg',
    'Red Mushroom': 'images/mushroom_red.svg',
    'Gold Mushroom': 'images/mushroom_gold.svg',
    'Poison Mushroom': 'images/mushroom_poison.svg',
    'Reverse Mushroom': 'images/mushroom_reverse.svg',
    'Genie Lamp': 'images/lamp_genie.svg',
    'Blue Lamp': 'images/lamp_blue.svg',
    'Key': 'images/key.svg',
    'Boo Bell': 'images/boo_bell.svg',
    'Boo Spray': 'images/boo_spray.svg',
    'Dueling Glove': 'images/dueling_glove.svg',
    'Plunder Chest': 'images/plunder_chest.svg',
    'Warp Block': 'images/warp_block.svg'

    // Add more items and image paths as needed
};

const itemDescriptions = {
    'Item': 'Select an item from the dropdown menu to display it here.',
    'Red Mushroom': 'Adds 5 to your roll.',
    'Gold Mushroom': 'Adds 10 to your roll.',
    'Poison Mushroom': 'Choose who to poison. Poisoned players can only move 1 to 3 spaces this turn.',
    'Reverse Mushroom': 'Move backwards for this turn',
    'Genie Lamp': 'Takes you directly to the star.',
    'Blue Lamp': 'Moves the star(s) to a new location.',
    'Key': 'Opens a locked gate.',
    'Boo Bell': 'Calls Boo to you. Acts the same as if you landed on the Boo Space.',
    'Boo Spray': 'Prevents someone from using Boo against you.',
    'Dueling Glove': 'Triggers a duel mini game. You choose your opponent and the wager. Min/Max = 5 Coins/All the coins you have',
    'Plunder Chest': 'Take one item from another player.',
    'Warp Block': 'Roll a character dice. Switch spots with that character.'
    // Add descriptions for other items
};

// Function to update the item image for the first dropdown
function updateItemImage() {
    const itemSelect = document.getElementById('item1_drop_down');
    const itemImage = document.getElementById('item-image1');
    const selectedItem = itemSelect.value;
    itemImage.src = itemImages[selectedItem];
    // Get the image path and description from your itemImages and itemDescriptions objects
    const imagePath = itemImages[selectedItem];
    const description = itemDescriptions[selectedItem];

    // Update the item image's src
    itemImage.src = imagePath;

    // Update the modal description content
    const modalDescriptionElement = document.getElementById('modal-description');
    modalDescriptionElement.textContent = description;
}

// Function to update the item image for the second dropdown
function updateItemImage2() {
    const itemSelect = document.getElementById('item2_drop_down');
    const itemImage = document.getElementById('item-image2'); // Use the unique ID for the second item image
    const selectedItem = itemSelect.value;
    itemImage.src = itemImages[selectedItem];
}

// Function to update the item image for the third dropdown
function updateItemImage3() {
    const itemSelect = document.getElementById('item3_drop_down');
    const itemImage = document.getElementById('item-image3'); // Use the unique ID for the third item image
    const selectedItem = itemSelect.value;
    itemImage.src = itemImages[selectedItem];
}

// Show the modal when the user clicks on the 1st item image
document.getElementById('item-image1').addEventListener('click', function () {
    const modal = document.getElementById('image-description-modal');
    const modalDescription = document.getElementById('modal-description');
    const selectedItem = document.getElementById('item1_drop_down').value;
    modalDescription.textContent = itemDescriptions[selectedItem];
    modal.style.display = 'block';
});

// Add an event listener to toggle the item description on 1st item image click
document.getElementById('item-image1').addEventListener('click', function () {
    const descriptionElement = document.getElementById('image-description');

    if (descriptionElement.style.display === 'none') {
        descriptionElement.style.display = 'block'; // Show the description
    } else {
        descriptionElement.style.display = 'none'; // Hide the description
    }
});

// Show the modal when the user clicks on the 2nd item image
document.getElementById('item-image2').addEventListener('click', function () {
    const modal = document.getElementById('image-description-modal');
    const modalDescription = document.getElementById('modal-description');
    const selectedItem = document.getElementById('item2_drop_down').value;
    modalDescription.textContent = itemDescriptions[selectedItem];
    modal.style.display = 'block';
});

// Add an event listener to toggle the item description on 2nd item image click
document.getElementById('item-image2').addEventListener('click', function () {
    const descriptionElement = document.getElementById('image-description');

    if (descriptionElement.style.display === 'none') {
        descriptionElement.style.display = 'block'; // Show the description
    } else {
        descriptionElement.style.display = 'none'; // Hide the description
    }
});

// Show the modal when the user clicks on the 3rd item image
document.getElementById('item-image3').addEventListener('click', function () {
    const modal = document.getElementById('image-description-modal');
    const modalDescription = document.getElementById('modal-description');
    const selectedItem = document.getElementById('item3_drop_down').value;
    modalDescription.textContent = itemDescriptions[selectedItem];
    modal.style.display = 'block';
});

// Add an event listener to toggle the item description on 3rd item image click
document.getElementById('item-image3').addEventListener('click', function () {
    const descriptionElement = document.getElementById('image-description');

    if (descriptionElement.style.display === 'none') {
        descriptionElement.style.display = 'block'; // Show the description
    } else {
        descriptionElement.style.display = 'none'; // Hide the description
    }
});

// Close the modal when the user clicks the close button (×)
document.getElementById('modal-close').addEventListener('click', function () {
    const modal = document.getElementById('image-description-modal');
    modal.style.display = 'none';
});

// Initially update the item image
updateItemImage();

// Listen for changes in the item dropdown menu
document.getElementById('item1_drop_down').addEventListener('change', updateItemImage);

// ... (repeat the above two blocks for other item dropdowns if needed)

// Initially update the item image for the second dropdown
updateItemImage2();

// Listen for changes in the second item dropdown menu
document.getElementById('item2_drop_down').addEventListener('change', updateItemImage2);

// Initially update the item image for the third dropdown
updateItemImage3();

// Listen for changes in the third item dropdown menu
document.getElementById('item3_drop_down').addEventListener('change', updateItemImage3);

// Function to update the "turn" dropdown menu
function updateTurnDropdown() {
    const turnSelect = document.getElementById('turn_drop_down');
    const currentTurn = parseInt(turnSelect.value, 10);
    const newTurn = currentTurn + 1;
    turnSelect.value = newTurn.toString();
}

// Function to roll the dice
function rollDice() {
    // After rolling the dice, add 1 to the "turn" dropdown
    updateTurnDropdown();
}

// Add a click event listener to the dice image
document.getElementById('die-0').addEventListener('click', rollDice);

});
