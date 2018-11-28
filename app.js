var indeedUrl = "";
var traitifyUrl = "";


$.ajax({
    method: "GET",
    url: indeedUrl
}).then(function(response) {
    console.log(response);
}); 


$.ajax({
    method: "GET",
    url: traitifyUrl  
}).then(function(response) {
    console.log(response);
}); 