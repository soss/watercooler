Messages = new Meteor.Collection('messages');

Meteor.methods({
  message: function (messageAttributes) {
    var user = Meteor.user()

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to send a message");

    // ensure the message has content
    if (!messageAttributes.content)
      throw new Meteor.Error(422, "Please fill in a message");

    // TODO(jordan) render the markup for content (markdown, images, emoji, etc...)

    // pick out the whitelisted keys
    var message = _.extend(_.pick(messageAttributes, 'content'), {
      userId: user._id,
      username: user.username,
      submitted: new Date().getTime()
    });

    Messages.insert(message);
  }
});