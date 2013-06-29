Template.messageForm.events({
  'submit form': function (e) {
    e.preventDefault();

    message = {
      content: $(e.target).find('[name=content]').val()
    };

    if (message.content) {
      Meteor.call('message', message, function (error, id) {
        if (error)
          alert(error.reason)
        else
          $(e.target).find('[name=content]').val('')
      });
    }
  }
});