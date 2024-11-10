let moveDice = document.querySelectorAll(".dice-wrapper");
let totalMoves = 0;
let rollType = 'move'; // Default roll type
let selectedSpace;
let blueSpacesCount = 0;
let redSpacesCount = 0;
let eventSpacesCount = 0;
let luckySpacesCount = 0;
let itemSpacesCount = 0;
let bowserSpacesCount = 0;
let gameguySpacesCount = 0;
let battleSpacesCount = 0;
let starSpacesCount = 0;
let bankSpacesCount = 0;
let booSpacesCount = 0;
let chanceSpacesCount = 0;
let currentTurn = 0;

//This function will load all arrayed images on the page to ensure that images load seamlessly during dice rolls and item selections.
function preloadImages(images) {
    const preloadedImages = [];

    if (Array.isArray(images)) {
        // Handle array of image URLs
        for (let i = 0; i < images.length; i++) {
            const img = new Image();
            img.src = images[i];
            preloadedImages.push(img);
        }
    } else if (typeof images === 'object') {
        // Handle object with image URLs
        for (const key in images) {
            if (images.hasOwnProperty(key)) {
                const img = new Image();
                img.src = images[key];
                preloadedImages.push(img);
            }
        }
    }

    return preloadedImages;
}

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

// Define item images for each item
const itemImages = {
    'Item': 'images/items/item_box_alt.png',
    'Red Mushroom': 'images/items/mushroom_red.png',
    'Gold Mushroom': 'images/items/mushroom_gold.png',
    'Poison Mushroom': 'images/items/mushroom_poison.png',
    'Reverse Mushroom': 'images/items/mushroom_reverse.png',
    'Mini Mushroom': 'images/items/mushroom_mini.png',
    'Custom Mushroom': 'images/items/mushroom_custom.png',
    'Genie Lamp': 'images/items/lamp_genie.png',
    'Blue Lamp': 'images/items/lamp_blue.png',
    'Key': 'images/items/key.png',
    'Boo Bell': 'images/items/boo_bell.png',
    'Boo Spray': 'images/items/boo_spray.png',
    'Dueling Glove': 'images/items/dueling_glove.png',
    'Plunder Chest': 'images/items/plunder_chest.png',
    'Warp Block': 'images/items/warp_block.png',
    'Koopa Card': 'images/items/koopa_card.png',
    'Item Bag': 'images/items/item_bag.png',
    'Lucky Charm': 'images/items/lucky_charm.png'
    // Add more items and image paths as needed
};

// Add default image sources for each roll type
const defaultImages = {
    'move': 'images/dice/dice_move_default.png',
    'character': 'images/dice/dice_character_default.png',
    'lucky': 'images/dice/dice_lucky_default.png',
    'cursed': 'images/dice/dice_cursed_default.png',
    'bowser': 'images/dice/dice_bowser_default.png',
    'bowserFury': 'images/dice/dice_bowser_fury_default.png',
    'toadShop': 'images/dice/dice_shop_toad_default.png',
    'bowserShop': 'images/dice/dice_shop_bowser_default.png',
    'block': 'images/dice/dice_block_default.png',
    'mini': 'images/dice/dice_mini_default.png',
    'battle': 'images/dice/dice_battle_default.png',
    'chance': 'images/dice/dice_chance_default.png',
};

let diceLucky = [
    'Red Mushroom',
    'Gold Mushroom',
    'Mini Mushroom',
    'Custom Mushroom',
    'Genie Lamp',
    'Key',
    'Dueling Glove',
    'Warp Block',
    'Five Coin',
    'Ten Coin',
    'Fifteen Coin',
    'Twenty Coin',
];

let diceLuckySpaceImages = {
    'Red Mushroom': 'images/dice/dice_lucky_mushroom_red.png',
    'Gold Mushroom': 'images/dice/dice_lucky_mushroom_gold.png',
    'Mini Mushroom': 'images/dice/dice_lucky_mushroom_mini.png',
    'Custom Mushroom': 'images/dice/dice_lucky_mushroom_custom.png',
    'Genie Lamp': 'images/dice/dice_lucky_lamp_genie.png',
    'Key': 'images/dice/dice_lucky_key.png',
    'Dueling Glove': 'images/dice/dice_lucky_dueling_glove.png',
    'Warp Block': 'images/dice/dice_lucky_warp_block.png',
    'Five Coin': 'images/dice/dice_lucky_five.png',
    'Ten Coin': 'images/dice/dice_lucky_ten.png',
    'Fifteen Coin': 'images/dice/dice_lucky_fifteen.png',
    'Twenty Coin': 'images/dice/dice_lucky_twenty.png',
};

