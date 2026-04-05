//------- GAME DATA -----//
let userSeq = [];
let gameSeq = [];
let btns = ["green","red","yellow","purple"];

let gameStart = false;
let level = 0;
let h3 = document.querySelector("h3");

//-------Game Start -----//
let gameStartBtn = document.querySelector("#startGame")
gameStartBtn.addEventListener("click",function(){
    if(gameStart == false){
        console.log("Game is start");
        gameStartBtn.style.display= "none";
        gameStart = true;
        levelup();
    }
    
})

//------- Flach Effects -----//

function gameFlash(btn){
      btn.classList.add("flash");
      setTimeout(() => {
      btn.classList.remove("flash");
      },250);
}

function userFlash(btn){
      btn.classList.add("userflash");
      setTimeout(() => {
      btn.classList.remove("userflash");
      },250);
}

//------- Level Up Function -----//

function levelup(){
    userSeq = [];
    level++;
    h3.innerText = (` 🚀 Level ${level}`);

    let randIdx = Math.floor(Math.random() * btns.length);
    let randcolor = btns[randIdx];
    let randBtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    playSound(randcolor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

//-------game-over function -----//

function checkAnswer(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup,1000);
        }
    }else{
         playSound("wrong");
         h3.innerHTML = ` 😢 Game is over! your level <b>${level}</b> <br> Press again button to start 💥`;
         gameStartBtn.style.display= "block";
         gameStartBtn.innerText = "Re-start";
         let body = document.querySelector("body");
         body.style.backgroundColor = "red";
         setTimeout(()=>{
         body.style.backgroundColor = "";
         },250)
         gameOver();
    }
}

//-------button-clicke function -----//

function handleBtn(){
    let btn = this;
    userFlash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    playSound(usercolor);   
    checkAnswer(userSeq.length-1)
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",handleBtn);
}

//-------reset function -----//

function gameOver(){
    gameStart = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

//-------sound function -----//

function playSound(color){
    let audio = new Audio(color + ".mp3");
    audio.play();
}