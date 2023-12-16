let moveDice = document.querySelectorAll(".dice-wrapper");
let totalMoves = 0;  // Variable to store the total of all moves
let rollType = 'move'; // Default roll type
let selectedSpace; // Variable to store the selected space
let blueSpacesCount = 0;
let redSpacesCount = 0;
let eventSpacesCount = 0;
let currentTurn = 0; // Keeps track of the current turn

let moveDiceImages = [
"images/dice/dice_00.png",
"images/dice/dice_01.png",
"images/dice/dice_02.png",
"images/dice/dice_03.png",
"images/dice/dice_04.png",
"images/dice/dice_05.png",
"images/dice/dice_06.png",
"images/dice/dice_07.png",
"images/dice/dice_08.png",
"images/dice/dice_09.png",
"images/dice/dice_10.png"];

// Preload the moveDiceImages to prevent display delays during network latency
const preloadedImages = [];
for (let i = 0; i < moveDiceImages.length; i++) {
    const img = new Image();
    img.src = moveDiceImages[i];
    preloadedImages.push(img);
}

// Add default image sources for each roll type
const defaultImages = {
    'move': 'images/dice/dice_move_default.png',
    'character': 'images/dice/dice_character_default.png',
    'item': 'images/dice/dice_item_default.png',
    'cursed': 'images/dice/dice_cursed_default.png',
    'bowser': 'images/dice/dice_bowser_default.png',
    'bowserFury': 'images/dice/dice_bowser_fury_default.png'
};

let diceItems = [
    'Red Mushroom',
    'Gold Mushroom',
    'Poison Mushroom',
    'Reverse Mushroom',
    'Genie Lamp',
    'Blue Lamp',
    'Key',
    'Boo Bell',
    'Boo Spray',
    'Dueling Glove',
    'Plunder Chest',
    'Warp Block'
];

let diceItemImages = {
    'Red Mushroom': 'images/dice/dice_item_mushroom_red.png',
    'Gold Mushroom': 'images/dice/dice_item_mushroom_gold.png',
    'Poison Mushroom': 'images/dice/dice_item_mushroom_poison.png',
    'Reverse Mushroom': 'images/dice/dice_item_mushroom_reverse.png',
    'Genie Lamp': 'images/dice/dice_item_lamp_genie.png',
    'Blue Lamp': 'images/dice/dice_item_lamp_blue.png',
    'Key': 'images/dice/dice_item_key.png',
    'Boo Bell': 'images/dice/dice_item_boo_bell.png',
    'Boo Spray': 'images/dice/dice_item_boo_spray.png',
    'Dueling Glove': 'images/dice/dice_item_dueling_glove.png',
    'Plunder Chest': 'images/dice/dice_item_plunder_chest.png',
    'Warp Block': 'images/dice/dice_item_warp_block.png'
};

let characterDiceImages = {
    'boo': "images/dice/dice_character_boo.png",
    'yoshi': "images/dice/dice_character_yoshi.png",
    'drybones': "images/dice/dice_character_dry_bones.png",
    'bobomb': "images/dice/dice_character_bobomb.png",
    'rosalina': "images/dice/dice_character_rosalina.png",
    'cattoad': "images/dice/dice_character_cat_toad.png",
};

let cursedDice = [
    'Cursed One',
    'Cursed Two',
    'Cursed Three'
];

let cursedDiceImages = {
    'Cursed One': "images/dice/dice_cursed_01.png",
    'Cursed Two': "images/dice/dice_cursed_02.png",
    'Cursed Three': "images/dice/dice_cursed_03.png",
}

let bowserDice = [
    { side: 'Minus 10 Coins', weight: 2 },  // 20% chance
    { side: 'Minus 20 Coins', weight: 2 },  // 20% chance
    { side: 'Bowser Revolution', weight: 2 },  // 20% chance
    { side: 'Minus 1 Star', weight: 1 },  // 10% chance
];

let bowserDiceImages = {
    'Minus 10 Coins': "images/dice/dice_bowser_minus_10.png",
    'Minus 20 Coins': "images/dice/dice_bowser_minus_20.png",
    'Minus 1 Star': "images/dice/dice_bowser_minus_1.png",
    'Bowser Revolution': "images/dice/dice_bowser_revolution.png",
}

let bowserFuryDice = [
    { side: 'Minus 50 Coins', weight: 2 },  // 20% chance
    { side: 'Minus 75 Coins', weight: 2 },  // 20% chance
    { side: 'Minus 100 Coins', weight: 1 },  // 10% chance
    { side: 'Minus 2 Star', weight: 1 },  // 10% chance
    { side: 'Minus 3 Star', weight: 1 },  // 10% chance
    { side: 'Minus All Coins', weight: 1 }, // 10% chance
];

