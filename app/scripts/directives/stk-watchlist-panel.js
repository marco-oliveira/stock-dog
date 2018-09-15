'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockDogApp')
  .directive('stkWatchlistPanel', function ($location, $modal, $routeParams, WatchlistService) {
    return {
      templateUrl: '/views/templates/watchlist-panel.html',
      restrict: 'E',
      scope:{},
      link: function postLink($scope) {
        //initialize variables
        $scope.watchlist = {};
        var addListModal = $modal({
          scope : $scope,
          template : '../views/templates/addlist-modal.html',
          show : false
        });

        //bind model from service for this scope
        $scope.watchlists = WatchlistService.query();

        //display addlist modal
        $scope.showModal = function(){
          addListModal.$promise.then(addListModal.show);
        };

        //create new list from fields in modal
        $scope.createList = function(){
          WatchlistService.save($scope.watchlist);
          addListModal.hide();
          $scope.watchlist = {};
        };

        //delete desired list and redirect to home
        $scope.deleteList = function(list){
          WatchlistService.remove(list);
          $location.path('/');
        }

        $scope.currentList = $routeParams.listId;
        $scope.gotoList = function(listId){
          $location.path('/watchlist/'+listId);
        }
      }
    };
  });
