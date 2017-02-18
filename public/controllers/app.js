
angular.module('Guesty', ['ngAria', 'ngAnimate', 'ngMaterial'])

    .controller('mainCtrl', ['$scope', '$mdDialog', '$http', function($scope, $mdDialog, $http) {
        $scope.data = {
            cities: [
                {name: 'London'},
                {name: 'Paris'},
                {name: 'Tel Aviv'},
                {name: 'NYC'}
            ],
            listings: [],
            selectedCity: ''
        };

        $scope.getListing = function() {
            $http({
                method: 'GET',
                url: 'https://api.airbnb.com/v2/search_results',
                params: {
                    client_id: '3092nxybyb0otqw18e8nh5nty',
                    location: $scope.data.selectedCity.name
                }
            }).then(function(res) {
                $scope.listings = res.data.search_results
            }, function(error) {
                console.log(error);
            });
        };

        function DialogController($scope, $mdDialog, data, listing) {
            $scope.data = data;
            $scope.data.reviews = [];
            $scope.listing = listing;

            $http({
                method: 'GET',
                url: 'https://api.airbnb.com/v2/reviews',
                params: {
                    client_id: '3092nxybyb0otqw18e8nh5nty',
                    role: 'all',
                    listing_id 	: listing.id
                }
            }).then(function(res) {
                $scope.data.reviews = res.data.reviews
            }, function(error) {
                console.log(error);
            });

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

        $scope.showDialog = function(ev, listing) {
            $mdDialog.show({
                controller: DialogController,
                locals: {
                    data: $scope.data,
                    listing: listing
                },
                templateUrl: 'dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
    }]);