let bowserFuryDiceImages = {
    'Minus 50 Coins': "images/dice/dice_bowser_fury_minus_50.png",
    'Minus 75 Coins': "images/dice/dice_bowser_fury_minus_75.png",
    'Minus 100 Coins': "images/dice/dice_bowser_fury_minus_100.png",
    'Minus 2 Star': "images/dice/dice_bowser_fury_minus_2.png",
    'Minus 3 Star': "images/dice/dice_bowser_fury_minus_3.png",
    'Minus All Coins': "images/dice/dice_bowser_fury_anarchy.png",
}

// Function to get a random item based on weights (I am using this with the bowser and bowser fury dice so that the chances of getting the really bad stuff is not as high)
function getRandomItemWithWeightedProbability(array) {
    const totalWeight = array.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (const item of array) {
        if (random < item.weight) {
            return item.side;
        }
        random -= item.weight;
    }
}

// Function to display the total of all moves
function displayTotalMoves() {
    const totalMovesElement = document.getElementById('total-moves-content');
    // Update the text content with the total moves
    totalMovesElement.textContent = `Total Spaces Moved: ${totalMoves}`;
}

// Function to update the "turn" dropdown menu by 1. This must be above the rollDice function for this to work.
function updateTurnDropdown() {
    const turnSelect = document.getElementById('turn_drop_down');
    // Update the dropdown
    turnSelect.value = currentTurn.toString();
    //const currentTurn = parseInt(turnSelect.value, 10);
    // Update the dropdown
    //const newTurn = currentTurn + 1;
    //turnSelect.value = newTurn.toString();
    // Display the totalMoves after updating the dropdown
    displayTotalMoves();
}

// Function to open the stats modal
function openStatsModal() {
    const modal = document.getElementById('stats-modal');
    const contentElement = document.getElementById('total-moves-content');
    // Check if the element exists before manipulating it
    if (contentElement) {
        contentElement.textContent = `Total Spaces Moved: ${totalMoves}`;
    } else {
        console.error('Element with ID "total-moves-content" not found.');
    }    modal.style.display = 'block';
  }
  
  // Function to close the stats modal
  function closeStatsModal() {
    const modal = document.getElementById('stats-modal');
    modal.style.display = 'none';
  }

// Function to set the default image based on the selected roll type
function setDefaultImage() {
    const defaultImage = defaultImages[rollType];
    document.querySelector("#die-0").setAttribute("src", defaultImage);
}

// Function to toggle mute state
function toggleMute() {
    var audio = document.getElementById("diceAudio");
    var muteIcon = document.getElementById("muteIcon");

    // Toggle the muted property of the audio element
    audio.muted = !audio.muted;

    // Change the icon based on the muted state
    if (audio.muted) {
        muteIcon.className = "fa fa-volume-off";
    } else {
        muteIcon.className = "fa fa-volume-up";
    }
}

//This function plays a rolling dice audio file when the dice is clicked.
function playAudio() {
    var audio = document.getElementById("diceAudio");
    
    // Check if the audio is not muted before playing
    if (!audio.muted) {
        audio.play();
    }
}

// Function to shake the dice images
function shakeDice() {
    playAudio();
    moveDice.forEach(function(die) {
        die.classList.add("shake");
    });

    setTimeout(function() {
        moveDice.forEach(function(die) {
            die.classList.remove("shake");
        });
    }, 1250);
}

// Function to preload images for a given dice type
function preloadImages(images) {
    const preloadedImages = [];
    for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.src = images[i];
        preloadedImages.push(img);
    }
    return preloadedImages;
}

// Function to display the modal
function showSpacesModal() {
    console.log('showSpacesModal Function');
    const modal = document.getElementById('spaceModal');
    modal.style.display = 'block';

    // Attach click event listeners to space options
    const spaceOptions = document.querySelectorAll('.space-option');
    spaceOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            console.log('Click Event Listener Called');
            // Stop event propagation to prevent calling the function multiple times
            event.stopPropagation();
            selectedSpace = option.getAttribute('data-space-type');
            modal.style.display = 'none';
            updateStats();
            console.log('updateStats via Event Listener');
        });
    });
}