let characterDiceImages = {
    'boo': "images/dice/dice_character_boo.png",
    'yoshi': "images/dice/dice_character_yoshi.png",
    'drybones': "images/dice/dice_character_dry_bones.png",
    'bobomb': "images/dice/dice_character_bobomb.png",
    'rosalina': "images/dice/dice_character_rosalina.png",
    'cattoad': "images/dice/dice_character_cat_toad.png",
};

let toadShopDice = [
    'Gold Mushroom',
    'Red Mushroom',
    'Reverse Mushroom',
    'Warp Block',
    'Genie Lamp',
    'Key',
]
let diceToadShopImages = {
    'Gold Mushroom': "images/dice/dice_shop_toad_gold.png",
    'Red Mushroom': "images/dice/dice_shop_toad_red.png",
    'Reverse Mushroom': "images/dice/dice_shop_toad_reverse.png",
    'Warp Block': "images/dice/dice_shop_toad_warp.png",
    'Genie Lamp': "images/dice/dice_shop_toad_lamp.png",
    'Key': "images/dice/dice_shop_toad_key.png",
}

let bowserShopDice = [
    'Cursed Mushroom',
    'Boo Bell',
    'Boo Spray',
    'Dueling Glove',
    'Plunder Chest',
    'Blue Lamp',
]

let diceBowserShopImages = {
    'Cursed Mushroom': "images/dice/dice_shop_bowser_curse.png",
    'Boo Bell': "images/dice/dice_shop_bowser_bell.png",
    'Boo Spray': "images/dice/dice_shop_bowser_spray.png",
    'Dueling Glove': "images/dice/dice_shop_bowser_duel.png",
    'Plunder Chest': "images/dice/dice_shop_bowser_plunder.png",
    'Blue Lamp': "images/dice/dice_shop_bowser_lamp.png",
}

const cursedDiceImages = [
    'images/dice/dice_cursed_01.png',
    'images/dice/dice_cursed_02.png',
    'images/dice/dice_cursed_03.png',
];

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
    { side: 'Minus 50 Coins', weight: 1.5 },  // 15% chance
    { side: 'Minus 75 Coins', weight: 1.5 },  // 15% chance
    { side: 'Minus 100 Coins', weight: 1 },  // 10% chance
    { side: 'Minus 2 Star', weight: 1 },  // 10% chance
    { side: 'Minus 3 Star', weight: 1 },  // 10% chance
    { side: 'Minus All Coins', weight: 1 }, // 10% chance
    { side: 'Plus 500 Coins', weight: .1}, // 1% chance
];

let bowserFuryDiceImages = {
    'Minus 50 Coins': "images/dice/dice_bowser_fury_minus_50.png",
    'Minus 75 Coins': "images/dice/dice_bowser_fury_minus_75.png",
    'Minus 100 Coins': "images/dice/dice_bowser_fury_minus_100.png",
    'Minus 2 Star': "images/dice/dice_bowser_fury_minus_2.png",
    'Minus 3 Star': "images/dice/dice_bowser_fury_minus_3.png",
    'Minus All Coins': "images/dice/dice_bowser_fury_anarchy.png",
    'Plus 500 Coins': "images/dice/dice_bowser_fury_plus_500.png",
}

let blockDice = [
    { side: 'Lucky Charm', weight: 2 },  // 20% chance
    { side: 'Star', weight: 1 },  // 10% chance
    { side: 'Twenty Coins', weight: 3 },  // 30% chance
    { side: 'Item Bag', weight: 2 },  // 20% chance
    { side: 'Koopa Card', weight: 2 },  // 20% chance
];

