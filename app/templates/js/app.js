var <%= appName %> = angular.module('<%= appName %>', ['ngRoute']);

<%= appName %>.config(
	function($interpolateProvider) { 
		$interpolateProvider.startSymbol('{[').endSymbol(']}') 
	}
);

<%= appName %>.config(
	function($routeProvider, $locationProvider) { 
		var basePath = 'public/';

		$routeProvider
			.when('/', {
				templateUrl: basePath + 'partials/homepage.html',
				controller: 'HomepageController',
				resolve: {}
			})
			
<%= appName %>.run(function($rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
		var currentCtrl = current.$$route.controller,
			currentTmpl = current.$$route.templateUrl;

		if('HomepageController' == currentCtrl) {
			$('body').attr('id', 'homepage');
		}
    });
});