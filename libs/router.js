Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('index', {
		path: '/',
		template: 'home',
		fastRender: true
	});

	this.route('home', {
		path: '/home',
		template: 'home',
		fastRender: true
	});

	this.route('dashboard', {
		path: '/dashboard',
		template: 'home',
		fastRender: true
	});
	

	this.route('admin', {
		path:'/admin',
		template: 'accountsAdmin',
		onBeforeAction: function() {
			if (Meteor.loggingIn()) {
				this.render(this.loadingTemplate);
			} else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
				console.log('redirecting');
				this.redirect('/');
			} else {
				this.next();
			}
		}
	});
});