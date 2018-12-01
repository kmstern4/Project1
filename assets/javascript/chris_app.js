
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
        console.log(response);

        //prints 10 buttons of movie selections
        var movieArray = response;
        for (var i = 0; i < 10; i++) {
            var filmName = movieArray[i].title;
            var theater = movieArray[i].showtimes[0].theatre.name;
            var showtime = movieArray[i].showtimes[0].dateTime;
            showTimes.push(showtime);
            var newButton = $("<button>").text(filmName).attr("id", theater).attr("data-date", showtime).addClass("film-button");
            $("#test-div").append(newButton);
        }
    });
});
//testing: this is to append the 2nd stage where movie buttons are replaced by selected movies, associated theater and show times, still needs work.
$(document).on("click", ".film-button", function () {
    var theater = $(this).attr("id");
    var time = $(this).attr("data-date");
    $("#test-div").empty();
    console.log(showTimes);
    // str.substr(11, 6);
    var newP = $("<div id='movie-results'>").append(
        $("<p>").text(theater),
        $("<p>").text(showTimes[0].substr(11, 6)),
        $("<p>").text(showTimes[1].substr(11, 6)),
        $("<p>").text(showTimes[2].substr(11, 6))
    );
    $("#test-div").append(newP);

});

$(document).on("click", "#movie-results", function () {

    var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + long + "&sort=aggregate_rating";

    var settings = {
        "url": queryURL,
        "method": "GET",
        "headers": {
            "user-key": "10bbf65b13ae378a2323cf3b8c13c49f"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log("dogs");
        $("#test-div").empty();
    });

});














