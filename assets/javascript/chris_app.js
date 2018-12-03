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


var geoLocation;
var cinemaLocation;
var lat;
var long;
var showTimes = [];

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
        //prints 10 buttons of movie selections
        // var movieArray = response;
        // for (var i = 0; i < 10; i++) {
        //     var filmName = movieArray[i].title;
        //     var theater = movieArray[i].showtimes[0].theatre.name;
        //     var showtime = movieArray[i].showtimes[0].dateTime;
        //     showTimes.push(showtime);
        //     var newButton = $("<button>").text(filmName).attr("id", theater).attr("data-date", showtime).addClass("film-button");
        //     $("#test-div").append(newButton);
        // }
        var movieList = response;
        console.log(movieList);

        for (var i = 0; i < movieList.length; i++) {

            for (var j = 0; j < movieList[i].showtimes.length; j++) {
                var title = movieList[i].title;
                var showDate = movieList[i].showtimes[j].dateTime.substr(0, 10);
                var showTime = movieList[i].showtimes[j].dateTime.substr(11, 6);
                var theatreID = movieList[i].showtimes[j].theatre.id;
                var theatreName = movieList[i].showtimes[j].theatre.name;
                var newButton = $("<button>").text(filmName).attr("id", theater).attr("data-date", showtime).addClass("film-button");
                $("#test-div").append(newButton);



                // push the json data into firebase
                database.ref('/movieTitle').push({
                    title: title,
                    showDate: showDate,
                    showTime: showTime,
                    theatreID: theatreID,
                    theatreName: theatreName
                });
            }
        }; // end for(var i)

        // push the json data of movie List into firebase
        database.ref('/movieList').push({
            movieList: movieList
        });
    });

    function redirect() {
        var url = "movie.html";
        window.location.href = (url);
    }
    redirect();
});
















