Template.messageList.helpers({
  messages: function () {
    return Messages.find({}, {sort: {submitted: 1}});
  }
});