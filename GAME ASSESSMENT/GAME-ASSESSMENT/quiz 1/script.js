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
    new Question("Q1: What is Water Pollution?", ["Harmful substances which contaminate the water", "When sea life contaminate the water", "When the water smells and tastes bad", "Junk in water"], "Harmful substances which contaminate the water" ),
    new Question("Q2: What is the most common pollutant in the sea?", ["Chemicals", "Oil spills from ships", "Plastic", "Salt"], "Plastic"),
    new Question("Q3: What percent of the world's water supply has been polluted severely?", ["80%", "40%", "25%", "99.9%"], "40%"),
    new Question("Q4: What gas is responsible for ocean acidification?", ["Hydrogen", "Oxygen", "Methane", "Carbon Dioxide"], "Carbon Dioxide"),
    new Question("Q5: What contributes to Water Pollution?", ["Drinking lots of water", "Untreated sewage", "Sleeping", "Watching YouTube"], "Untreated sewage"),
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();