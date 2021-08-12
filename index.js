// Challenge 1
function ageInDays() {
    var DOB = prompt('When did you Born...My Dear Friend ?');
    var Days = (2021 - DOB) * 365;
    var h1 = document.createElement('h1');
    var text = document.createTextNode('You are '+ Days + ' day old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(text);
    document.getElementById('Result').appendChild(h1);
}

function reset() {

    document.getElementById('ageInDays').remove();
}

//Challenge 2
function Generate_Cat() {
    var image=document.createElement('img');
    image.src= "https://cdn2.thecatapi.com/images/41e.gif";
    document.getElementById('Cat-img').appendChild(image);
}

//Challenge 3
function RPSGAME(yourChoice) {
    var humanChoice,botChoice,Result,message;
    humanChoice=yourChoice.id;

    botChoice= numberTochoice(Math.floor(Math.random()*3));

    Result= decideWinner(humanChoice,botChoice);

    message= finalMessage(Result);
    
    displaying(humanChoice,botChoice,message);
}

function numberTochoice(number) {
    return ['Rock','Paper','Scissor'] [number];
}
function decideWinner(yourChoice,computerChoice) {
    var rpsdatabase ={
        'Rock': {'Scissor': 0,'Rock': 0.5,'Paper': 1},
        'Paper': {'Rock': 0,'Paper': 0.5,'Scissor': 1},
        'Scissor': {'Paper': 0,'Scissor': 0.5,'Rock': 1},
    }

    var yourScore= rpsdatabase[yourChoice][computerChoice];
    var computerScore = rpsdatabase[computerChoice] [yourChoice];
    return [yourScore,computerScore];
}
function finalMessage([yourChoice,botChoice]) {
    if (yourChoice===0) {
       return {'message':'You Lost!','colour':'red'};
    }
    else if (yourChoice===0.5) {
        return {'message':'You Tie!','colour':'yellow'};
    }
    else{
        return {'message':'You Won!','colour':'green'};
    }
}
function displaying(yourChoice,botChoice,message) {
    
    var imageDatabase ={
        'Rock': document.getElementById('Rock').src,
        'Paper': document.getElementById('Paper').src,
        'Scissor': document.getElementById('Scissor').src
    }

    document.getElementById('Rock').remove();
    document.getElementById('Paper').remove();
    document.getElementById('Scissor').remove();


    var humanDiv,botDiv,mssgDiv;
    humanDiv = document.createElement('div');
    botDiv = document.createElement('div');
    mssgDiv =document.createElement('div');

    

    botDiv.innerHTML= "<img src='"+ imageDatabase[botChoice] + "' height=150 width=150 style='box-shadow : 0px 10px 50px red'>"
    mssgDiv.innerHTML= "<h1 style='color: "+ message['colour'] +"; font-size: 60px; padding: 30px; '>"+ message['message']+ "</h1>"
    humanDiv.innerHTML= "<img src='"+ imageDatabase[yourChoice] + "' height=150 width=150 style='box-shadow : 0px 10px 50px rgba(37, 50, 233, 1)'>"

    
    document.getElementById('RPS').appendChild(humanDiv);
    document.getElementById('RPS').appendChild(mssgDiv);
    document.getElementById('RPS').appendChild(botDiv);
}

//Challenge 4

var allButton = document.getElementsByTagName('button');

var prevColor = [];

for (let i =0; i<allButton.length; i++){
    prevColor.push(allButton[i].classList[1]); // Pushing bootstrap color in the prevcolor array so that we can use in reset function
}


function changeColourto(choseColor){

    if (choseColor.value == 'red') {
        
        changeRed();
    }
    if (choseColor.value == 'green') {
        
        changeGreen();
    }

    if (choseColor.value == 'random') {
        
        changeRandom();
    }
    
    if (choseColor.value == 'reset') {
        
        changeReset();
    }
}

function changeRed() {

    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-danger');
        
    }
}

function changeGreen() {

    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-success');
        
    }
}

function changeRandom() {
    
    for (let i = 0; i < allButton.length; i++) {
        let number = Math.floor(Math.random()*4); // Generating a random number b/w 1-3
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(['btn-success','btn-danger','btn-warning','btn-info'] [number]);

    }

}

function changeReset() {
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(prevColor[i]);
    }
}

//Challenge : Blackjack

let BlackjackGame = {
    'You': {'printScore':'#YourScore','div':'.YourBox','Score': 0},
    'Dealer': {'printScore':'#DealerScore','div':'.DealerBox','Score':0},
    'Cards': ['2' , '3' ,'4','5','6','7','8','9','10','J','Q','K','A'],
    'CardMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
    'Wins': 0,
    'Losses': 0,
    'Drew': 0,
    'isStand': false,
    'turnOver':false,
};

const hitSound = new Audio('blackjack_assets/sounds/swish.m4a');
const winSound = new Audio('blackjack_assets/sounds/cash.mp3');
const lostSound = new Audio('blackjack_assets/sounds/aww.mp3');


