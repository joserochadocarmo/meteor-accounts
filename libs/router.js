Meteor.startup(function() {
    AccountsEntry.config({
        logo: '/images/logo-mini.png', // if set displays logo above sign-in options
        privacyUrl: '/privacy-policy', // if set adds link to privacy policy and 'you agree to ...' on sign-up page
        termsUrl: '/terms-of-use', // if set adds link to terms  'you agree to ...' on sign-up page
        homeRoute: '/home', // mandatory - path to redirect to after sign-out
        dashboardRoute: '/dashboard', // mandatory - path to redirect to after successful sign-in
        profileRoute: 'profile',
        passwordSignupFields: 'EMAIL_ONLY',
        showSignupCode: false,
        showOtherLoginServices: true, // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
        extraSignUpFields: [{ // Add extra signup fields on the signup page
            field: "name", // The database property you want to store the data in
            name: "", // An initial value for the field, if you want one
            label: "Full Name", // The html lable for the field
            placeholder: "John Doe", // A placeholder for the field
            type: "text", // The type of field you want
            required: true // Adds html 5 required property if true
        }]
    });

    
});

Router.configure({
    layoutTemplate: 'layout'
});


Router.map(function() {
    this.route('index', {
        path: '/',
        template: 'home',
        onBeforeAction: function() {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else {
                this.loading = window.pleaseWait({
                    logo: '/images/logo.png',
                    backgroundColor: pickRandom(backgrounds),
                    loadingHtml: '<p class="loading-message">' + pickRandom(messages) + '</p>' + pickRandom(spinners)
                });
                // manually remove loading for demo
                var loading = this.loading;
                Meteor.setTimeout(function() {
                    loading.finish();
                }, 3000);
                this.next();
            }
        },
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
        path: '/admin',
        template: 'accountsAdmin',
        onBeforeAction: function() {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                console.log('redirecting');
                this.redirect('/');
            } else {
                this.next();
            }
        }
    });
});


// --------------------------------------------------------
// Demo items
// --------------------------------------------------------
var pickRandom = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};


// Loading messages
var messages = [
    'Hey you. Welcome back!',
    'You look nice today',
    'Amazing things come to those who wait',
    'You usually have to wait for that which is worth waiting for',
    'Don\'t wait for opportunity. Create it.',
    'A day without sunshine is like, you know, night.',
    'My fake plants died because I did not pretend to water them.',
    'Weather forecast for tonight: dark.'
];

// Backgrounds
var backgrounds = ['#1abc9c', '#7f8c8d', '#2980b9', '#7f8c8d',
    '#f1c40f', '#27ae60', '#7f8c8d', '#7f8c8d'
];

//
// Spinners from SpinKit
//   https://github.com/tobiasahlin/SpinKit/blob/master/css/spinkit.css
//
var spinners = [
    // spinner-rotating-plane
    '<div class="sk-spinner sk-spinner-rotating-plane"></div>',

    // spinner-double-bounce
    '<div class="sk-spinner sk-spinner-double-bounce">' + ' <div class="sk-double-bounce1"></div>' + ' <div class="sk-double-bounce2"></div>' + '</div>',

    // spinner-double-bounce
    '<div class="sk-spinner sk-spinner-wave">' + ' <div class="sk-rect1"></div>' + ' <div class="sk-rect2"></div>' + ' <div class="sk-rect3"></div>' + ' <div class="sk-rect4"></div>' + ' <div class="sk-rect5"></div>' + '</div>',

    // spinner-wandering-cubes
    '<div class="sk-spinner sk-spinner-wandering-cubes">' + ' <div class="sk-cube1"></div>' + ' <div class="sk-cube2"></div>' + '</div>',

    // spinner-pulse
    '<div class="sk-spinner sk-spinner-pulse"></div>',

    // spinner-chasing-dots
    '<div class="sk-spinner sk-spinner-chasing-dots">' + ' <div class="sk-dot1"></div>' + ' <div class="sk-dot2"></div>' + '</div>',

    // spinner-three-bounce
    '<div class="sk-spinner sk-spinner-three-bounce">' + '  <div class="sk-bounce1"></div>' + '  <div class="sk-bounce2"></div>' + '  <div class="sk-bounce3"></div>' + '</div>',

    // spinner-circle
    '<div class="sk-spinner sk-spinner-circle">' + '  <div class="sk-circle1 sk-circle"></div>' + '  <div class="sk-circle2 sk-circle"></div>' + '  <div class="sk-circle3 sk-circle"></div>' + '  <div class="sk-circle4 sk-circle"></div>' + '  <div class="sk-circle5 sk-circle"></div>' + '  <div class="sk-circle6 sk-circle"></div>' + '  <div class="sk-circle7 sk-circle"></div>' + '  <div class="sk-circle8 sk-circle"></div>' + '  <div class="sk-circle9 sk-circle"></div>' + '  <div class="sk-circle10 sk-circle"></div>' + '  <div class="sk-circle11 sk-circle"></div>' + '  <div class="sk-circle12 sk-circle"></div>' + '</div>',

    // spinner-cube-grid
    '<div class="sk-spinner sk-spinner-cube-grid">' + '  <div class="sk-cube"></div>' + '  <div class="sk-cube"></div>' + '  <div class="sk-cube"></div>' + '  <div class="sk-cube"></div>' + '  <div class="sk-cube"></div>' + '  <div class="sk-cube"></div>' + '  <div class="sk-cube"></div>' + '  <div class="sk-cube"></div>' + '  <div class="sk-cube"></div>' + '</div>',

    // spinner-wordpress
    '<div class="sk-spinner sk-spinner-wordpress">' + '  <span class="sk-inner-circle"></span>' + '</div>',

    // spinner-fading-circle
    '<div class="sk-spinner sk-spinner-fading-circle">' + '  <div class="sk-circle1 sk-circle"></div>' + '  <div class="sk-circle2 sk-circle"></div>' + '  <div class="sk-circle3 sk-circle"></div>' + '  <div class="sk-circle4 sk-circle"></div>' + '  <div class="sk-circle5 sk-circle"></div>' + '  <div class="sk-circle6 sk-circle"></div>' + '  <div class="sk-circle7 sk-circle"></div>' + '  <div class="sk-circle8 sk-circle"></div>' + '  <div class="sk-circle9 sk-circle"></div>' + '  <div class="sk-circle10 sk-circle"></div>' + '  <div class="sk-circle11 sk-circle"></div>' + '  <div class="sk-circle12 sk-circle"></div>' + '</div>'
];
