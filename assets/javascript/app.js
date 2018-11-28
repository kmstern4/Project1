// Firebase initialization
var config = {
    apiKey: "AIzaSyBWh8dV01ACirfiAi9BzD2WgEPJxLTVbtM",
    authDomain: "project1-b0016.firebaseapp.com",
    databaseURL: "https://project1-b0016.firebaseio.com",
    projectId: "project1-b0016",
    storageBucket: "project1-b0016.appspot.com",
    messagingSenderId: "278617804793"
};
firebase.initializeApp(config);

var database = firebase.database();

// Pull values from location and name forms .val().trim();
var location = "";
var name = "";

//on click function to open second page and launch traitify quiz

$("#placeholder").on("click", function(){ 

    //Open a second page

    //Run Ajax traitify 

    //ajax function for traitify api
        var traitifyUrl = "";

    $.ajax({
        method: "GET",
        url: traitifyUrl  
    }).then(function(response) {
        console.log(response);
    });

    //Store the traitify response dealing with reccommended jobs in firebase?
});

//When quiz is finished load 3rd page with results

    //Place traitify reccommended jobs and username on page

    //Create an on click or on load function to run Indeed api and list top results on page

    // ajax function for indeed api
        var jobUrl = "" + //var location + var quizJobs;

    $.ajax({
        method: "GET",
        url: jobUrl
    }).then(function(response) {
        console.log(response);
    }); 



