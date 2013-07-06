Meteor.subscribe('messages');

$(function() {
  // Clicking on @ mentions sets the `selectedUser` session variable
  $('.user-select').live('click', function (e) {
    e.preventDefault();

    // TODO: check if the user exists
    var username = $(this).text();
    // If it starts with a @, remove it
    if (/^@/.test(username)) username = username.slice(1);

    // Get the current selected user
    var currentSelected = Session.get('selectedUser');

    if (currentSelected == username) {
      // If we have already set our session variable to this, clear it
      Session.set('selectedUser', '');
    } else {
      // Otherwise, set the session variable as expected
      Session.set('selectedUser', username);
    }
  });
});
