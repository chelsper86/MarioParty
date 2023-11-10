let images = ["images/dice-00.png",
"images/dice-01.svg",
"images/dice-02.svg",
"images/dice-03.svg",
"images/dice-04.svg",
"images/dice-05.svg",
"images/dice-06.svg",
"images/dice-07.svg",
"images/dice-08.svg",
"images/dice-09.svg",
"images/dice-10.svg"];
let dice = document.querySelectorAll(".dice-wrapper");/*This created a bug where the dice moves off screen when clicked...but it fixed the bug where all images on screen shake*/
/*let dice = document.querySelectorAll("img");*/

function play() {
    var audio = document.getElementById("diceAudio");
    audio.play();
  }

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
