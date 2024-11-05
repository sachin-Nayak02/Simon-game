let gameSeq=[];
let userSeq=[];
let highscor=0;
let btns=["yellow","green","red","purple"];

let started=false;
let level=0;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game was started");
        started=true;
    }
    levelUp();

})

function gameFlash(btn){
    btn.classList.add('flash')
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}
function userFlash(btn){
    btn.classList.add('user')
    setTimeout(() => {
        btn.classList.remove("user");
    }, 300);
}

function levelUp(){
    userSeq=[];
    level++;
 
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
    // console.log(gameSeq)
    // console.log(userSeq)
    
}
function checkAns(idx){
    // let idx=level-1;
    if(userSeq[idx]==gameSeq[idx]){
        // console.log("same value");
        if(gameSeq.length==userSeq.length){
            setTimeout(levelUp,1000);
            
        }
    }else{
        h2.innerHTML=`game over!<b>Your Score is ${level}</b> <br> press any key to Start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor="white";  
        }, 250);
            buzzer();
        let h3=document.querySelector("h3");
        if(highscor<=level){
            highscor=level;
            h3.innerText=`Your high Score is ${highscor}`;
        }else{
            h3.innerText=`Your high Score is ${highscor}`;
        }
        reset();
    }
}
function reset(){
   
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    
}

function btnPress(){
    console.log(this);
    let btn=this;
    userFlash(btn);

    let userColor=btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtn=document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click",btnPress);
}

function buzzer(){
    var audio=new Audio("wrong-ans.mp3");
    audio.play();

}