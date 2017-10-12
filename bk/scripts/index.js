var routes = [
	{
		path: '/login',
		component: {
			template: '<div>Login</div>'
		}
	},
	{
		path: '/home',
		component: {

		}
	}
];

var router = new VueRouter({
	routes
});

var app = new Vue({
	el: '#app',
	data: {},
	router
});