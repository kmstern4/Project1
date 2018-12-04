// ================global variables====================
var geoLocation;
var lat;
var long;
var gotSessionID = false;
var sessionID = "";
var movieLimit = 10;


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

// create user dependant sessionID
var sessionID = Math.random().toString(36).substring(7) + Math.floor(Math.random() * 100000000000);
console.log("sessionID: " + sessionID);

// set variables for generating user dependant table
var userMovieTitleRef = sessionID + "/movieTitle";
var userMovieListRef = sessionID + "/movieList";
var usertheatreShowing = sessionID + "/theatreShowing";

console.log(userMovieTitleRef);
console.log(userMovieListRef);
console.log(usertheatreShowing);
// ============== event start ======================
//on click function for submit button
$("#submit").on("click", function () {
    var date = $("#input-date").val().trim();
    // var newDate = moment(date, "YYYY-MM-DD");
    var location = $("#input-location").val().trim();
    console.log(date);

    //Geocode ajax to convert address to lat and long, not currently being used
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyC7cYVBuDvtxBDLzn62sHS0VlrDUf-WJMU",
        method: "GET"
    }).then(function (response) {
        console.log(response.results[0].geometry.location);

        //variables below originally used but no longer serve function. delete if we dont find use
        lat = response.results[0].geometry.location.lat;
        long = response.results[0].geometry.location.lng;
        geoLocation = lat + ";" + long;
        console.log("lat: " + lat + " long: " + long);
    })

    // =========================tmsapi API===========================================
    // This is the ajax call on gracenote API using the location variables
    // =========================tmsapi API===========================================
    $.ajax({
        url: "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + location + "&api_key=ebxmggvfebvqkmhczkwvzxk4",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // console.log("sessionID tmsapi ajax: " + sessionID);
        // console.log("userMovieListRef: " + userMovieListRef);
        var movieList = [];
        for (var i = 0; i < movieLimit; i++) {
            // console.log(response.val()[i]);
            var title = response[i].title;
            movieList[i] = title;
            console.log("in the array: " + movieList);

            for (var j = 0; j < response[i].showtimes.length; j++) {
                var showDate = response[i].showtimes[j].dateTime.substr(0, 10);
                var showTime = response[i].showtimes[j].dateTime.substr(11, 6);
                var theatreID = response[i].showtimes[j].theatre.id;
                var theatreName = response[i].showtimes[j].theatre.name;

                // push the json data into firebase
                database.ref(userMovieTitleRef).push({
                    title: title,
                    showDate: showDate,
                    showTime: showTime,
                    theatreID: theatreID,
                    theatreName: theatreName
                });
            }
        }; // end for(var i)
        console.log(movieList);
        // push the json data of movie List into firebase
        database.ref(userMovieListRef).push({
            movieList: movieList
        });
        // when data trasaction is done, call seconde page with sessionID
        window.location.href = "movie.html?sessionID=" + sessionID + "&lat=" + lat + "&long=" + long;
    });


    // // when the tmsapi API touch the limit, use firebase pre-stored data from tmsapi API
    // var tmsapiRef = database.ref("/tmsapi/-LSbXj4EJyJWqK171SWX/response").once("value", function (snapshot) {
    //     console.log(snapshot.val());
    //     var movieList = [];
    //     // differnet title of movie
    //     for (var i = 0; i < movieLimit; i++) {
    //         // console.log(snapshot.val()[i]);
    //         var title = snapshot.val()[i].title.trim();

    //         movieList[i] = title;

    //         for (var j = 0; j < snapshot.val()[i].showtimes.length; j++) {
    //             var showDate = snapshot.val()[i].showtimes[j].dateTime.substr(0, 10);
    //             var showTime = snapshot.val()[i].showtimes[j].dateTime.substr(11, 6);
    //             var theatreID = snapshot.val()[i].showtimes[j].theatre.id;
    //             var theatreName = snapshot.val()[i].showtimes[j].theatre.name;

    //             // push the json data into firebase
    //             database.ref(userMovieTitleRef).push({
    //                 title: title,
    //                 showDate: showDate,
    //                 showTime: showTime,
    //                 theatreID: theatreID,
    //                 theatreName: theatreName
    //             });
    //         }
    //     }; // end for(var i)
    //     console.log(movieList);
    //     // push the json data of movie List into firebase
    //     var userMovieListRef = sessionID + '/movieList';
    //     database.ref(userMovieListRef).push({
    //         movieList: movieList
    //     });

    // });
    // // when data trasaction is done, call seconde page
    // window.location.href = "movie.html?sessionID=" + sessionID + "&lat=" + lat + "&long=" + long;



});


