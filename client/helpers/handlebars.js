Handlebars.registerHelper('isAdminUser', function() {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
});


Accounts.ui.config({
        requestPermissions: {
            facebook: ['user_likes'],
            github: ['user', 'repo']
        },
        requestOfflineToken: {
            google: true
        },
        passwordSignupFields: 'USERNAME_ONLY'
    });