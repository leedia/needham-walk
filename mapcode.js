/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
//?directions=NoyesPark 

var geoloc = false;
var gettingdirections = false;
var map;
var strings = []; //store contentStrings

//direction vars
var directionsDisplay;
var directionsService;
var stepDisplay;
var markerArray = [];

//coordinates
var yourloc;
var defaultLatLng = new google.maps.LatLng(42.273759,-71.237571);  // Default to YMCA
var bowlinggreenloc = new google.maps.LatLng(42.273759,-71.237571);
var kostaspizzaloc = new google.maps.LatLng(42.274756,-71.237987);
var rochebrosloc = new google.maps.LatLng(42.280148, -71.236784);
var newrochebrosloc = new google.maps.LatLng(42.273991, -71.237905);
var branchlibloc = new google.maps.LatLng(42.280075, -71.238071);
var gloverloc = new google.maps.LatLng(42.277266, -71.236697);
var polfirestationloc = new google.maps.LatLng(42.278492, -71.236677);
var bankrobberyloc = new google.maps.LatLng(42.280432, -71.238138);
var towncenterloc = new google.maps.LatLng(42.279678, -71.235826);


$( document ).on( "pageinit", "#map-page", function() {
    geoloc = false;

    var a = location.href; 
    var b = a.substring(a.indexOf("?")+1);

    if(b == "bowlinggreen"){
      drawMap(bowlinggreenloc);
      var myselect = $("select#end");
      myselect[0].selectedIndex = 1;
      myselect.selectmenu("refresh");
    }
    else if(b == "kostaspizza"){
      drawMap(kostaspizzaloc);
      var myselect = $("select#end");
      myselect[0].selectedIndex = 2;
      myselect.selectmenu("refresh");
    }
    else if(b == "rochebros"){
      drawMap(rochebrosloc);
      var myselect = $("select#end");
      myselect[0].selectedIndex = 3;
      myselect.selectmenu("refresh");
    }
    else if(b == "branchlib"){
      drawMap(branchlibloc);
      var myselect = $("select#end");
      myselect[0].selectedIndex = 5;
      myselect.selectmenu("refresh");
    }
    else if(b == "glover"){
      drawMap(gloverloc);
      var myselect = $("select#end");
      myselect[0].selectedIndex = 6;
      myselect.selectmenu("refresh");
    }
    else if(b == "polfire"){
      drawMap(polfirestationloc);
      var myselect = $("select#end");
      myselect[0].selectedIndex = 7;
      myselect.selectmenu("refresh");
    }
    else if(b == "robbery"){
      drawMap(bankrobberyloc);
      var myselect = $("select#end");
      myselect[0].selectedIndex = 8;
      myselect.selectmenu("refresh");
    }
    else if(b == "towncenter"){
      drawMap(towncenterloc);
      var myselect = $("select#end");
      myselect[0].selectedIndex = 9;
      myselect.selectmenu("refresh");
    }
    else if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            yourloc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            drawMap(yourloc);
            geoloc = true;

        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }

    //drawing map
    function drawMap(latlng) {

        // Instantiate a directions service.
         directionsService = new google.maps.DirectionsService();

        directionsDisplay = new google.maps.DirectionsRenderer();
        var myOptions = {
            zoom: 17,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        
        // Create a renderer for directions and bind it to the map.
          var rendererOptions = {
            map: map
          }
          directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)

          // Instantiate an info window to hold step text.
          stepDisplay = new google.maps.InfoWindow();


        //if geolocation is enabled, show marker at user's position
    if (geoloc) {
      var you = new google.maps.Marker({
              position: latlng,
              map: map,
              icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
              animation: google.maps.Animation.DROP,
              title: "You are here"
          });

      google.maps.event.addListener(you, 'click', function() {
                infowindow.setContent("You are here.");
                infowindow.open(map, this);
        });
    }

        var infowindow = new google.maps.InfoWindow();


        //STRINGS

        //bowling green
         var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h3 id="firstHeading" class="firstHeading">The Bowling Green</h3>'+
          '<div id="bodyContent">'+
          '<p>The Bowling Green was one of two bowling alleys in Needham.</p>'+
          '<p>Read more <a href="sites.html#BowlingGreen" data-ajax="false"> here.</a> </p>'+
          '</div>'+
          '</div>';
        strings.push(contentString);

        //kosta's pizza
        contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">TripAdvisor/Kosta&#39;s Pizza</h3>'+
              '<div id="bodyContent">'+
              '<p>TripAdvisor was founded in February 2000 in a small office above Kosta’s Pizza on Chestnut Street.</p>'+
              '<p>Read more <a href="sites.html#KostasPizza" data-ajax="false"> here.</a> </p>'+
              '</div>'+
              '</div>';
        strings.push(contentString);

        //Roche Brothers First
        contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">Roche Brothers (First Location)</h3>'+
              '<div id="bodyContent">'+
              '<p>In 1952 two young men named Pat and Buddy (Daniel) Roche opened a tiny meat market in Roslindale, financed by their parents, who were willing to mortgage their home to help their boys fulfill a dream of owning their own store...</p>'+
              '<p>Read more <a href="sites.html#RocheBrothers" data-ajax="false"> here.</a> </p>'+
              '</div>'+
              '</div>';
        strings.push(contentString);

        //Roche Brothers Current
        contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">Roche Brothers (Current Location)</h3>'+
              '<div id="bodyContent">'+
              '<p>In 1952 two young men named Pat and Buddy (Daniel) Roche opened a tiny meat market in Roslindale, financed by their parents, who were willing to mortgage their home to help their boys fulfill a dream of owning their own store...</p>'+
              '<p>Read more <a href="sites.html#RocheBrothers" data-ajax="false"> here.</a> </p>'+
              '</div>'+
              '</div>';
        strings.push(contentString);

        //Branch Library
        contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">Needham Branch Library</h3>'+
              '<div id="bodyContent">'+
              '<p>Needham&#39;s first library association was formed in 1796 as a private subscription library.</p>'+
              '<p>Read more <a href="sites.html#BranchLib" data-ajax="false"> here.</a> </p>'+
              '</div>'+
              '</div>';
        strings.push(contentString);

        //Glover Hospital
        contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">Glover Hospital</h3>'+
              '<div id="bodyContent">'+
              '<p>The Glover Home and Hospital was named after Frederick Pope Glover, who bequeathed his estate to the town for the purpose of founding a hospital in his name.</p>'+
              '<p>Read more <a href="sites.html#Glover" data-ajax="false"> here.</a> </p>'+
              '</div>'+
              '</div>';
        strings.push(contentString);

        //Police and Fire Station
        contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">Police and Fire Station</h3>'+
              '<div id="bodyContent">'+
              '<p>In the early days of Needham, those we now call Police Officers were called Constables. For many years the fire department of Needham consisted of any men in town who were physically capable of fighting a fire.</p>'+
              '<p>Read more <a href="sites.html#PolFire" data-ajax="false"> here.</a> </p>'+
              '</div>'+
              '</div>';
        strings.push(contentString);

        //Bank Robbery
        contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">Needham Trust Bank Robbery</h3>'+
              '<div id="bodyContent">'+
              '<p>The Norfolk Trust Bank was robbed in February 1934 by the Millen-Faber gang from Boston.</p>'+
              '<p>Read more <a href="sites.html#BankRobbery" data-ajax="false"> here.</a> </p>'+
              '</div>'+
              '</div>';
        strings.push(contentString);

        //Town Center
        contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">Town Center/Common</h3>'+
              '<div id="bodyContent">'+
              '<p>Needham at the turn of the 20th century was a town in transition, as a rising class of merchants and professionals settled into homes surrounding the new business center of Great Plain Avenue.</p>'+
              '<p>Read more <a href="sites.html#TownCenter" data-ajax="false"> here.</a> </p>'+
              '</div>'+
              '</div>';
        strings.push(contentString);

        //MARKERS

        var bowlinggreen = new google.maps.Marker({
            position: bowlinggreenloc,
            map: map,
            title: "Bowling Green",
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        var kostaspizza = new google.maps.Marker({
          position: kostaspizzaloc,
          map:map,
          title: "TripAdvisor/Kosta's Pizza",
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        var rochebros = new google.maps.Marker({
          position: rochebrosloc,
          map:map,
          title: "Roche Brothers (First Location)",
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        var newrochebros = new google.maps.Marker({
          position: newrochebrosloc,
          map:map,
          title: "Roche Brothers (Current Location)",
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        var branchlib = new google.maps.Marker({
          position: branchlibloc,
          map:map,
          title: "Needham Branch Library",
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }); 

        var glover = new google.maps.Marker({
          position: gloverloc,
          map:map,
          title: "Glover Hospital",
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        var polfirestation = new google.maps.Marker({
          position: polfirestationloc,
          map:map,
          title: "Police and Fire Station",
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        var bankrobbery = new google.maps.Marker({
          position: bankrobberyloc,
          map:map,
          title: "Needham Trust Bank Robbery",
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        var towncenter = new google.maps.Marker({
          position: towncenterloc,
          map:map,
          title: "Glover Hospital",
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });


        //CLICK EVENTS
        google.maps.event.addListener(bowlinggreen, 'click', function() {
                infowindow.setContent(strings[0]);
                infowindow.open(map, this);
        });

        google.maps.event.addListener(kostaspizza, 'click', function() {
                infowindow.setContent(strings[1]);
                infowindow.open(map, this);
        });

        google.maps.event.addListener(rochebros, 'click', function() {
                infowindow.setContent(strings[2]);
                infowindow.open(map, this);
        });

        google.maps.event.addListener(newrochebros, 'click', function() {
                infowindow.setContent(strings[3]);
                infowindow.open(map, this);
        });

        google.maps.event.addListener(branchlib, 'click', function() {
                infowindow.setContent(strings[4]);
                infowindow.open(map, this);
        });

        google.maps.event.addListener(glover, 'click', function() {
                infowindow.setContent(strings[5]);
                infowindow.open(map, this);
        });

        google.maps.event.addListener(polfirestation, 'click', function() {
                infowindow.setContent(strings[6]);
                infowindow.open(map, this);
        }); 

        google.maps.event.addListener(bankrobbery, 'click', function() {
                infowindow.setContent(strings[7]);
                infowindow.open(map, this);
        });

        google.maps.event.addListener(towncenter, 'click', function() {
                infowindow.setContent(strings[8]);
                infowindow.open(map, this);
        });
    
    }

}); //closes page init

function calcRoute() {

  if(document.getElementById('start').value != null
    && document.getElementById('end').value != null
    && document.getElementById('start').value != '#'
    && document.getElementById('end').value != '#'
    && document.getElementById('start').value != "yourloc"
    && document.getElementById('start').value != document.getElementById('end').value) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(null);
      markerArray[i] = null;
    }

    // Now, clear the array itself.
    markerArray = [];

    // Retrieve the start and end locations and create
    // a DirectionsRequest using WALKING directions.
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
    };

    // Route the directions and pass the response to a
    // function to create markers for each step.
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        var warnings = document.getElementById('warnings_panel');
        warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
        directionsDisplay.setDirections(response);
        showSteps(response);
      }
    });
  }

  else if(document.getElementById('start').value == "yourloc" 
    && document.getElementById('end').value != null
    && document.getElementById('end').value != '#') {
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found
            var myselect = $("select#start");
            myselect[0].selectedIndex = 1;
            myselect.selectmenu("refresh");
            var start = ''+pos.coords.latitude+','+pos.coords.longitude;
            var end = document.getElementById('end').value;
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.WALKING
            };

            // Route the directions and pass the response to a
            // function to create markers for each step.
            directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                var warnings = document.getElementById('warnings_panel');
                warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
                directionsDisplay.setDirections(response);
                showSteps(response);
              }
            });

        }
        function fail(error) {
            alert("Your location was not found. Please pick a different starting point.");  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
      alert("Your location was not found. Please pick a different starting point.");
    }

  }

  else if(document.getElementById('start').value == "yourloc" && document.getElementById('end').value == '#') {
      var myselect = $("select#start");
      myselect[0].selectedIndex = 1;
      myselect.selectmenu("refresh");
      console.log(document.getElementById('start').value);
  }

}

function showSteps(directionResult) {
  // For each step, place a marker, and add the text to the marker's
  // info window. Also attach the marker to an array so we
  // can keep track of it and remove it when calculating new
  // routes.
  var myRoute = directionResult.routes[0].legs[0];

  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = new google.maps.Marker({
      position: myRoute.steps[i].start_location,
      map: map
    });
    attachInstructionText(marker, myRoute.steps[i].instructions);
    markerArray[i] = marker;
  }
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on,
    // containing the text of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