const You = BlackjackGame['You'];
const Dealer = BlackjackGame['Dealer'];
const Cards = BlackjackGame['Cards'];

document.querySelector('#Hit').addEventListener('click',callHit);
document.querySelector('#Deal').addEventListener('click',callDeal);
document.querySelector('#Stand').addEventListener('click',DealerLogic);


function callHit() {
    if (BlackjackGame['isStand']===false) {
    let card = RandomCard();
    showCard(card,You); 
    updateScore(card,You);
    showScore(You); 
    }
}
function RandomCard() {
    let randomIndex = Cards[Math.floor(Math.random()* 13)];
    return randomIndex;
}

function showCard(card,activePlayer) {
    if (activePlayer['Score']<21) {
    let image = document.createElement('img');
    image.src = `blackjack_assets/images/${card}.png`;
    let a = document.querySelector(activePlayer['div']).appendChild(image);
    hitSound.play();
    }
}

function callDeal() {
    if (BlackjackGame['turnOver']===true) {
    let urCard = document.querySelector(You['div']).querySelectorAll('img');
    let dealerCard = document.querySelector(Dealer['div']).querySelectorAll('img');

    for (let i = 0; i < urCard.length; i++) {
        urCard[i].remove(); 
    }
    for (let i = 0; i < dealerCard.length; i++) {
        dealerCard[i].remove(); 
    }
    You['Score']=0;
    Dealer['Score']=0;
    
    document.querySelector(You['printScore']).textContent="0";
    document.querySelector(Dealer['printScore']).textContent="0";
    document.querySelector(You['printScore']).style.color ='white';
    document.querySelector(Dealer['printScore']).style.color ='white';
    document.querySelector('#Blackjack_Result').textContent= "Let's Play";
    document.querySelector('#Blackjack_Result').style.color= 'black';
    BlackjackGame['isStand']=false;
 }
}

function updateScore(Card,activePlayer) {
    if (Card ==='A') {
        if (activePlayer['Score']+ BlackjackGame['CardMap'][Card][1]>21) {
            activePlayer['Score']+= BlackjackGame['CardMap'][Card][0]; 
        }
        else{
            activePlayer['Score']+= BlackjackGame['CardMap'][Card][1];
        }
    }
    else{
        activePlayer['Score']+= BlackjackGame['CardMap'][Card];
    }
}
function showScore(activePlayer) {
    if (activePlayer['Score']<=21) {
    document.querySelector(activePlayer['printScore']).textContent=activePlayer['Score'];   
    }
    else{
        document.querySelector(activePlayer['printScore']).textContent="Bust!!";
        document.querySelector(activePlayer['printScore']).style.color = 'red';
        lostSound.play();
    }
}

function sleep(ms) {
    return new Promise(resolve=> setTimeout(resolve, ms));
}

async function DealerLogic() {
    BlackjackGame['isStand']=true;
    BlackjackGame['turnOver']=false;
    let card = RandomCard();
    showCard(card,Dealer); 
    updateScore(card,Dealer);
    showScore(Dealer);
    await sleep(1000);
    if (Dealer['Score']>15) {
        BlackjackGame['turnOver']=true;
        ComputeWinner();
    }
   else{
       
       DealerLogic();  
   }
}

function ComputeWinner() {
    let winner;

    if (You['Score']<=21) {
        if (You['Score']>Dealer['Score'] ||Dealer['Score']>21 ) {
            console.log('You Win!!')
            winner=You;
            BlackjackGame['Wins']++;
        }
        else if(You['Score']<Dealer['Score'] && Dealer['Score']<21 ){
            console.log('You Lost!!')
            winner=Dealer;
            BlackjackGame['Losses']++;
        }
        else if(You['Score']===Dealer['Score']){
            console.log('You Drew!!')
            BlackjackGame['Drew']++;
        }
        
        else{
            console.log('You Drew!!');
            BlackjackGame['Drew']++;
        }
    }else if (Dealer['Score']>21) {
        console.log('You Drew!!');
            BlackjackGame['Drew']++; 
    }
    else {
        console.log('You Lost!!')
            winner=Dealer;
            BlackjackGame['Losses']++;
    }
    console.log('Winner is',winner);
    showResult(winner);
    return winner;
}

function showResult(winner) {
    let message,messageColor;
    if (BlackjackGame['turnOver']===true) {
    if (winner=== You) {
        message='You Win !!'
        messageColor= 'green';
        winSound.play();
    }
    else if (winner=== Dealer) {
        message='You Lost !!'
        messageColor= 'red';
        lostSound.play();
    }
    else{
        message='You Drew !!'
        messageColor= 'Black';
    }
    document.querySelector('#Blackjack_Result').textContent= message;
    document.querySelector('#Blackjack_Result').style.color= messageColor;
    document.querySelector('#Wins').textContent = BlackjackGame['Wins'];
    document.querySelector('#Losses').textContent = BlackjackGame['Losses'];
    document.querySelector('#Draws').textContent = BlackjackGame['Drew'];
    
 }

}
