'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
// AngularJS will instantiate a singleton by calling "new" on this function
  .service('WatchlistService', function () {
    //load watchlists from localStorage
    var loadModel = function(){
      var model = {
        watchlists: localStorage['stockDog.watchlists']?
        JSON.parse(localStorage['stockDog.watchlists']):[],
        nextId : localStorage['stockDog.nextId']?
        parseInt(localStorage['stockDog.nextId']): 0
      }
      return model;
    }


    //save watchlists to localStorage
    var saveModel = function(){
      localStorage['stockDog.watchlists'] = JSON.stringify(Model.watchlists);
      localStorage['stockDog.nextId'] = Model.nextId; 
    }

    //use lodash to find a watchlist with given ID
    var findById = function(listId){
      return _.find(Model.watchlists, function(watchlist){
          return watchlist.id === parseInt(listId);
      })
    }

    //return all watchlists or find by givin id
    this.query = function(listId){
      if(listId){
        return findById(listId);
      }else{
        return Model.watchlists;
      }
    }

    //save a new watchlist to watchlits model
    this.save = function(watchlist){
      watchlist.id = Model.nextId ++;
      Model.watchlists.push(watchlist);
      saveModel();
    }

    //remove givin watchlist from watchlists model
    this.remove = function(watchlist){
      _.remove(Model.watchlists, function(list){
          return list.id === watchlist.id;
      })
      saveModel();
    }

    //initialize model for this singleton service
    var Model = loadModel();
  });


