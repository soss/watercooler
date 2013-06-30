Template.messageForm.events({
  'submit form': function (e) {
    e.preventDefault();

    message = {
      content: $(e.target).find('[name=content]').val()
    };

    if (!/^\s*$/.test(message.content)) {
      $(e.target).find('[name=content]').val('')
      Meteor.call('message', message, function (error, id) {
        if (error)
          alert(error.reason)
      });
    }
  }
});