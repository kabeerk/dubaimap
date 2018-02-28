// Knockout
var locations_list = [
		{title: "Burj Al Arab"},
		{title: "Burj Khalifa"},
		{title: "Mall of the Emirates"},
		{title: "JW Marriott Marquis Dubai"},
		{title: "Palm Islands"},
		{title: "Wild Wadi Water Park"},
		{title: "Dubai International Airport"},
];

// Knockout Model for locations list
var locations = function(locationData) {
	this.title = ko.observable(locationData.title);
	this.marker = ko.observable(locationData.marker);
};

// Knockout ViewModel
var DubaiMapVM = function() {
	var that = this;
	this.locationList = ko.observableArray([]);
	this.holdingList = ko.observableArray([]);
	locations_list.forEach(function(locationItem) {
		that.locationList.push(new locations(locationItem));
	});

	// Use filters
	this.filter = ko.observable("");
	this.filterSearch = ko.computed(function() {
		var filter = that.filter().toLowerCase();
		if (!markerLoaded) {
			return that.locationList();
		} else {
			if (filter) {
				return ko.utils.arrayFilter(that.locationList(), function(listItem) {
					var product = liveFilter(listItem.title().toLowerCase(), filter);
					if (!product) {
						if (listItem.marker) {
							listItem.marker.setVisible(false);
						}
					} else {
						if (listItem.marker) {
							listItem.marker.setVisible(true);
						}
					}
					return product;
				});
			} else {
					for (var f = 0; f < that.locationList().length; f ++) {
					that.locationList()[f].marker.setVisible(true);
					that.locationList()[f].marker.setAnimation(null);
				}
				return that.locationList();
			}
		}
	});

	// Show marker information
	this.OpenMarker = function(title) {
		var trigger = title.title();
		google.maps.event.trigger(markersList[trigger], 'click');
	};
};

// Below function helps with live filtering by returning false if
// current input is longer than the longest item in the list
var liveFilter = function (str, currentInput) {
	str = str || "";
	if (currentInput.length > str.length) {
		return false;
	}
	return str.substring(0, currentInput.length) === currentInput;
};

var dmvm = new DubaiMapVM();
ko.applyBindings(dmvm);