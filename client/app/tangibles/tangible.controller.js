'use strict';

angular.module('padApp')
  .controller('TangibleCtrl', function ($rootScope, $scope, $stateParams, $http, $timeout, Tangible) {

    var uid = $stateParams.uid;

    $scope.accedio = false;

    Tangible
      .findByUid(uid)
      .then(function(data){
        $scope.tangible = data;
        
        if ($scope.tangible === undefined) {
          return;
        }

        var d = $scope.tangible.content.description;
        var s = $scope.tangible.content.source;
        $scope.tangible.hasDescription = d !== '' && d !== undefined && d !== null;
        var hasSource = s !== '' && s !== undefined && s !== null;
        
        if (hasSource){

          $timeout(function(){
            $('#source').linkify();
          });
        }
      });

    $scope.take = 10;
    $scope.query = {};
    $scope.showRel = false;
    

    $scope.relFirst = function(){
      if ($scope.tangible === undefined) {
        return;
      }

      $scope.showRel = true;

      var tags = $scope.tangible.content.tags.split(',');
      var mtags = _.map(tags, function(t){
        return _.escapeRegExp(_.trim(t));
      });

      var etag = '(' + mtags.join('|') + ')';
      
      $scope.query = { 'content.tags': { $regex: etag }, $not: { uid: { $regex: uid } } };
      $('#header-relations').hide();
      
    };

  });
