//javascript.js
//set map options
var myLatLng = { lat: 37.3352, lng: -121.88105004447975 }; //start @ sjsu for now as 'warehouse'
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calculateRoute function
function calculateRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //options available: WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Distance <i class='fa fa-truck' aria-hidden='true'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fa fa-clock-o' aria-hidden='true'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            
            //center map in SJSU
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}


//create autocomplete objects for all inputs
var options = {
    types: ['(regions)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

google.maps.event.addDomListener(window, 'load', initialize);
function initialize() {
  var input = document.getElementById('autocomplete_search');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function () {
  var place = autocomplete.getPlace();
  // place variable will have all the information you are looking for.
  $('#lat').val(place.geometry['location'].lat());
  $('#long').val(place.geometry['location'].lng());
});
}
/*
$(document).ready(function () {
    google.maps.event.addDomListener(window, 'load', initialize);
 });
 
 function initialize() {
     var input = document.getElementById('location');
     var autocomplete = new google.maps.places.Autocomplete(input);
 }
 */