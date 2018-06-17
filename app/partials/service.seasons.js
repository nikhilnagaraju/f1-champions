'use strict';

angular.module('f1Champions')
	.service('SeasonsService', function ($rootScope, AppService) {

	return {

		// Reusable function to save season data
		saveSeason: function(season) {

			// Set Ergast API Query to get all season winners
			let apiQuerySeasons = `${$rootScope.f1Champions.ergastApi}/${season}/driverStandings.json`;

			return AppService.getData(apiQuerySeasons).then(function (response) {

				if (typeof $rootScope.f1Champions.seasons[season] === 'undefined') {

					// Set season name in global listing object
					$rootScope.f1Champions.seasons[season] = {
						'season': season
					};

				}

				// Get season winner
				let champion = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver;

				// Set season champion name in global listing object
				$rootScope.f1Champions.seasons[season].champion = {
					'name': `${champion.givenName} ${champion.familyName}`
				}

				return champion

			}).then(function (response) {

				// Extract driver image from Wikipedia article field
				let apiQueryWikiDriver = AppService.getWikiArticleImageData(response.url);

				return AppService.getData(apiQueryWikiDriver).then(function (response) {

					// Set season champion image in global listing object
					$rootScope.f1Champions.seasons[season].champion.image = AppService.getWikiArticleImageSrc(response);

				}).catch(function (error) {

					console.log(error);

				});

			}).catch(function (error) {

				console.log(error);

			});

		}

	}

});