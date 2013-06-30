Messages = new Meteor.Collection('messages');

Messages.allow({
  remove: function (userId, message) {
    return userId === message.userId;
  }
});

Meteor.methods({
  message: function (messageAttributes) {
    var user = Meteor.user()

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to send a message");

    // ensure the message has content
    if (/^\s*$/.test(messageAttributes.content))
      throw new Meteor.Error(422, "Please fill in a message");

    // build the message
    var message = {
      // watercoolerFeatures() includes markdown, images, emoji, etc.
      // see `client/helpers/string.js` for details
      content: messageAttributes.content.watercoolerFeatures(),
      userId: user._id,
      username: user.username,
      submitted: new Date().getTime()
    };

    Messages.insert(message);
  }
});