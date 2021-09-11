const map = require('unist-util-map');
const visit = require('unist-util-visit');
const is = require('unist-util-is');
const position = require('unist-util-position');

const lettersOfTheAlphabet = 'abcdefghijklmnopqrstuvwxyz';

function generateSlug(headline, links = []) {
  let slug = headline;

  // count if there are any duplicates on the page
  const dupeCount = links.reduce((m, i) => {
    if (slug === i) m++
    return m
  }, 0)
  links.push(slug)

  // append the count to the end of the slug if necessary
  if (dupeCount > 0) {
    slug = `${slug}-${dupeCount}`
  }

  return slug
}

module.exports = function bylawLinksPlugin({
} = {}) {
  return function transformer(tree, file) {
    const value = String(file)
    // this array keeps track of existing slugs to prevent duplicates per-page
    const links = []
    const processed = [];

    function enumerateChild(prefix, letters, child, i) {
      if (processed.includes(child)) { return }
      let marker = Number(
        value
          .slice(
            position.start(child).offset,
            position.start(child.children[0]).offset
          )
          .replace(/[\s.)]/g, '')
          .replace(/\[[x ]?]\s*$/i, '')
      )
      if (letters) {
        marker = lettersOfTheAlphabet[marker-1];
      }
      var idx = i + 1;
      child.id = prefix ? prefix + '.' + marker : marker.toString();
      let childHasLetters = false;
      child.children.filter(function(child) {
        if (child.type == 'jsx' && child.value == '<subclause-letters>') {
          childHasLetters = true;
        }
        return child.type === 'list';
      }).forEach(function(list) {
        list.children.forEach(enumerateChild.bind(null, child.id, childHasLetters));
      });
      const slug = generateSlug(child.id, links)
      if (child.children && is(child.children[0], 'paragraph')) {
        child.children[0].children.unshift({
          type: 'html',
          value: `<a aria-hidden="true" tabindex="-1" class="anchor anchor-ref" id="${slug}"></a>`,
        })
        child.children[0].children.push({
          type: 'html',
          value: `<a class="hash-link" href="#${slug}" title="Direct link">#</a>`
        })
      } else {
        child.children.unshift({
          type: 'html',
          value: `<a aria-hidden="true" tabindex="-1" class="anchor anchor-ref" id="${slug}"></a>`,
        })
        child.children.push({
          type: 'html',
          value: `<a class="hash-link" href="#${slug}" title="Direct link">#</a>`
        })
      }
      processed.push(child);
    }
  
    visit(tree, 'list', function (node) {
      node.children.forEach(enumerateChild.bind(null, '', false));
      return true;
    });
  
    // visit(tree, 'listItem', function (node) {
    //   var id = node.id;
    //   visit(node, 'html', function (node) {
    //     var match = node.value.match(/<a\s*name='([^']+)'>/);
    //     if (match) {
    //       anchors[match[1]] = id;
    //     }
    //   });
    // });

    // return map(tree, (node) => {

    //   if (!is(node, 'listItem')) return node

      // if (node.children && is(node.children[0], 'paragraph')) {
      //   node.children[0] = processListItem(node.children[0], links);
      //   return node;
      // }

    //   return processListItem(
    //     node,
    //     links
    //   )
    // })
  }
}

function processListItem(
  node,
  id,
  links
) {
  const slug = generateSlug(id, links)
  node.children.unshift({
    type: 'html',
    value: `<a aria-hidden="true" tabindex="-1" class="anchor anchor-ref" id="${slug}"></a>`,
  })
  node.children.push({
    type: 'html',
    value: `<a class="hash-link" href="#${slug}" title="Direct link">#</a>`
  })
  return node
}