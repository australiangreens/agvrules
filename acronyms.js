const visit = require('unist-util-visit');
const map = require('unist-util-map');
const is = require('unist-util-is');

module.exports = function acronymsPlugin({
  acronyms
} = {}) {
  return function transformer(tree) {
    if (!acronyms) return tree;

    const acronymsRegExp = new RegExp(`\\b(${Object.keys(acronyms).join('|')})\\b`, 'gi');
    visit(tree, 'text', (node, index, parent) => {
      if (node.value && typeof node.value === 'string') {
        const newNodes = node.value.split(acronymsRegExp).map((value) => {
          const acronymTitle = acronyms[value] ? acronyms[value] : acronyms[value.toLowerCase()];
  
          return acronymTitle
            ? {
                type: 'html',
                value: `<abbr data-title="${acronymTitle}">${value}</abbr>`,
              }
            : {
                type: 'text',
                value,
              };
        });
  
        parent.children.splice(index, 1, ...newNodes);
  
        return index + newNodes.length;
      }
  
      return index + 1;
    });

    return tree;
  }
}