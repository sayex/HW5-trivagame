//create an object that holds all questions and answers

$(document).ready(function () {

    var questionsObject = {
        "1": {
            q: "What Color is the Sky?",
            possibleAnswers: ["blue", "green", "yellow", "red"],
            answer: "blue",
            imageLocation: "assets/images/happy1.gif"

        },
        "2": {
            q: "Who said the answer is 42?",
            possibleAnswers: ["Douglas Adams", "Hurbert Walker", "Siri", "Mother Terisa"],
            answer: "Douglas Adams",
            imageLocation: "assets/images/tenor.gif"
        },
        "3": {
            q: "Did Someone Say test?",
            possibleAnswers: ["Yes", "No", "Maybe", "Kinda"],
            answer: "Yes",
            imageLocation: "assets/images/tenor.gif"
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
        startButton.text("Start")
        $("#answers").append(startButton)
        $(".startButton").on("click", function () {
            emptyText();
            displayQuestion(qCounter);
        })

    }

    // to clear the screen
    function emptyText() {
        $("#answers").empty()
        $(".question").empty()
    }

    //what happens when guessed correctly
    function correctGuess() {
        guessedCorrect++
        stop()
        timeLeft = timeReset
        $("#timeLeft").html(timeLeft)
        emptyText()
        $(".question").text("Correct!!")
        var imgDisplay = $("<img>")
        imgDisplay.attr("src", questionImg)
        $("#answers").append(imgDisplay);

    }

    //what happens when incorrectly guessed
    function incorrectGuess() {
        guessedInncorect++
        stop()
        timeLeft = timeReset
        $("#timeLeft").html(timeLeft)
        emptyText()
        $(".question").text("Incorrect!!")
        $("#answers").html("<h2>Correct answer was: " + correctAnswer + "</h2>")
    }

    //what happens when the timer reaches zero
    function timmerUp() {
        noGuessAnswers++
        stop()
        timeLeft = timeReset
        $("#timeLeft").html(timeLeft)
        $("#answers").empty()
        $(".question").empty()
        qCounter++
        setTimeout(function () {
            displayQuestion(qCounter)
        }, 3000)
        $(".question").text("Times Up!!")
        $("#answers").html("<h2>Correct answer was: " + correctAnswer + "</h2>")


    }

    //create function to end the game

    function gameOver() {
        $(".question").text("Game Over")
        $("#answers").append("<p> Correctly Guessed: " + guessedCorrect + "</p>")

        $("#answers").append("<p> Incorreclty Guessed: " + guessedInncorect + "</p>")

        $("#answers").append("<p> Unanswered Questions: " + noGuessAnswers + "</p>")

        var startButton = $("<h1>");
        startButton.addClass("startButton");
        startButton.text("Play Again?")
        $("#answers").append(startButton)
        $(".startButton").on("click", function () {
            $("#answers").empty();
            guessedCorrect = 0
            guessedInncorect = 0
            qCounter = 1
            noGuessAnswers = 0
            displayQuestion(qCounter);
        })
    }

    // create function to reach inot object, pull out questions and answers and to update the display with the information

    function displayQuestion(x) {
        emptyText();
        if (qCounter === 4) {
            gameOver()

        } else {
            var currentQuestion = questionsObject[x].q


            var answers = questionsObject[x].possibleAnswers;

            correctAnswer = questionsObject[x].answer;

            questionImg = questionsObject[x].imageLocation;

            for (i = 0; i < answers.length; i++) {
                var answersDiv = $("<div>");
                var h1 = $("<h1>");
                h1.addClass("answer-generated")
                h1.val(answers[i])
                h1.text(answers[i])

                answersDiv.append(h1)

                $("#answers").append(answersDiv)

            }
            $(".question").text(currentQuestion)
            countDownTimer()

            $(".answer-generated").on("click", function () {

                var answerClicked = $(this).val();
                if (answerClicked === correctAnswer) {
                    qCounter++
                    correctGuess();
                    setTimeout(function () {
                        displayQuestion(qCounter)
                    }, 3000)
                } else {
                    qCounter++
                    incorrectGuess()
                    setTimeout(function () {
                        displayQuestion(qCounter)
                    }, 3000)

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