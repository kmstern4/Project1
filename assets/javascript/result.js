
// Zomato
// API-key : 10bbf65b13ae378a2323cf3b8c13c49f
// URL https://developers.zomato.com/api/v2.1/geocode?lat=dfa&lon=dfa
//     https://developers.zomato.com/api/v2.1/locations?query=denver&count=5



//on click function for submit button
$("#submit").on("click", function () {
    var location = $("#input-location").val().trim();
    console.log(location);

    // var url = "https://cors-anywhere.herokuapp.com/https://api-gate.movieglu.com/filmsNowShowing/?n=10",
    // url: url + "/geocode",
    // headers: zheader,
    // data: {
    //     lat: coords.latitude,
    //     lon: coords.longitude
    // },
    // zheader = {
    //     Accept: "text/plain; charset=utf-8",
    //     "Content-Type": "text/plain; charset=utf-8",
    //     "X-Zomato-API-Key": "10bbf65b13ae378a2323cf3b8c13c49f"
    // };


    var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=40.742051&lon=-74.004821" ;

    var settings = {
        "url": queryURL,
        "method": "GET",
        "headers" : {
            "user-key": "10bbf65b13ae378a2323cf3b8c13c49f"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    })

});
