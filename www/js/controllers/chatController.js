angular.module('controllers.chat', [])

.controller('ChatCtrl', function($scope) {

	$scope.tickets = [
		{
			$id: 1,
			$priority: null,
			createdAt: 1234567,
			date: "Wed Dec 02 2015 00:00:00 GMT-0600 (CST)",
			details: "",
			image: "",
			price: 10,
			quantity: 1,
			seller: "google:116689779478426229041",
			title: "Ticket 1",
			type: "Soccer",
			updatedAt: 1448941013906
		},{
			$id: 2,
			$priority: null,
			createdAt: 1234567,
			date: "Wed Dec 02 2015 00:00:00 GMT-0600 (CST)",
			details: "",
			image: "",
			price: 30,
			quantity: 1,
			seller: "google:116689779478426229041",
			title: "Ticket 2",
			type: "Football",
			updatedAt: 1448941013906
		},{
			$id: 3,
			$priority: null,
			createdAt: 1234567,
			date: "Wed Dec 02 2015 00:00:00 GMT-0600 (CST)",
			details: "",
			image: "",
			price: 77,
			quantity: 1,
			seller: "google:116689779478426229041",
			title: "Ticket 3",
			type: "Music",
			updatedAt: 1448941013906
		},{
			$id: 4,
			$priority: null,
			createdAt: 1234567,
			date: "Wed Dec 02 2015 00:00:00 GMT-0600 (CST)",
			details: "",
			image: "",
			price: 40,
			quantity: 2,
			seller: "google:116689779478426229041",
			title: "Ticket 4",
			type: "Tennis",
			updatedAt: 1448941013906
		},

	];

	$scope.localDate = function(date) {
		if (date === undefined) {
			return 'n/a';
		} else {
			return (new Date(date)).toLocaleDateString();
		}
	}	



});