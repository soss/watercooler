Messages = new Meteor.Collection('messages');

var watercoolerFeatureSet = function (string) {
  // first pad the string with spaces to handle
  // super janky word-border detection in regex
  return (' ' + string + ' ')
    .escapeTags()
    .markdownBold()
    .markdownItalic()
    .createImages()
    .createLinks()
    .emojify()
    .createSwatches()
    .createMurrays()
};

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

    // Render the markup for content (markdown, images, emoji, etc...)
    messageAttributes.content = watercoolerFeatureSet(messageAttributes.content)

    // pick out the whitelisted keys
    var message = _.extend(_.pick(messageAttributes, 'content'), {
      userId: user._id,
      username: user.username,
      submitted: new Date().getTime()
    });

    Messages.insert(message);
  }
});