let blockDiceImages = {
    'Lucky Charm': 'images/dice/dice_block_charm.png',
    'Star': 'images/dice/dice_block_star.png',
    'Twenty Coins': 'images/dice/dice_block_twenty.png',
    'Item Bag': 'images/dice/dice_block_bag.png',
    'Koopa Card': 'images/dice/dice_block_koopa.png',
}

const miniDiceImages = [
    'images/dice/dice_mini_01.png',
    'images/dice/dice_mini_02.png',
    'images/dice/dice_mini_03.png',
    'images/dice/dice_mini_04.png',
    'images/dice/dice_mini_05.png',
    'images/dice/dice_mini_06.png',
];

let chanceDice = [
    'Chance Ten',
    'Chance Twenty',
    'Chance Thirty',
    'Chance All Coins',
    'Chance One Star',
    'Chance Two Star',
    'Chance All Stars',
]

let chanceDiceImages = {
    'Chance Ten': 'images/dice/dice_chance_ten.png',
    'Chance Twenty': 'images/dice/dice_chance_twenty.png',
    'Chance Thirty': 'images/dice/dice_chance_thirty.png',
    'Chance All Coins': 'images/dice/dice_chance_all_coins.png',
    'Chance One Star': 'images/dice/dice_chance_one_star.png',
    'Chance Two Star': 'images/dice/dice_chance_two_stars.png',
    'Chance All Stars': 'images/dice/dice_chance_all_stars.png',
}

let battleDice = [
    'Battle Five',
    'Battle Ten',
    'Battle Fifteen',
    'Battle Twenty',
    'Battle Twenty Five',
    'Battle Thirty',
]

let battleDiceImages = {
    'Battle Five': 'images/dice/dice_battle_five.png',
    'Battle Ten': 'images/dice/dice_battle_ten.png',
    'Battle Fifteen': 'images/dice/dice_battle_fifteen.png',
    'Battle Twenty': 'images/dice/dice_battle_twenty.png',
    'Battle Twenty Five': 'images/dice/dice_battle_twenty_five.png',
    'Battle Thirty': 'images/dice/dice_battle_thirty.png',
}

preloadImages(Object.values(defaultImages));
preloadImages(Object.values(diceLuckySpaceImages));
preloadImages(Object.values(characterDiceImages));
preloadImages(Object.values(diceToadShopImages));
preloadImages(Object.values(diceBowserShopImages));
preloadImages(Object.values(bowserDiceImages));
preloadImages(Object.values(bowserFuryDiceImages));
preloadImages(Object.values(blockDiceImages));
preloadImages(Object.values(chanceDiceImages));
preloadImages(Object.values(battleDiceImages));
preloadImages(Object.values(miniDiceImages));
preloadImages(Object.values(moveDiceImages));
preloadImages(Object.values(itemImages));

window.addEventListener("load", (event) => {
    const spaceOptions = document.querySelectorAll('.space-option');
    const modal = document.getElementById('spaceModal');
     spaceOptions.forEach(option => {
         option.addEventListener('click', (event) => {
             // Stop event propagation to prevent calling the function multiple times
             event.stopPropagation();
             selectedSpace = option.getAttribute('data-space-type');
             modal.style.display = 'none';
             updateStats();
         });
     });
     // Preload all dice images
    const allImages = [
        ...Object.values(defaultImages),
        ...Object.values(diceLuckySpaceImages),
        ...Object.values(characterDiceImages),
        ...Object.values(diceToadShopImages),
        ...Object.values(diceBowserShopImages),
        ...Object.values(cursedDiceImages),
        ...Object.values(bowserDiceImages),
        ...Object.values(bowserFuryDiceImages),
        ...Object.values(blockDiceImages),
        ...Object.values(miniDiceImages),
        ...Object.values(chanceDiceImages),
        ...Object.values(battleDiceImages),
        ...Object.values(moveDiceImages),
        ...Object.values(itemImages),
    ];
    const preloadedDiceImages = preloadImages(allImages);
});
 
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
    turnSelect.value = currentTurn.toString();
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

// Function to open the wheel modal
function openWheelModal() {
    const modal = document.getElementById('wheel-modal');
    modal.style.display = 'block';
}

  // Function to close the wheel modal
  function closeWheelModal() {
    const modal = document.getElementById('wheel-modal');
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
    const modal = document.getElementById('spaceModal');
    modal.style.display = 'block';
}

