function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex]; 
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};
var QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + " / 5 </h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },

    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },

    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "question" + currentQuestionNumber + " of " + quiz.questions.length);
    }
};

//Create Questions
 var questions = [
    new Question("Q1: What is Soil Pollution?", ["The presence of chemicals in the soil", "Soil degradation", "Damage to the soil", "Erosion"], "The presence of chemicals in the soil" ),
    new Question("Q2: What is the main pollutant in the soil?", ["Bromide", "Cadmium", "Nitrogen", "Indium"], "Cadmium"),
    new Question("Q3: What percentage of the world's soil has been degraded?", ["40%%", "30.5%", "65%", "86%"], "40%"),
    new Question("Q4: Which of the following contributes to soil pollution?", ["Planting trees", "Walking on soil", "Worms moving in the soil", "Pesticides used in farms"], "Pesticides used in farms"),
    new Question("Q5: Is soil pollution dangerous?", ["Nah", "Nope", "Of course", "Too cool to even reply"], "Of course"),
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();