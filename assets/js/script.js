
var time     = document.getElementById('time');
var timeLeft = 60;

var sBtn     = document.getElementById('s-btn');
var btns     = {
    btn1: document.getElementById('btn1'),
    btn2: document.getElementById('btn2'),
    btn3: document.getElementById('btn3'),
    btn4: document.getElementById('btn4'),
};

var quiz = [
    {   question: 'A useful tool for debugging is ___',
        answers: ['Document', 'For', 'Console.log', 'Answer 1'],
        answer: 'Console.log'
    },
    {
        question: 'Which answer is not a type of value in javascript',
        answers: ['String', 'Boolean', 'Number', 'HTML'],
        answer: 'HTML'
    },
    {
        question: 'In HTML what goes to the bottom of the document',
        answers: ['Header', 'Head', 'Body', 'Footer'],
        answer: 'Footer'
    },
    {
        question: 'In CSS which special character is for a ID',
        answers: ['$', '*','.', '#'],
        answer: '#'
    },
    {
        question: 'H1 H2 H3 H4 H5 ____',
        answers: ['Div', 'p', 'H6', 'H5'],
        answer: 'H6'
    }
];
var qReset     = quiz.slice(0);
var highScores = [];


var random;
var score  = 0;

var header   = document.querySelector('#header');
var hidden   = document.querySelector('div section');
var question = document.querySelector('div p');
var fun      = document.getElementById('fun');
var form     = document.querySelector('form');
var input    = document.getElementById('input');
var submit   = document.getElementById('submit');
var viewScor = document.querySelector('header a');

let button  = document.createElement('button');
let button2 = document.createElement('button');
let display = document.createElement('p');


button.textContent  = 'Play Again?';
button2.textContent = 'Clear HighScores?';



function start(){
    var loop = 0;
    random   = Math.floor(Math.random() * quiz.length);

    if(quiz.length <= 0){
        question.textContent = "You've answered all the questions! Your score is: " + score;
        hidden.classList.add('hide'); 
        timeLeft = 0;

        setTimeout(() => {
            form.classList.remove('hide');
        }, 1500);
    }
    else{
        Object.values(btns).forEach(val => {
            val.textContent = quiz[random].answers[loop];
            loop++;
        });

        question.textContent = quiz[random].question;
    }
}

function clock(){
    var timer = setInterval(() => {
        time.textContent = "Time: " + timeLeft;
        timeLeft--;

        if(timeLeft < 0){
            time.textContent = 'Time: 0';
            clearInterval(timer);
        }
        else if(timeLeft < 0 && quiz.length == 0){
            noTime();
            clearInterval(timer);
        }

    }, 1000);
}

function noTime(){
    question.textContent = "You've ran out of time!";
    hidden.classList.add('hide');
}

sBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    question.classList.add('question');
    hidden.classList.remove('hide');
    sBtn.classList.add('hide');

    clock();
    start();
});

Object.values(btns).forEach(val => {
    val.addEventListener('click', (e) => {
        e.preventDefault();
        fun.classList.add('correct');

        if(quiz[random].answer == val.textContent){
            quiz.splice(random,1);

            score++;
            fun.textContent = 'Correct';
            setTimeout(() => {
                fun.textContent = '';
            }, 5000);

            start();
        }
        else{
            quiz.splice(random,1);

            fun.textContent = 'Wrong';
            timeLeft -= 5;

            setTimeout(() => {
                fun.textContent = '';
            }, 5000);

            start();
        }
    });
});

submit.addEventListener('click', (e) => {
    e.preventDefault();

    highScores.push(input.value + ' - ' + score);
    display.textContent = highScores;

    header.textContent = 'High Scores';
    form.classList.add('hide');

    question.appendChild(button);
    question.appendChild(button2);
    header.appendChild(display);

});

button.addEventListener('click', (e) => {
    e.preventDefault();
    quiz = qReset.slice(0);
    hidden.classList.remove('hide');

    header.removeChild(display);

    timeLeft = 60;
    score    = 0;
    input.value = '';

    clock();
    start();
});

button2.addEventListener('click', (e) => {
    e.preventDefault();
    highScores.splice(0, highScores.length);
    question.textContent = '';

    question.appendChild(button);
    question.appendChild(button2);
});

viewScor.addEventListener('click', (e) => {
    e.preventDefault();

    if(display.textContent == ''){
        display.textContent = 'There are no high scores!';
    }
    else{
        display.textContent = highScores;
    }

    question.textContent = '';
    timeLeft = 0;

    hidden.classList.add('hide');
    sBtn.classList.add('hide');
    form.classList.add('hide');

    header.textContent  = 'High Scores';
    button.textContent  = 'Play Again?';
    button2.textContent = 'Clear HighScores?';

    header.appendChild(display);
    question.appendChild(button);
    question.appendChild(button2);
});
