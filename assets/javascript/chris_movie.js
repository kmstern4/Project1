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


window.onload = function (event) {
    console.log("loaded");
    event.preventDefault();

    database.ref('/movieList').on("value", function (snapshot) {
        // console.log(snapshot);
        // console.log(snapshot.key);
        // console.log(snapshot.val());

        var query = firebase.database().ref(snapshot.key).orderByKey();
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

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

}

//testing: this is to append the 2nd stage where movie buttons are replaced by selected movies, associated theater and show times, still needs work.
$(document).on("change", "#movie-dropdown", function () {
    console.log("changed");

    // selected value from dropdown list
    var thisMovie = $(this).children("option").filter(":selected").text();
    console.log("thisMovie: " + thisMovie);

    // databasemovieTitle
    database.ref('/movieTitle').orderByChild("title").equalTo(thisMovie).on("value", function (snapshot) {
        // console.log(snapshot);
        // console.log(snapshot.key);
        // console.log(snapshot.val());

        // console.log("snapshot.key.length: " + snapshot.key.length);

        var TheatreList = [];
        // console.log("TheatreList.length: " + TheatreList.length);

        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            // console.log(childData);

            // push the data of specific movie for 'by theatre' into firebase
            database.ref('/theatreShowing').push({
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
            // console.log("TheatreList: " + TheatreList);
        });

        // make showtime array by the title, by the theatre 

        for (var i = 0; i < TheatreList.length; i++) {
            // retreive the data from '/theatreShowing'
            database.ref('/theatreShowing').orderByChild("theatreID").equalTo(TheatreList[i]).on("value", function (snapshot) {
                var newTheatreName = "";
                var showList = [];
                console.log("==============================");
                console.log(snapshot.val());

                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    newTheatreName = childSnapshot.val().theatreName;
                    showList[showList.length] = childSnapshot.val().showTime;
                });

                console.log(newTheatreName);
                console.log(showList);
                var newRow = "<div class='theater-text'><p class='theater-title'>" + newTheatreName + "</p>"
                    + "<p>" + showList.join('') + "</p></div>";

                if (i == 0) {
                    $("#theater-show").html(newRow);
                }
                else {
                    $("#theater-show").append(newRow);
                }


            });
            database.ref('/theatreShowing').remove;
        }

        
    });




});

// $(document).on("click", "#movie-results", function () {

//     var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + long + "&sort=aggregate_rating";

//     var settings = {
//         "url": queryURL,
//         "method": "GET",
//         "headers": {
//             "user-key": "10bbf65b13ae378a2323cf3b8c13c49f"
//         }
//     }

//     $.ajax(settings).done(function (response) {
//         console.log(response);
//         console.log("dogs");
//         $("#test-div").empty();
//     });

// });
