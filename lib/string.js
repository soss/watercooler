/**
 * Some nifty string extensions
 * NOTE: Most regular expressions here start matches with whitespace. Proceed with caution.
 */

/* Our feature set */

String.prototype.watercoolerFeatures = function () {
  return (' ' + this + ' ')
    .escapeTags()
    .markdownBold()
    .markdownItalic()
    .createImages()
    .createLinks()
    .emojify()
    .createSwatches()
    .createMurrays()
}

/* Individual methods */

String.prototype.escapeTags = function () {
  // <b>XSS</b> => &lt;b&gt;XSS&lt;/b&gt;
  return this.replace(/>/g, '&gt;')
             .replace(/</g, '&lt;');
}

String.prototype.markdownBold = function () {
  // **test** => <b>test</b>
  return this.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}

String.prototype.markdownItalic = function () {
  // *test* => <i>test</i>
  return this.replace(/\*(.+?)\*/g, '<i>$1</i>');
}

String.prototype.createImages = function () {
  // http://example.com/blah.png => <img class="message-img" src="http://example.com/blah.png" />
  // .message-img is display: block, we don't need to pad the result with spaces
  return this.replace(/\s(https?:\/\/(?:[\w_\.-]\/?)+\.(?:jpg|png|gif))\s/g,
    '<img class="message-img" src="$1" />');
}

String.prototype.createLinks = function () {
  // http://google.com => <a target="_blank" href="http://google.com">http://google.com</a>
  return this.replace(/\s(https?:\/\/(?:[\w_\.-]\/?)+)\s/g, ' <a target="_blank" href="$1">$1</a> ');
}

String.prototype.emojify = function () {
  // :heart: => <img class="message-emoji" src="http://.../emojis/heart.png" />
  return this.replace(/:(\w+?):/g,
    '<img class="message-emoji" src="http://www.emoji-cheat-sheet.com/graphics/emojis/$1.png" />');
}

String.prototype.createSwatches = function () {
  // #c4de33 => #C4DE33 <div class="message-swatch" title="#c4de33" ... ></div>
  return this.replace(/\s(#[0-9a-fA-F]{6})\s/g,
    '<span class="upper">$1</span>' +
    '<div class="message-swatch" title="$1" style="background-color: $1"></div>');
}

String.prototype.createMurrays = function () {
  // inserts a randomly-sized Bill Murray (courtesy of fillmurray)
  var width = Math.floor(Math.random() * 200) + 150;
  var height = Math.floor(Math.random() * 200) + 150;

  return this.replace(/\s(\/murray)\s/g,
    '<img class="message-img" src="http://www.fillmurray.com/' + width + '/' + height + '" />');
}
