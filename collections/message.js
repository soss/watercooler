Messages = new Meteor.Collection('messages');

Messages.allow({
  insert: function (userId, doc) {
    // make sure the user is logged in
    return !!userId;
  }
})