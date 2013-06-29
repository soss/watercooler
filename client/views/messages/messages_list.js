Template.messagesList.MAX_RESULTS = 100;

Template.messagesList.helpers({
  messages: function () {
    var count = Messages.find().count();
    return Messages.find({}, {sort: {submitted: 1}, skip: count - Template.messagesList.MAX_RESULTS});
  }
});
