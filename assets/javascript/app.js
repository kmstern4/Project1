
var geoLocation;
var cinemaLocation;
var lat;
var long;

//on click function for submit button
$("#submit").on("click", function () {
    var date = $("#input-date").val().trim();
    moment(date).format('YYYY-MM-DD');
    var location = $("#input-location").val().trim();
    console.log(date);

    //Geocode ajax to convert address to lat and long
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyC7cYVBuDvtxBDLzn62sHS0VlrDUf-WJMU",
        method: "GET"
    }).then(function (response) {
        console.log(response.results[0].geometry.location);

        lat = response.results[0].geometry.location.lat;
        long = response.results[0].geometry.location.lng;
        geoLocation = lat + ";" + long;
    })

    //This is the ajax call on gracenote API using the lat and long variables
    $.ajax({
        url: "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + location + "&api_key=ebxmggvfebvqkmhczkwvzxk4",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });


});




