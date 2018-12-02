//create an object that holds all questions and answers

var questionsObject = {
    q1: {
        q: "What Color is the Sky?",
        possibleAnswers: ["blue", "green", "yellow", "red"],
        answer: "blue",
        imageLocation: "assets/images/happy1.gif"

    },
    q2: {
        q: "Who said the answer is 42?",
        possibleAnswers: ["Douglas Adams", "Hurbert Walker", "Siri", "Mother Terisa"],
        answer: "Douglas Adams",
        imageLocation: ""
    }

};

//create the score varables used for wrong and correct answers selected.
var guessedCorrect = 0;
var guessedInncorect = 0;
var noGuessAnswers = 0;
var timeLeft = 30;
var intervalId;
var questionCounter = 1;
var correctAnswer = "";
var questionImg = "";

// code a start game function on page load

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



//code a for loop to create the answer buttons and select a question from the object


function displayQuestion(x) {
    var currentQuestion = eval("questionsObject.q" + x + ".q")


    var answers = eval("questionsObject.q" + x + ".possibleAnswers")

    correctAnswer = eval("questionsObject.q" + x + ".answer")

    questionImg = eval("questionsObject.q" + x + ".imageLocation")

    for (i = 0; i < answers.length; i++) {
        var answersDiv = $("<div>");
        var h1 = $("<h1>");
        h1.attr("class", "answer-generated")
        h1.val(answers[i])
        h1.text(answers[i])

        answersDiv.append(h1)

        $("#answers").append(answersDiv)

    }
    $(".question").text(currentQuestion)
}

//create a function to display wrong and correct answers with picuters.

function correctGuess() {
    $("#answers").empty()
    questionCounter++

    var imgTag = $("<img>")
    imgTag.attr("src", questionImg)

    $("#answers").html("<h1>Correct!!!</h1>")
    $("#answers").append(imgTag)

}

//create a function to listen for click of the answer buttons. in this function it needs to compair the clicked answer to the correct answer and update the screen with the answer.
displayQuestion(questionCounter);

$(".answer-generated").on("click", function () {
    var answerClicked = $(this).val();
    if (answerClicked === correctAnswer) {
        correctGuess()
    }
})