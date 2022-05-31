const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
/*reference*/
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
/*for now the accepting answers will be false, will be true when we go on and accept the answer*/
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What colour does Michael never wear",
        choice1: "Yellow",
        choice2: "Green",
        choice3: "Red",
        choice4: "Purple",
        answer: 1
    },
    {
        question: "If Michael was offered a Job right now, which would he take",
        choice1: "Food critic",
        choice2: "Soccer Player",
        choice3: "Computer Scientist",
        choice4: "Puppy daycare",
        answer: 2
    },
    {
        question: "Who is the first player that Michael liked?",
        choice1: "De Bruyne",
        choice2: "Messi",
        choice3: "Aguero",
        choice4: "Foden",
        answer: 2
    },
    {
        question: "What day did we go the best burger resturant in Waterloo for date night",
        choice1: "October 29,2021",
        choice2: "December 11, 2021",
        choice3: "Novermber 23, 2021",
        choice4: "January 14, 2022",
        answer: 3
    },
    {
        question: "Where does Michael most want to go with Avital",
        choice1: "Israel",
        choice2: "Mexico",
        choice3: "Italy",
        choice4: "Belarus",
        answer: 3
    },
    {
        question: "Who from my family knew first about you",
        choice1: "Mom",
        choice2: "Dad",
        choice3: "Sisters",
        choice4: "Grandparents",
        answer: 2
    },
    {
        question: "Who was the first friend I saw to tell after I hung out with you",
        choice1: "Shane",
        choice2: "Nikita",
        choice3: "Imran",
        choice4: "Husain",
        answer: 2
    },
    {
        question: "Why do we always go back to eachother",
        choice1: "Seperation anxiety",
        choice2: "We see great potential",
        choice3: "We find eachother shexy",
        choice4: "Our care and love for eachother",
        answer: 4
    },
    {
        question: "Free point :) choose the option: paws ",
        choice1: "Dumbo",
        choice2: "Gnarl",
        choice3: "Burp",
        choice4: "paws",
        answer: 4
    },
    {
        question: "(In Michaels eyes) - first goal after marriage",
        choice1: "own a puppy",
        choice2: "own an apartment with a nice view",
        choice3: "own a car",
        choice4: "children",
        answer: 2
    }
    
];

//CONSTANTS//
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    /*this is a spread opperator to get a full copy of the questions from questionsarray into
    availablequestions*/ 
    availableQuestions = [...questions];
    getNewQuestion();
};
/* =()=> is called the arrow syntax, getNewQuestion is function name and () is its 
empty parameters */
getNewQuestion = () => {

    if(availableQuestions.length ==0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //go to end page
         return window.location.assign('/end.html')
    }

    /* when we start the game this will increment it to 1 */
    questionCounter++;
    /*after updating question counter, we update question counter text to reflect it*/
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    /* Math.random() gives a random number between 0-1, example: 0.9 (in order to get a 
        random one of our 3 questions)*/
    /* Math.random() * 3 will multiply the random number by 3 */ 
    /* Math.floor will round the decimal number to a whole number */
    /* availablequestions.length makes sure that (for example: 3 questions, answered 1, now 
        theres only 2 questions left*/

    //update progress bar
    //question counter starts off at one, max_questions is 3, 1/3 = 0.3333 * 100 = 33% so fill bar up a third
    //also add percent (%) to make it work
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS)*100}%`;

    /*assign this to a variable called questionIndex*/   
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    /*making the current question from avaiable question array and getting its current index*/
    currentQuestion = availableQuestions[questionIndex];

    /*set the question,(innerText) to be current question(the question that we just loaded)
    and its question property*/
    question.innerText = currentQuestion.question;

    /*itterate through each of those choices and then give us a referece to each choice*/
    choices.forEach(choice => {

        /*get the number from the dataset property, which was in game.html (data-number="1")
        which got a reference to the actual choice number, thats why we wrtie 'number'*/
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    //This will get rid of the question we just used from the array of questions
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    };
    //able to click and get a reference to what choice they click
    choices.forEach(choice => {
        choice.addEventListener("click",e => {
            //ignore
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];
            //console.log(selectedAnswer);

            //const classToApply = 'incorrect';
            //     if (selectedAnswer == currentQuestion.answer){
            //        classToApply = 'correct';
            //}
            const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            if (classToApply == 'correct'){
                incrementScore(CORRECT_BONUS);
            }
            //console.log(classToApply);
           // console.log(selectedAnswer == currentQuestion.answer);
            selectedChoice.parentElement.classList.add(classToApply);
            //Add alittle delay
            setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            //how long you want the delay to be set for
            },1000);
        });
    }); 

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
