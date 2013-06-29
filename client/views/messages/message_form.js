Template.messageForm.events({
  'submit form': function (e) {
    e.preventDefault();

    messageProperties = {
      username: 'Jordan',
      content: $(e.target).find('[name=content]').val()
    };

    Messages.insert(messageProperties , function (error) {
      if (error)
        alert(error.reason)
      else
        $(e.target).find('[name=content]').val('')
    });
  }
});