function rollMove() {
    // Check if the maximum number of turns (15) has been reached
    if (currentTurn >= 15) {
        alert('Game over!');
        return;
    }
    shakeDice();
    setTimeout(function () {
        let dieValue = Math.floor(Math.random() * (10-1+1))+1;
        console.log(dieValue);
        // Add the current roll value to the total
        totalMoves += dieValue;
        // Set the data-value attribute with the current roll value
        document.querySelector("#die-0").setAttribute("data-value", dieValue);
        // Set the image source
        document.querySelector("#die-0").setAttribute("src", moveDiceImages[dieValue]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
        // Increment the turn counter
        currentTurn++;
        updateTurnDropdown();
    }, 1250);
    // After 3 seconds, show the modal for selecting the space
    setTimeout(() => {
        showSpacesModal();
        console.log('showSpacesModal Function Called');
    }, 3000);
}

function updateStats() {
    // Log the selected space to the console
    console.log('updateStats Function');
    console.log('Selected Space:', selectedSpace);

    // Increment the count based on the selected space and adjust for the current turn
    switch (selectedSpace) {
        case 'blue':
            blueSpacesCount ++;
            console.log('Blue Space:', blueSpacesCount);   
            break;
        case 'red':
            redSpacesCount ++;
            console.log('Red Space:', redSpacesCount);
            break;
        case 'event':
            eventSpacesCount ++;
            console.log('Event Space:', eventSpacesCount);
            break;
    }

    // Display the updated counts on the stats page
    updateStatsOnPage();
    console.log('updateStatsOnPage Called');
    console.log('Blue Space:', blueSpacesCount);
    console.log('Red Space:', redSpacesCount);
    console.log('Event Space:', eventSpacesCount);
}

function updateStatsOnPage() {
    // Update the statistics on the stats page
    const blueSpacesElement = document.getElementById('blue-spaces-count');
    const redSpacesElement = document.getElementById('red-spaces-count');
    const eventSpacesElement = document.getElementById('event-spaces-count');

    blueSpacesElement.textContent = `Blue Spaces: ${blueSpacesCount}`;
    console.log('updateStatsOnPage Function Blue Space');
    console.log('Blue Space:', blueSpacesCount);
    redSpacesElement.textContent = `Red Spaces: ${redSpacesCount}`;
    console.log('updateStatsOnPage Function Red Space');
    console.log('Red Space:', redSpacesCount);
    eventSpacesElement.textContent = `Event Spaces: ${eventSpacesCount}`;
    console.log('updateStatsOnPage Function Event Space');
    console.log('Event Space:', eventSpacesCount);
}

//Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
});

