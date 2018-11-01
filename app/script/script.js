//array containing all questions for the user
var questions = [
    "I do what I want, whenever I want.",
    "Brahmin are friends, not food.",
    "I'd rather tread lightly than carry a big stick.",
    "I don't care for the company of others.",
    "I'm more important than anyone else.",
    "Doing the right thing is always the most important thing.",
    "A mini-nuke a day keeps the Deathclaw away.",
    "The ends justify the means.",
    "It's not what you know, it's who you know.",
    "Synthetic life is still life."
]

//used to store user entries
var userEntry = [];

//records survey state
var surveyState = 0;

var currentCheck;
var currentMatch;
var matchValue = 200;

//handles the display of the question to the user
function questionDisplay() {
    $("#question-div").text(questions[surveyState]);
    surveyState++;
}

//creates the selectmaker, recreates so it starts back at default entry
function selectMaker(){
    //removes the existing select if beyond first question
    if (surveyState > 0){
        $("#userSelect").remove();
    }
    var selectElement = $("<select>")
    var newSelect = "<select>";
    for (i = 1; i <= 5; i++){
        newSelect += "<option value = " + i +">";
        newSelect += i;
        newSelect += "</option>"
    }
    newSelect += "</select>"
    $(selectElement).html(newSelect);
    $(selectElement).addClass("ml-2");
    $(selectElement).attr("id", "userSelect")
    $("#submit-div").append(selectElement);
};

//on load event (script start)
$(document).ready(function(){
    $("#start-button").on("click", function(){
        $("#start-button").remove();
        var newButton = $("<button>");
        $(newButton).addClass("btn btn-success mx-auto");
        $(newButton).attr("id", "submit-button");
        $(newButton).text("Submit")
        $("#submit-div").append(newButton);
        selectMaker();
        questionDisplay();
    });
});

//when submit is clicked
$(document).on("click", "#submit-button", function(){
    var newEntry = $("#userSelect").val();
    userEntry.push(newEntry);
    selectMaker();
    if (surveyState === 10){
        submitResults();
    } else {
        questionDisplay();
    }
});

//this submits the user's results to be compared against stored results
function submitResults() {

    $.get("api/users", function (data){
        for (i = 0; i < data.length; i++){
            resultCheck(data[i]);
        }
        modalCreation(currentMatch)
    })

}

//this checks the results against
function resultCheck(x){
    var totalDif = 0;
    for (a = 0; a < 10; a++){
        totalDif += Math.abs(x.answers[a] - userEntry[a]);
    }
    if (totalDif <= matchValue) {
        currentMatch = x;
        matchValue = totalDif;
    }

}

//this handles the creation of the modal content, using the retreived JSON data
function modalCreation (result) {
    var newImg = $("<img>");
    newImg.attr("src", result.image);
    newImg.addClass("resultPic");
    $("#desc-target").append(newImg);

    var newDesc = $("<div>");
    $(newDesc).text(result.description);
    $(newDesc).addClass("text-success");

    $("#desc-target").append(newDesc);
    $('#resultModal').modal();
}
