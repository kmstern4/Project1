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

// ================user connection====================
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        // var con = connectionsRef.push({
        //     dateAdded: firebase.database.ServerValue.TIMESTAMP
        // });
        var con = connectionsRef.push(true);
  
   
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes...
connectionsRef.orderByChild("dateAdded").limitToLast(1).on("child_added", function (snap) {
    // console.log("database child_added");
    console.log("================child_added==================");
    console.log(snap.val());
    console.log(snap.key);
    if (!gotSessionID) {
        gotSessionID = true;
        sessionID = snap.key;
    }
    console.log("sessionID: " + sessionID);
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// ================global variables====================
var geoLocation;
var lat;
var long;
var gotSessionID = false;
var sessionID = "";

// ============== program start ======================
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
    })

    //This is the ajax call on gracenote API using the location variables
    $.ajax({
        url: "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + location + "&api_key=ebxmggvfebvqkmhczkwvzxk4",
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var movieList = [];
        for (var i = 0; i < 10; i++) {
            // console.log(snapshot.val()[i]);
            var title = snapshot.val()[i].title;
            movieList[i] = title;

            for (var j = 0; j < snapshot.val()[i].showtimes.length; j++) {
                var showDate = snapshot.val()[i].showtimes[j].dateTime.substr(0, 10);
                var showTime = snapshot.val()[i].showtimes[j].dateTime.substr(11, 6);
                var theatreID = snapshot.val()[i].showtimes[j].theatre.id;
                var theatreName = snapshot.val()[i].showtimes[j].theatre.name;

                // push the json data into firebase
                var userMovieTitleRef = sessionID + '/movieTitle';
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
        var userMovieListRef = sessionID + '/movieList';
        database.ref(userMovieListRef).push({
            movieList: movieList
        });
        // when data trasaction is done, call seconde page
        window.location.href = "movie.html"
    });
    
});
