function rollMoveDice() {
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
    }, 3000);
}

function updateStats() {
    // Log the selected space to the console
    console.log('Selected Space:', selectedSpace);

    // Increment the count based on the selected space and adjust for the current turn
    switch (selectedSpace) {
        case 'blue':
            blueSpacesCount ++;
            break;
        case 'red':
            redSpacesCount ++;
            break;
        case 'event':
            eventSpacesCount ++;
            break;
        case 'lucky':
            luckySpacesCount ++;
            break;
        case 'item':
            itemSpacesCount ++;
            break;
        case 'bowser':
            bowserSpacesCount ++;
            break;
        case 'gameguy':
            gameguySpacesCount ++;
            break;
        case 'battle':
            battleSpacesCount ++;
            break;
        case 'star':
            starSpacesCount ++;
            break;
        case 'bank':
            bankSpacesCount ++;
            break;
        case 'boo':
            booSpacesCount ++;
            break;
        case 'chance':
            chanceSpacesCount ++;
            break;            
    }

    // Display the updated counts on the stats page
    updateStatsOnPage();
}

function updateStatsOnPage() {
    // Update the statistics on the stats page
    const blueSpacesElement = document.getElementById('blue-spaces-count');
    const redSpacesElement = document.getElementById('red-spaces-count');
    const eventSpacesElement = document.getElementById('event-spaces-count');
    const luckySpacesElement = document.getElementById('lucky-spaces-count');
    const itemSpacesElement = document.getElementById('item-spaces-count');
    const bowserSpacesElement = document.getElementById('bowser-spaces-count');
    const gameguySpacesElement = document.getElementById('gameguy-spaces-count');
    const battleSpacesElement = document.getElementById('battle-spaces-count');
    const starSpacesElement = document.getElementById('star-spaces-count');
    const bankSpacesElement = document.getElementById('bank-spaces-count');
    const booSpacesElement = document.getElementById('boo-spaces-count');
    const chanceSpacesElement = document.getElementById('chance-spaces-count');

    blueSpacesElement.textContent = `Blue Spaces: ${blueSpacesCount}`;
    redSpacesElement.textContent = `Red Spaces: ${redSpacesCount}`;
    eventSpacesElement.textContent = `Event Spaces: ${eventSpacesCount}`;
    luckySpacesElement.textContent = `Lucky Spaces: ${luckySpacesCount}`;
    itemSpacesElement.textContent = `Item Spaces: ${itemSpacesCount}`;
    bowserSpacesElement.textContent = `Bowser Spaces: ${bowserSpacesCount}`;
    gameguySpacesElement.textContent = `Game Guy Spaces: ${gameguySpacesCount}`;
    battleSpacesElement.textContent = `Battle Spaces: ${battleSpacesCount}`;
    starSpacesElement.textContent = `Star Spaces: ${starSpacesCount}`;
    bankSpacesElement.textContent = `Bank Spaces: ${bankSpacesCount}`;
    booSpacesElement.textContent = `Boo Spaces: ${booSpacesCount}`;
    chanceSpacesElement.textContent = `Chance Spaces: ${chanceSpacesCount}`;
}

//Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(event) {
    event.stopPropagation();
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

