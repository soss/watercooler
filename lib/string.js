/**
 * Some nifty string extensions
 */

String.prototype.escapeTags = function () {
  return this.replace(/>/g, '&gt;')
             .replace(/</g, '&lt;');
}

String.prototype.markdownBold = function () {
  return this.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}

String.prototype.markdownItalic = function () {
  return this.replace(/\*(.+?)\*/g, '<i>$1</i>');
}
