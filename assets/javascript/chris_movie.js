// Initialize Firebase
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

// ================global variables====================
// get parameters from previous page
var parameters = window.location.search.substring(1).split("&");
//  console.log(parameters[0]);
//  console.log(parameters[1]);
//  console.log(parameters[2]);

var sessionID = parameters[0].substring(0).split("=");
sessionID = sessionID[1];
var lat = parameters[1].substring(0).split("=");
lat = lat[1];
var long = parameters[2].substring(0).split("=");
long = long[1];

console.log(sessionID);
console.log(lat);
console.log(long);

var userMovieTitleRef = sessionID + '/movieTitle';
var userMovieListRef = sessionID + '/movieList';
var usertheatreShowing = sessionID + '/theatreShowing';


window.onload = function (event) {
    // console.log("loaded");
    // console.log("sessionID: " + sessionID);
    event.preventDefault();


    var query = firebase.database().ref(userMovieListRef).orderByKey();
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                // console.log(key);
                // console.log(childData);
                // console.log(childData.movieList[0]);
                for (var i = 0; i < childData.movieList.length; i++) {
                    // if (i == 0) {
                    //     $("#movie-dropdown").html($("<option>")
                    //         .val("value")
                    //         .html(childData.movieList[i])
                    //     );
                    // }
                    // else {
                    //     $("#movie-dropdown").append($("<option>")
                    //         .val("value")
                    //         .html(childData.movieList[i])
                    //     );
                    // }
                    $("#movie-dropdown").append($("<option>")
                        .val("value")
                        .html(childData.movieList[i])
                    );

                }

            });
        });

}

// when user select the movie from the dropdown list
$(document).on("change", "#movie-dropdown", function () {
    // console.log("changed");

    //remove previous data database.ref(usertheatreShowing).remove;
    database.ref(sessionID).child("theatreShowing").remove();

    // selected value from dropdown list
    var thisMovie = $(this).children("option").filter(":selected").text();
    console.log("thisMovie: " + thisMovie);

    // databasemovieTitle
    database.ref(userMovieTitleRef).orderByChild("title").equalTo(thisMovie).on("value", function (snapshot) {
        console.log("database userMovieTitleRef======================");
        // console.log(snapshot);
        // console.log(snapshot.key);
        console.log(snapshot.val());

        // console.log("snapshot.key.length: " + snapshot.key.length);

        var TheatreList = [];
        // console.log("TheatreList.length: " + TheatreList.length);

        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            console.log("childData userMovieTitleRef======================");
            console.log(childData);

            // push the data of specific movie for 'by theatre' into firebase
            database.ref(usertheatreShowing).push({
                title: childData.title,
                theatreID: childData.theatreID,
                theatreName: childData.theatreName,
                showDate: childData.showDate,
                showTime: childData.showTime
            });

            // maka a list of theatre of specific movie
            if (TheatreList.indexOf(childData.theatreID) == -1) {
                TheatreList[TheatreList.length] = childData.theatreID;
            }
            console.log("TheatreList: " + TheatreList);
        });

        // make showtime array by the title, by the theatre 
        for (var i = 0; i < TheatreList.length; i++) {
            // retreive the data from user'/usertheatreShowing'
            database.ref(usertheatreShowing).orderByChild("theatreID").equalTo(TheatreList[i]).on("value", function (snapshot) {
                var newTheatreName = "";
                var showList = [];
                console.log("============usertheatreShowing==================");
                console.log(snapshot.val());

                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    newTheatreName = childSnapshot.val().theatreName;
                    showList[showList.length] = childSnapshot.val().showTime;
                });

                // console.log(newTheatreName);
                // console.log(showList);
                var newRow = "<div class='theater-text'><p class='theater-title'>" + newTheatreName + "</p>"
                    + "<p class='showtimes'>" + showList.join('   ') + "</p></div>";

                if (i == 0) {
                    $("#theater-show").html(newRow);
                }
                else {
                    $("#theater-show").append(newRow);
                }


            });
        }

    });

});


// user select the theater call dinner.html
$(document).on("click", ".theater-text", function (event) {
    event.preventDefault();
    console.log("theater selected. call the dinner.html");
    //remove data from database.ref(sessionID).remove;
    database.ref(sessionID).remove();

    // when data trasaction is done, call third page with sessionID
    window.location.href = "dinner.html?sessionID=" + sessionID + "&lat=" + lat + "&long=" + long;

});