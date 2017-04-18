/**
 * Format
 * -- take a HTML string and correctly indent it
 * @param {String} node
 * @param {Interger} level
 * @return {String}
 */
let format = function(node, level) {
  let indentBefore = new Array(level++ + 1).join('  '),
      indentAfter  = new Array(level - 1).join('  '),
      textNode;

  for (var i = 0; i < node.children.length; i++) {
      textNode = document.createTextNode('\n' + indentBefore);
      node.insertBefore(textNode, node.children[i]);

      format(node.children[i], level);

      if (node.lastElementChild == node.children[i]) {
          textNode = document.createTextNode('\n' + indentAfter);
          node.appendChild(textNode);
      }
  }

  return node;
}

/**
 * Process
 * -- Take a string and pack it into a generic DOM node to trigger a indentation
 * @param {String} str
 * @return {String}
 */
let process = function(str) {
  let div = document.createElement('div');
  div.innerHTML = str.trim();
  return format(div, 0).innerHTML;
}

// Thanks StackOverflow for the idea - http://stackoverflow.com/a/26361620/1277132
export default function(str) {
  return process(str)
}
