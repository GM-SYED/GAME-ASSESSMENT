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
    new Question("Q1: What is Air Pollution?", ["When the birds die", "When the air is misty", "When the atmosphere is contaminated by chemicals ", "When the weather is terrible"], "When the atmosphere is contaminated by chemicals" ),
    new Question("Q2: What is the main gas responsible for air pollution?", ["Nitrogen", "Carbon dioxide", "Methane", "Helium"], "Carbon dioxide"),
    new Question("Q3: What percentage of Earth's air has been polluted?", ["80.2%", "99.8%", "78.5%", "86.3%"], "99.8%"),
    new Question("Q4: Which of the following contributes to air pollution?", ["Deforestation", "Sleeping", "Eating", "Playing"], "Deforestation"),
    new Question("Q5: What happens in the Greenhouse Effect?", ["The greenhouse is green", "When the greenhouse is full of plants", "When the Earth's surface warms up", "When the effect is green"], "Delta"),
];

//Create Quiz
var quiz = new Quiz(questions);

//Display Quiz
QuizUI.displayNext();