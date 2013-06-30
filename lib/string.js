/**
 * Some nifty string extensions
 */

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
  return this.replace(/(https?:\/\/(?:[\w_\.-]\/?)+\.(?:jpg|png|gif))/g,
    '<img class="message-img" src="$1" />');
}

String.prototype.emojify = function () {
  return this.replace(/:(.+):/g,
    '<img class="message-emoji" src="http://www.emoji-cheat-sheet.com/graphics/emojis/$1.png" />');
}

String.prototype.createSwatches = function () {
  return this.replace(/(#[0-9a-fA-F]{6})/g,
    '<span class="upper">$1</span>' +
    '<div class="message-swatch" title="$1" style="background-color: $1"></div>');
}

String.prototype.createLinks = function () {
  // http://google.com => <a target="_blank" href="http://google.com">http://google.com</a>
  return this.replace(/(https?:\/\/(?:[\w_\.-]\/?)+)/g, '<a target="_blank" href="$1">$1</a>');
}
