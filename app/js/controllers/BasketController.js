angular.module('myApp').controller('BasketController', [
    '$scope',
    '$sce',
    '$window',
    'BasketService',
    function ($scope, $sce, $window, basketService) {
        'use strict';

        function load() {
            basketService.find($window.sessionStorage.bid).success(function (data) {
                $scope.products = data.data.products;
                for (var i=0; i<$scope.products.length; i++) {
                    $scope.products[i].description = $sce.trustAsHtml($scope.products[i].description);
                }
            }).error(function (data) {
                console.log(data);
            });
        }
        load();

        $scope.delete = function (id) {

            basketService.del(id).success(function () {
                load();
            }).error(function (data) {
                console.log(data);
            });

        };

        $scope.inc = function (id) {
            addToQuantity(id, 1);
        };

        $scope.dec = function (id) {
            addToQuantity(id, -1);
        };

        function addToQuantity(id, value) {
            basketService.get(id).success(function (data) {
                var newQuantity = data.data.quantity+value;
                basketService.put(id, {quantity: newQuantity > 1 ? newQuantity : 1}).success(function () {
                    load();
                }).error(function (data) {
                    console.log(data);
                });
            }).error(function (data) {
                console.log(data);
            });
        }
    }]);