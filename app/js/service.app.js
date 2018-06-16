'use strict';

angular.module('f1Champions')
	.factory('AppService', function($http, $q) {

	// Get data from API
	return {

		// Generic API Get with json repsonse
		getData: function (apiQuery) {

			var req = {
				method: 'GET',
				url: apiQuery,
				headers: {
					'Content-Type': 'application/json'
				},
				timeout: 18000
			};

			return $http(req);

		},

		// Extract main image from Wikipedia article field
		getWikiArticleImageData: function (url) {

			// Get only the last part of the Wiki address, which is the article name
			let wikiArticleName = url.match(/[^/]+(?=\/$|$)/u);

			return `https://en.wikipedia.org/w/api.php?action=query&titles=${wikiArticleName}&prop=pageimages&format=json&origin=*&pithumbsize=50`;

		},

		// Access Wikipedia object and get image source and
		getWikiArticleImageSrc: function (obj) {

			for (let page in obj.data.query.pages) {
				return obj.data.query.pages[page].thumbnail.source;
			}

		},

		getCountryCode: function (countryName) {

			// Get round country
			let country = countryName;

			// Fix for Korea on restcountries.eu
			if (country == 'Korea') {
				country = 'Korea (Republic of)';
			} else if (country == 'Russia') {
				country = 'Russian Federation';
			}

			return `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;

		}

	}

});