var MAX_RESULTS = 100;

Meteor.publish('messages', function () {
  return Messages.find({}, {sort: {submitted: -1}, limit: MAX_RESULTS});
});