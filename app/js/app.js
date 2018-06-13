'use strict';

// Declare app level module which depends on views, and components
angular.module('f1Champions', [
	'ngRoute',
	'ngSanitize',
	'ui.router',
	'ngMaterial'
])

	.config(['$locationProvider', function ($locationProvider) {
		$locationProvider.html5Mode(true);
	}])

	.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('seasons', {
		url: '/',
		templateUrl: 'partials/seasons.html',
		controller: 'seasonsController'
	})
		.state('season', {
		url: '/season/:season',
		templateUrl: 'partials/season.html',
		controller: 'seasonController'
	})
	;

	// catch all routes
	$urlRouterProvider.otherwise('/');

})

	.controller('appController', function ($scope, $mdToast, $mdDialog, $sanitize) {
	let last = {
		bottom: false,
		top: true,
		left: false,
		right: true
	};

	const appVersion = `0.1.0`;
	const author = `Coded by <a href="http://chronicles.co.za" target="_blank">Starrzan</a>`

	$scope.showAbout = function() {
		$mdDialog.show(
			$mdDialog.alert()
			.clickOutsideToClose(true)
			.title('F1 World Champions')
			.htmlContent(`Version: ${appVersion} - ${author}`)
			.ariaLabel('About the app')
			.ok('Neat mister!')
			// You can specify either sting with query selector
			.openFrom({
				top: -150,
				left: 1500,
				width: 30,
				height: 80
			})
			.closeTo({
				top: 50,
				right: 50
			})
		);
	};

});