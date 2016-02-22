angular.module("twitterapp")

	// default - handle any requests not for an authorised URL
  .controller('defaultCtrl', ['$scope', '$window', '$location', function($scope, $window, $location) {
    console.log('defaultCtrl');
    $location.path('/home');
  }])

  // test: used for testing purposes
  .controller('testCtrl', ['$scope', '$window', 'userFactory', function($scope, $window, userFactory) {

  	$scope.message = '';
  	userFactory.testData()
  	.success(function(data) {
  		$scope.message = data.message;
  	})
  	.error(function(error) {
  		console.log('error');
  	});

    userFactory.userSessionData()
    .success(function(data) {
      console.log(data);
    })
    .error(function(error) {
      console.log(error);
    });

  }])

  // home: used to display home page content
  .controller('homeCtrl', ['$scope', '$window', '$location', '$rootScope', 'ipCookie', 'userFactory', 'tConfig', function($scope, $window, $location, $rootScope, ipCookie, userFactory, tConfig) {
    console.log('homeCtrl');

    // If the user refreshes a page retrieve the token from sessionStorage
    if (angular.isDefined($window.sessionStorage.token) && (!angular.isDefined($rootScope.tweetapp) || $rootScope.tweetapp.authorised == false)) {
      $rootScope.tweetapp = {};
      $rootScope.tweetapp.authorised = true;
      ipCookie(tConfig.sessionCookieName, $window.sessionStorage.token, { expires:365 });
    }
    // If sessionStorage isn't available try the cookie
    else {
      token = ipCookie(tConfig.sessionCookieName);
      if (angular.isDefined(token) && (!angular.isDefined($rootScope.tweetapp) || $rootScope.tweetapp.authorised == false)) {
        $window.sessionStorage.token = token;
        $rootScope.tweetapp = {};
        $rootScope.tweetapp.authorised = true;
      }
    }

    // Fetch the session data from the API
    if (angular.isDefined($rootScope.tweetapp) && $rootScope.tweetapp.authorised) {
      userFactory.userSessionData()
      .success(function(data) {
        $window.sessionStorage.user_id = data.user_id;
        $window.sessionStorage.screen_name = data.screen_name;
        $scope.screenName = data.screen_name;
      })
      .error(function(error) {
      	// TODO: redirect to the error page and handle the error
        console.log(error);
      });
    }

  }])

  // error: handle errors
  .controller('errorCtrl', ['$scope', '$window', '$location', function($scope, $window, $location) {
  	
  }]);