function rollLuckySpace() {
    shakeDice();
    setTimeout(function () {
        let randomIndex = Math.floor(Math.random() * diceLucky.length);
        let selectedLucky = diceLucky[randomIndex];
        console.log(selectedLucky);
        // Set the item image source
        document.querySelector("#die-0").setAttribute("src", diceLuckySpaceImages[selectedLucky]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollToadShopDice() {
    shakeDice();
    setTimeout(function () {
        let randomIndex = Math.floor(Math.random() * toadShopDice.length);
        let selectedToadShop = toadShopDice[randomIndex];
        console.log(selectedToadShop);
        // Set the item image source
        document.querySelector("#die-0").setAttribute("src", diceToadShopImages[selectedToadShop]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollBowserShopDice() {
    shakeDice();
    setTimeout(function () {
        let randomIndex = Math.floor(Math.random() * bowserShopDice.length);
        let selectedBowserShop = bowserShopDice[randomIndex];
        console.log(selectedBowserShop);
        // Set the item image source
        document.querySelector("#die-0").setAttribute("src", diceBowserShopImages[selectedBowserShop]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollCursedDice() {
    // Check if the maximum number of turns (15) has been reached
    if (currentTurn >= 15) {
        alert('Game over!');
        return;
    }
    shakeDice();
    setTimeout(function () {
        let dieValue = Math.floor(Math.random() * 3) + 1;
        console.log(dieValue);
        // Add the current roll value to the total
        totalMoves += dieValue;
        // Set the image source using cursedDiceImages
        document.querySelector("#die-0").setAttribute("src", cursedDiceImages[dieValue - 1]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
        // Increment the turn counter
        currentTurn++;
        updateTurnDropdown();
    }, 1250);
    // After 3 seconds, show the modal for selecting the space
    setTimeout(() => {
        showSpacesModal();
    }, 3000);
}

function rollBowserDice() {
    shakeDice();
    setTimeout(function () {
        let selectedBowser = getRandomItemWithWeightedProbability(bowserDice);
        console.log(selectedBowser);
        // Set the Bowser dice image source
        document.querySelector("#die-0").setAttribute("src", bowserDiceImages[selectedBowser]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollBowserFuryDice() {
    shakeDice();
    setTimeout(function () {
        let selectedFury = getRandomItemWithWeightedProbability(bowserFuryDice);
        console.log(selectedFury);
        // Set the Bowser Fury dice image source
        document.querySelector("#die-0").setAttribute("src", bowserFuryDiceImages[selectedFury]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollBlockDice() {
    shakeDice();
    setTimeout(function () {
        let selectedBlock = getRandomItemWithWeightedProbability(blockDice);
        console.log(selectedBlock);
        // Set the dice image source
        document.querySelector("#die-0").setAttribute("src", blockDiceImages[selectedBlock]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollMiniDice() {
    // Check if the maximum number of turns (15) has been reached
    if (currentTurn >= 15) {
        alert('Game over!');
        return;
    }
    shakeDice();
    setTimeout(function () {
        let dieValue = Math.floor(Math.random() * 6) + 1;
        console.log(dieValue);
        // Add the current roll value to the total
        totalMoves += dieValue;
        // Set the image source using cursedDiceImages
        document.querySelector("#die-0").setAttribute("src", miniDiceImages[dieValue - 1]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
        // Increment the turn counter
        currentTurn++;
        updateTurnDropdown();
    }, 1250);
    // After 3 seconds, show the modal for selecting the space
    setTimeout(() => {
        showSpacesModal();
    }, 3000);
}

function rollBattleDice() {
    shakeDice();
    setTimeout(function () {
        let randomIndex = Math.floor(Math.random() * battleDice.length);
        let selectedBattle = battleDice[randomIndex];
        console.log(selectedBattle);
        // Set the dice image source
        document.querySelector("#die-0").setAttribute("src", battleDiceImages[selectedBattle]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

function rollChanceDice() {
    shakeDice();
    setTimeout(function () {
        let randomIndex = Math.floor(Math.random() * chanceDice.length);
        let selectedChance = chanceDice[randomIndex];
        console.log(selectedChance);
        // Set the dice image source
        document.querySelector("#die-0").setAttribute("src", chanceDiceImages[selectedChance]);
        // Make the dice image visible
        document.querySelector("#die-0").style.visibility = "visible";
    }, 1250);
}

// Update the rollType when the dropdown changes
function setRollType(value) {
    rollType = value;
    setDefaultImage();
    // Display all images after changing the roll type
    displayAllImages(getCurrentDiceImages());
}

// Initially set the default image
setDefaultImage();

// This function triggers the updateTurnDropdown menu when the dice image is clicked
function rollDice() {
    setTimeout(function () {
        if (rollType === 'move') {
            rollMoveDice();
        } else if (rollType === 'character') {
            rollCharacter();
        } else if (rollType === 'lucky') {
            rollLuckySpace();
        } else if (rollType === 'cursed') {
            rollCursedDice();
        } else if (rollType === 'bowser') {
            rollBowserDice();
        } else if (rollType === 'bowserFury') {
            rollBowserFuryDice();
        } else if (rollType === 'toadShop') {
            rollToadShopDice();
        } else if (rollType === 'bowserShop') {
            rollBowserShopDice();
        } else if (rollType === 'block') {
            rollBlockDice();
        } else if (rollType === 'mini') {
            rollMiniDice();
        } else if (rollType === 'chance') {
            rollChanceDice();
        } else if (rollType === 'battle') {
            rollBattleDice();
        }
    });
}

function displayAllImages(imageObject) {
    // Select the new container
    const diceThumbnailContainer = document.getElementById('diceThumbnailContainer');

    // Clear the existing content in the container
    diceThumbnailContainer.innerHTML = '';

    // Iterate over the images and display each one in the new container
    for (const key in imageObject) {
        if (imageObject.hasOwnProperty(key)) {
            const imageUrl = imageObject[key];
            displayImageInContainer(imageUrl, diceThumbnailContainer);
        }
    }
}

function displayImageInContainer(imageUrl, container) {
    // Create an image element
    const imageElement = document.createElement('img');
    // Set the source of the image
    imageElement.setAttribute('src', imageUrl);
    // Append the image element to the specified container
    container.appendChild(imageElement);
}

function getCurrentDiceImages() {
    // Return the corresponding image object based on the current roll type
    if (rollType === 'move') {
        return '';
    } else if (rollType === 'character') {
        return characterDiceImages;
    } else if (rollType === 'lucky') {
        return diceLuckySpaceImages;
    } else if (rollType === 'cursed') {
        return cursedDiceImages;
    } else if (rollType === 'bowser') {
        return bowserDiceImages;
    } else if (rollType === 'bowserFury') {
        return bowserFuryDiceImages;
    } else if (rollType === 'toadShop') {
        return diceToadShopImages;
    } else if (rollType === 'bowserShop') {
        return diceBowserShopImages;
    } else if (rollType === 'block') {
        return blockDiceImages;
    } else if (rollType === 'mini') {
        return miniDiceImages;
    } else if (rollType === 'chance') {
        return chanceDiceImages;
    } else if (rollType === 'battle') {
        return battleDiceImages;
    }
}

function displayImageOnScreen(imageUrl) {
    // Create an image element
    const imageElement = document.createElement('img');

    // Set the source of the image
    imageElement.setAttribute('src', imageUrl);

    // Append the image element to the body (or another container element)
    document.body.appendChild(imageElement);
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

const itemDescriptions = {
    'Item': 'Select an item from the dropdown menu to display it here.',
    'Red Mushroom': 'Adds 5 to your roll.',
    'Gold Mushroom': 'Adds 10 to your roll.',
    'Mini Mushroom': 'Make any player, including yourself, small for 1 turn. Small players may only move up to 6 spaces, but they can squeeze through gates with no key. If another player lands on or moves past a mini player, they are squished, and lose 5 coins.',
    'Custom Mushroom': 'Choose a number 1-10. Move that many spaces.',
    'Poison Mushroom': 'Choose who to poison. Poisoned players can only move 1 to 3 spaces this turn.',
    'Reverse Mushroom': 'Move backwards for this turn',
    'Genie Lamp': 'Takes you directly to the star.',
    'Blue Lamp': 'Moves the star(s) to a new location.',
    'Key': 'Opens a locked gate.',
    'Boo Bell': 'Calls Boo to you. Acts the same as if you landed on the Boo Space.',
    'Boo Spray': 'Prevents someone from using Boo against you.',
    'Dueling Glove': 'Triggers a duel mini game. You choose your opponent and the wager. Min/Max = 5 Coins/All the coins you have',
    'Plunder Chest': 'Take one item from another player.',
    'Warp Block': 'Roll a character dice. Switch spots with that character.',
    'Koopa Card': 'Gain all coins in the bank when you pass the bank space.',
    'Item Bag': 'Gain three items using the Toad Shop Dice &/or Bowser Shop Dice.',
    'Lucky Charm': 'Make any player, including yourself, compete against Game Guy.'
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

