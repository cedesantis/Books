'use strict';

angular.module('mean.books').controller('BooksController', ['$scope', 'Global', 'Books',
  function($scope, Global, Books) {
    $scope.global = Global;
    $scope.package = {
      name: 'books'
    };
  }
]);
