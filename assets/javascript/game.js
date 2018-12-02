//create an object that holds all questions and answers

$(document).ready(function () {

    var questionsObject = {
        "1": {
            q: "Where is the longest lasting lightbulb currently lit?",
            possibleAnswers: ["New York", "California", "London", "Paris"],
            answer: "California",
            imageLocation: "assets/images/longestlight.jpg"

        },
        "2": {
            q: "Who invented the first lightbuld?",
            possibleAnswers: ["Henry Ford", "Humphry Davy", "Nicola Tesla", "Thomas Edison"],
            answer: "Humphry Davy",
            imageLocation: "assets/images/humphydavy.jpg"
        },
        "3": {
            q: "What hosted the first event that used lighting and clinched AC electricity?",
            possibleAnswers: ["Utah Becomes a State", "Chicago World's Fair", "Effile Tower Built", "Nobel Prize Created"],
            answer: "Chicago World's Fair",
            imageLocation: "assets/images/worldsfair.jpg"
        },
        "4": {
            q: "How many lights on a house is currently the world record?",
            possibleAnswers: ["601,736", "1.1b", "204,451", "86,923"],
            answer: "601,736",
            imageLocation: "assets/images/mostlightsonhouse.jpg"
        },
        "5": {
            q: "How many lights on a house is currently the world record?",
            possibleAnswers: ["601,736", "1.1b", "204,451", "86,923"],
            answer: "601,736",
            imageLocation: "assets/images/mostlightsonhouse.jpg"
        },
        "6": {
            q: "How many lights on a house is currently the world record?",
            possibleAnswers: ["601,736", "1.1b", "204,451", "86,923"],
            answer: "601,736",
            imageLocation: "assets/images/mostlightsonhouse.jpg"
        },
        "7": {
            q: "How many lights on a house is currently the world record?",
            possibleAnswers: ["601,736", "1.1b", "204,451", "86,923"],
            answer: "601,736",
            imageLocation: "assets/images/mostlightsonhouse.jpg"
        },
        "8": {
            q: "How many lights on a house is currently the world record?",
            possibleAnswers: ["601,736", "1.1b", "204,451", "86,923"],
            answer: "601,736",
            imageLocation: "assets/images/mostlightsonhouse.jpg"
        },
        "9": {
            q: "How many lights on a house is currently the world record?",
            possibleAnswers: ["601,736", "1.1b", "204,451", "86,923"],
            answer: "601,736",
            imageLocation: "assets/images/mostlightsonhouse.jpg"
        },
        "10": {
            q: "How many lights on a house is currently the world record?",
            possibleAnswers: ["601,736", "1.1b", "204,451", "86,923"],
            answer: "601,736",
            imageLocation: "assets/images/mostlightsonhouse.jpg"
        }

    };

    // create varables for the game
    var guessedCorrect = 0;
    var guessedInncorect = 0;
    var noGuessAnswers = 0;
    var timeReset = 10
    var timeLeft = 10;
    var intervalId;
    var qCounter = 1;
    var correctAnswer = "";
    var questionImg = "";

    //  create functions for the specific tasks

    //when game loads
    function gameLoad() {
        var startButton = $("<h1>");
        startButton.addClass("startButton");
        startButton.text("Start");
        $("#answers").append(startButton);
        $(".startButton").on("click", function () {
            emptyText();
            displayQuestion(qCounter);
        })

    }

    // to clear the screen
    function emptyText() {
        $("#answers").empty();
        $(".question").empty();
    }

    //what happens when guessed correctly
    function correctGuess() {
        guessedCorrect++;
        stop();
        timeLeft = timeReset;
        $("#timeLeft").html(timeLeft);
        emptyText();
        $(".question").text("Correct!!");
        var imgDisplay = $("<img>");
        imgDisplay.attr("src", questionImg);
        $("#answers").append(imgDisplay);

    }

    //what happens when incorrectly guessed
    function incorrectGuess() {
        guessedInncorect++;
        stop();
        timeLeft = timeReset;
        $("#timeLeft").html(timeLeft);
        emptyText();
        $(".question").text("Incorrect!!");
        $("#answers").html("<h2>Correct answer was: " + correctAnswer + "</h2>");
        var imgDisplay = $("<img>");
        imgDisplay.attr("src", questionImg);
        $("#answers").append(imgDisplay);
    }

    //what happens when the timer reaches zero
    function timmerUp() {
        noGuessAnswers++;
        stop();
        timeLeft = timeReset;
        $("#timeLeft").html(timeLeft);
        $("#answers").empty();
        $(".question").empty();
        qCounter++;
        setTimeout(function () {
            displayQuestion(qCounter)
        }, 3000);

        $(".question").text("Times Up!!");
        $("#answers").html("<h2>Correct answer was: " + correctAnswer + "</h2>");
        var imgDisplay = $("<img>");
        imgDisplay.attr("src", questionImg);
        $("#answers").append(imgDisplay);

    };

    //create function to end the game

    function gameOver() {
        $(".question").text("Game Over");
        $("#answers").append("<p> Correctly Guessed: " + guessedCorrect + "</p>");
        $("#answers").append("<p> Incorreclty Guessed: " + guessedInncorect + "</p>");
        $("#answers").append("<p> Unanswered Questions: " + noGuessAnswers + "</p>");

        var startButton = $("<h1>");
        startButton.addClass("startButton");
        startButton.text("Play Again?");
        $("#answers").append(startButton);
        $(".startButton").on("click", function () {
            $("#answers").empty();
            guessedCorrect = 0;
            guessedInncorect = 0;
            qCounter = 1;
            noGuessAnswers = 0;
            displayQuestion(qCounter);
        });
    };

    // create function to reach inot object, pull out questions and answers and to update the display with the information

    function displayQuestion(x) {
        emptyText();
        if (qCounter === 11) {
            gameOver()

        } else {
            var currentQuestion = questionsObject[x].q;

            var answers = questionsObject[x].possibleAnswers;

            correctAnswer = questionsObject[x].answer;

            questionImg = questionsObject[x].imageLocation;

            for (i = 0; i < answers.length; i++) {
                var answersDiv = $("<div>");
                var h1 = $("<h1>");
                h1.addClass("answer-generated");
                h1.val(answers[i]);
                h1.text(answers[i]);

                answersDiv.append(h1);

                $("#answers").append(answersDiv);

            }
            $(".question").text(currentQuestion);
            countDownTimer();

            $(".answer-generated").on("click", function () {

                var answerClicked = $(this).val();
                if (answerClicked === correctAnswer) {
                    qCounter++;
                    correctGuess();
                    setTimeout(function () {
                        displayQuestion(qCounter)
                    }, 3000);
                } else {
                    qCounter++;
                    incorrectGuess();
                    setTimeout(function () {
                        displayQuestion(qCounter)
                    }, 3000);

                }
            })

        }
    }





    //code a timer for each question


    function countDownTimer() {
        clearInterval(intervalId)
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        timeLeft--;
        $("#timeLeft").html(timeLeft)

        if (timeLeft === 0) {
            timmerUp()



        }
    }

    function stop() {
        clearInterval(intervalId)
    }

    //game starts at page load

    gameLoad()

});