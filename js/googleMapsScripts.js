var map;
var marker;
var markersList = {};
var displayInfo;
var markerLoaded = false;
var customicon = 'https://rnr30-compgroup.netdna-ssl.com/wp-content/themes/rnr3/img/distance_marker.png';
var currentPosition = {lat: 25.204849, lng: 55.270783};

// This array will contain all the marker titles and positions
var DUBAIMARKERS = [
	{title:"Burj Al Arab", position: {lat: 25.141306, lng: 55.185348}},
	{title:"Burj Khalifa", position: {lat: 25.197197, lng: 55.274376}},
	{title:"Mall of the Emirates", position: {lat: 25.121237, lng: 55.200373}},
	{title:"JW Marriott Marquis Dubai", position: {lat: 25.18561, lng: 55.258133}},
	{title:"Palm Islands", position: {lat: 25.12225, lng: 55.132065}},
	{title:"Wild Wadi Water Park", position: {lat: 25.139409, lng: 55.188844}},
	{title:"Dubai International Airport", position: {lat: 25.253175, lng: 55.365673}},
];

// Initialize the map
function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		center: currentPosition,
		zoom: 11,
	});

	var selectedMarker = null;
	var iWindow = new google.maps.InfoWindow();

	// Resizes and centers the map to the current location 
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(currentPosition);
	});

	// Loop through our list of markers and create them
	for (var m = 0; m < DUBAIMARKERS.length; m ++) {
		marker = new google.maps.Marker({
			position: DUBAIMARKERS[m].position,
			// Use our custom icon instead
			icon: customicon,
			map: map
		});

		var title = DUBAIMARKERS[m].title;
		dmvm.locationList()[m].marker = marker;
		markersList[title] = marker;
		listenerMarker(marker, title);
		listeneriWindow(marker);
	}
	markerLoaded = true;

	// Add a listener to the markers to link to Wikipedia	
	function listenerMarker(marker, title) {
		// Add the location name as a label to the box
		var locationTitle = "<div id = 'main'><div id = 'location-title'><h1 id='wiki-title'>" + title + "</h1></div><div id = 'wikipedia-links'></div></div>";
		
		// Variable to set the search based on the selected marker title
		var wikipediaLink = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + title + '&format=json&callback=wikiCallback';
		
		// Render correctly: enable the listner, shift view to center on the marker
		// set market to bounce when clicked and open the window with the Wikipedia link and title
		marker.addListener('click', function() {
			if (selectedMarker) {
				selectedMarker.setAnimation(null);
			}

			selectedMarker = marker;
			marker.setAnimation(google.maps.Animation.BOUNCE);
			map.setCenter(marker.getPosition());

			$.ajax({
				url: wikipediaLink,
				dataType: "jsonp"
			}).fail(function (jqXHR, textStatus) {
				var linkTitle = "<p>Wikipedia page not found</p></div></div>";
				displayInfo = locationTitle + linkTitle;
				iWindow.open(map, marker);
				iWindow.setContent(displayInfo);
			}).done(function (receive) {
				var wikiList = receive[1];
				var wikiTitle = wikiList[0];
				var wikiLink = "http://en.wikipedia.org/wiki/" + wikiTitle;
				var linkTitle = "<a target='_blank' href='" + wikiLink + "'>" + wikiTitle + "</a></div></div>";
				displayInfo = locationTitle + linkTitle;
				iWindow.open(map, marker);
				iWindow.setContent(displayInfo);
			});
		});
	}

	// Stops the bounce animation when the user closes the information window
	function listeneriWindow(marker) {
		iWindow.addListener('closeclick', function() {
			marker.setAnimation(null);
		});
	}
}