function rollCharacter() {
    shakeDice();
    setTimeout(function () {
        const characters = ['boo', 'yoshi', 'drybones', 'bobomb', 'rosalina', 'cattoad'];
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
        // Set the character image source
        document.querySelector("#die-0").setAttribute("src", characterDiceImages[randomCharacter]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollItem() {
    shakeDice();
    setTimeout(function () {
        let randomIndex = Math.floor(Math.random() * diceItems.length);
        let selectedItem = diceItems[randomIndex];
        console.log(selectedItem);
        // Set the item image source
        document.querySelector("#die-0").setAttribute("src", diceItemImages[selectedItem]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollCursedDice() {
    shakeDice();
    setTimeout(function () {
        let randomIndex = Math.floor(Math.random() * cursedDice.length);
        let selectedSide = cursedDice[randomIndex];
        console.log(selectedSide);
        // Set the cursed image source
        document.querySelector("#die-0").setAttribute("src", cursedDiceImages[selectedSide]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollBowserDice() {
    shakeDice();
    setTimeout(function () {
        let selectedSide = getRandomItemWithWeightedProbability(bowserDice);
        console.log(selectedSide);
        // Set the Bowser dice image source
        document.querySelector("#die-0").setAttribute("src", bowserDiceImages[selectedSide]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollBowserFuryDice() {
    shakeDice();
    setTimeout(function () {
        let selectedSide = getRandomItemWithWeightedProbability(bowserFuryDice);
        console.log(selectedSide);
        // Set the Bowser Fury dice image source
        document.querySelector("#die-0").setAttribute("src", bowserFuryDiceImages[selectedSide]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

// Update the rollType when the dropdown changes
function setRollType(value) {
    rollType = value;
    setDefaultImage();
}

// Initially set the default image
setDefaultImage();

// This function triggers the updateTurnDropdown menu when the dice image is clicked
function rollDice() {
    if (rollType === 'move') {
        rollMove();
    } else if (rollType === 'character') {
        rollCharacter();
    } else if (rollType === 'item') {
        rollItem();
    } else if (rollType === 'cursed') {
        rollCursedDice();
    } else if (rollType === 'bowser') {
        rollBowserDice();
    } else if (rollType === 'bowserFury') {
        rollBowserFuryDice();
    }
}

// Add a click event listener to the dice image
document.getElementById('die-0').addEventListener('click', function(event) {
    event.stopPropagation();
    rollDice();
});

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
        image: 'images/mario_main_img.png'
    },
    'boo': {
        cssFile: 'boo.css',
        name: 'Boo',
        image: 'images/boo_main_img.png'
    },
    'bobomb': {
        cssFile: 'bobomb.css',
        name: 'Bob-omb',
        image: 'images/bobomb_main_img.png'
    },
    'drybones': {
        cssFile: 'drybones.css',
        name: 'Dry Bones',
        image: 'images/drybones_main_img.png'
    },
    'yoshi': {
        cssFile: 'yoshi.css',
        name: 'Yoshi',
        image: 'images/yoshi_main_img.png'
    },
    'peach': {
        cssFile: 'peach.css',
        name: 'Peach',
        image: 'images/peach_main_img.png'
    },
    'rosalina': {
        cssFile: 'rosalina.css',
        name: 'Rosalina',
        image: 'images/rosalina_main_img.png'
    },
    'koopa': {
        cssFile: 'koopa.css',
        name: 'Koopa',
        image: 'images/koopa_main_img.png'
    },
    'cattoad': {
        cssFile: 'cattoad.css',
        name: 'Cat Toad',
        image: 'images/cat_toad_main_img.png'
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
    'Item': 'images/items/item_box_alt.png',
    'Red Mushroom': 'images/items/mushroom_red.png',
    'Gold Mushroom': 'images/items/mushroom_gold.png',
    'Poison Mushroom': 'images/items/mushroom_poison.png',
    'Reverse Mushroom': 'images/items/mushroom_reverse.png',
    'Genie Lamp': 'images/items/lamp_genie.png',
    'Blue Lamp': 'images/items/lamp_blue.png',
    'Key': 'images/items/key.png',
    'Boo Bell': 'images/items/boo_bell.png',
    'Boo Spray': 'images/items/boo_spray.png',
    'Dueling Glove': 'images/items/dueling_glove.png',
    'Plunder Chest': 'images/items/plunder_chest.png',
    'Warp Block': 'images/items/warp_block.png'

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
document.getElementById('item-image1').addEventListener('click', function (event) {
    event.stopPropagation();
    const modal = document.getElementById('image-description-modal');
    const modalDescription = document.getElementById('modal-description');
    const selectedItem = document.getElementById('item1_drop_down').value;
    modalDescription.textContent = itemDescriptions[selectedItem];
    modal.style.display = 'block';
});

// Add an event listener to toggle the item description on 1st item image click
document.getElementById('item-image1').addEventListener('click', function (event) {
    event.stopPropagation();
    const descriptionElement = document.getElementById('image-description');

    if (descriptionElement.style.display === 'none') {
        descriptionElement.style.display = 'block'; // Show the description
    } else {
        descriptionElement.style.display = 'none'; // Hide the description
    }
});

// Show the modal when the user clicks on the 2nd item image
document.getElementById('item-image2').addEventListener('click', function (event) {
    event.stopPropagation();
    const modal = document.getElementById('image-description-modal');
    const modalDescription = document.getElementById('modal-description');
    const selectedItem = document.getElementById('item2_drop_down').value;
    modalDescription.textContent = itemDescriptions[selectedItem];
    modal.style.display = 'block';
});

// Add an event listener to toggle the item description on 2nd item image click
document.getElementById('item-image2').addEventListener('click', function (event) {
    event.stopPropagation();
    const descriptionElement = document.getElementById('image-description');

    if (descriptionElement.style.display === 'none') {
        descriptionElement.style.display = 'block'; // Show the description
    } else {
        descriptionElement.style.display = 'none'; // Hide the description
    }
});

// Show the modal when the user clicks on the 3rd item image
document.getElementById('item-image3').addEventListener('click', function (event) {
    event.stopPropagation();
    const modal = document.getElementById('image-description-modal');
    const modalDescription = document.getElementById('modal-description');
    const selectedItem = document.getElementById('item3_drop_down').value;
    modalDescription.textContent = itemDescriptions[selectedItem];
    modal.style.display = 'block';
});

// Add an event listener to toggle the item description on 3rd item image click
document.getElementById('item-image3').addEventListener('click', function (event) {
    event.stopPropagation();
    const descriptionElement = document.getElementById('image-description');

    if (descriptionElement.style.display === 'none') {
        descriptionElement.style.display = 'block'; // Show the description
    } else {
        descriptionElement.style.display = 'none'; // Hide the description
    }
});

// Close the modal when the user clicks the close button (×)
document.getElementById('modal-close').addEventListener('click', function(event) {
    event.stopPropagation();
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
});

