
var time  = document.getElementById('time');
var timeLeft = 60;

function clock(){
    setInterval(() => {
        time.textContent = "Time: " + timeLeft;
        timeLeft--;

        if(timeLeft < 0){
            console.log('You suck');
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

var hidden   = document.querySelector('div section');
var question = document.querySelector('div p');

var questions = ['A useful tool for debugging is ___', 'Which answer is not a type of value in javascript',
'In HTML what goes to the bottom of the document', 'In CSS which special character is for a ID', 'H1 H2 H3 H4 H5 ___'];
var quesQueue = questions.slice(0,questions.length);
//if array is hit for a certain question
//certain answers will display
var answerScript = ['String', 'Boolean', 'Number', 'HTML'];
var answerHTML   = ['Header', 'Head', 'Body', 'Footer'];
var answerCSS    = ['$', '*','.', '#'];
var answerHead   = ['Div', 'p', 'h6', 'H5'];
var answerDe     = ['Document', 'For', 'Console.log', 'Answer 1'];


function start(){
    hidden.classList -= 'hide';
    sBtn.classList   += 'hide';

    var random = Math.floor(Math.random() * questions.length);
    var loop   = 0;

    //you need to remove the question from the questions array so it wont be repeated
    question.textContent = questions[random];
    question.className += 'question';
    questions.splice(random, 1);

    Object.values(btns).forEach(val => {
        if(questions[random] == quesQueue[0]){
            val.textContent = answerScript[loop];
        }
        else if(questions[random] == quesQueue[1]){
            val.textContent = answerHTML[loop];
        }
        else if(questions[random] == quesQueue[2]){
            val.textContent = answerCSS[loop];
        }
        else if(questions[random] == quesQueue[3]){
            val.textContent = answerHead[loop];
        }
        else if(questions[random] == quesQueue[4]){
            val.textContent = answerDe[loop];
        }

        loop++;
    });



    clock();
}

sBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    start();
});

Object.values(btns).forEach(val => {
    val.addEventListener('click', (e) => {
        console.log(val.textContent);
    });
});