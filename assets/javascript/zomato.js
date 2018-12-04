
// Zomato
// API-key : 10bbf65b13ae378a2323cf3b8c13c49f
// URL https://developers.zomato.com/api/v2.1/geocode?lat=34&lon=-104
//     https://developers.zomato.com/api/v2.1/locations?query=denver&count=5



//on click function for submit button
$(document).ready(function () {
    // var location = $("#input-location").val().trim();
    // console.log(location);

    var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=39.742043&lon=-104.991531";

    var settings = {
        "url": queryURL,
        "method": "GET",
        "headers": {
            "user-key": "91fffe725f859f8e4551d3f924489ca8"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);

        for (let i = 0; i < 3; i++) {

            var restaurant = response.nearby_restaurants[i].restaurant.name;
            var address = response.nearby_restaurants[i].restaurant.location.address;
            var menuLink = response.nearby_restaurants[i].restaurant.menu_url;
            var rating = response.nearby_restaurants[i].restaurant.user_rating.aggregate_rating;
            var price = response.nearby_restaurants[i].restaurant.price_range;
            var cuisine = response.nearby_restaurants[i].restaurant.cuisines;
            var newBox = '<div class="dinner-results"><p class="dinner-restaurant" data-restaurant="' + restaurant + '" data-menu=' + menuLink + ' data-address="' + address + '" data-rating="' + rating + '" data-price="' + price +'">'+restaurant+'</p><p class="dinner-cuisine">' + cuisine + '</p></div>';

            $(".results").append(newBox);
            console.log(restaurant);
        }

        $(document).on("click", ".dinner-restaurant", function(){
            console.log(this);
            $(".dinner-name").text($(this).attr("data-restaurant"));
            $(".dinner-address").text($(this).attr("data-address"));
            $(".dinner-menu").attr("href", ($(this).attr("data-menu")));
            $(".menu-link").text("Menu Link");
            $(".dinner-rating").text("Rating: " + ($(this).attr("data-rating")));
            $(".dinner-price").text("Price Category: " + ($(this).attr("data-price")));
        });
    });
});

