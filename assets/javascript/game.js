//create an object that holds all questions and answers

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

//create the score varables used for wrong and correct answers selected.
var guessedCorrect = 0;
var guessedInncorect = 0;
var noGuessAnswers = 0;
var timeLeft = 30;
var intervalId;
var qCounter = 1;
var correctAnswer = "";
var questionImg = "";





//code a for loop to create the answer buttons and select a question from the object

function correctGuess() {
    guessedCorrect++
    stop()
    timeLeft = 30
    $("#timeLeft").html(timeLeft)
    $("#answers").empty()
    $(".question").empty()
}

function incorrectGuess() {
    guessedInncorect++
    stop()
    timeLeft = 30
    $("#timeLeft").html(timeLeft)
    $("#answers").empty()
    $(".question").empty()
}

function gameOver() {
    console.log(guessedCorrect);
    console.log(guessedInncorect);
    console.log(noGuessAnswers);
}

function displayQuestion(x) {
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
                }, 5000)
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
        stop();


    }
}

function stop() {
    clearInterval(intervalId)
}


displayQuestion(qCounter)