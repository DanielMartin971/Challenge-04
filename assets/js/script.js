
var time  = document.getElementById('time');
var timeLeft = 60;

function clock(){
    setInterval(() => {
        time.textContent = "Time: " + timeLeft;
        timeLeft--;

        if(timeLeft <= 0){
            time.textContent = 'Time: 0';
        }

    }, 1000);
}

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


var random;
var score  = 0;

var hidden   = document.querySelector('div section');
var question = document.querySelector('div p');
var fun      = document.getElementById('fun');


function start(){
    var loop = 0;
    random   = Math.floor(Math.random() * quiz.length);

    if(quiz.length <= 0){
        question.textContent = "You've answered all the questions! Your score is: " + score;
    }
    else{
        question.textContent = quiz[random].question;
    }

    Object.values(btns).forEach(val => {
        val.textContent = quiz[random].answers[loop];
        loop++;
    });
}

sBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    question.className += 'question';
    hidden.classList -= 'hide';
    sBtn.classList   += 'hide';

    clock();
    start();
});

Object.values(btns).forEach(val => {
    val.addEventListener('click', (e) => {
        e.preventDefault();

        if(quiz[random].answer == val.textContent){
            quiz.splice(random,1);

            score++;
            fun.textContent = 'Correct';
            fun.classList   = 'correct';

            start();
        }
        else{
            quiz.splice(random,1);

            fun.textContent = 'Wrong';
            timeLeft -= 5;

            start();
        }
    });
});
