# Neighbourhood Map - Udacity Project 5

This app was deisgned to leverage Google Maps API to show locations of interest on a dynamic map. The app is intended to be user friendly, and provides users filters as well as dynamic responses to location clicks. In addition to using the Google Maps API, Knockout.js and one third party API had to be used in order to meet specifications. In this case, Wikipedia has been used.  

## Installation

The application itself does not require special software to run, however a web browser will be necessary. I suggest the latest version of [Google Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en).

[Git](https://git-scm.com/downloads) will also be required to download the repository.

With Git open, run `git clone https://github.com/kabeerk/dubaimap.git`

## Run the app

With the files cloned to your computer, open the folder and find the file `index.html`.

Run the file in your browser either by opening it or dragging and dropping it into the browser. The file should launch and you should see a map with a few markers and a navigation sidebar.

## Use the app

You will be able to click on pre-set markers to get their name, as well as a link to their corresponding Wikipedia pages. The search filter on the left allows you to search for a particular location from the given list, and will temporarily cause the unfitlered markers to disappear.

## Third party sources

3 key third party sources were leveraged in this app:

1. [Google Maps API](https://developers.google.com/maps/)
2. [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) aka Media Wiki
3. [Knockout.js](http://knockoutjs.com/)

## Credit where it's due!

The code for this application was inspired by a few sources:

1.	Udacity Full Stack Nanodegree quiz codes (restaurant quiz) as well as forum mentor advisory (particularly from mentors swooding and trish)

2. The suffering of 4 users in the forum! 
	daniel_2277967910862 for filters
	stella_1727197913276 for knockout and VM issues
	vaibhav-17 for info windows and observables