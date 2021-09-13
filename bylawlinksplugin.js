const map = require('unist-util-map');
const visit = require('unist-util-visit');
const is = require('unist-util-is');
const position = require('unist-util-position');
const fs = require('fs');

const powersStateCouncilMustNotDelegate = fs.readFileSync('docs/proposed-constitution/schedule-04-powers-state-council-must-not-delegate.md', 'utf-8').match(/<td>.*?<\/td>/g).map((cell) => {
  const clean = cell.replace('<td>', '').replace('</td>', '');
  if (clean.startsWith('Clause')) {
    if (clean.indexOf('and') !== -1) {
      const nums = clean.split(' and ');
      const clauseNum1 = nums[0].split(' ')[1].replace('(', '.').replace(')', '');
      const clauseNum2 = clauseNum1.split('.')[0] + nums[1].replace('(', '.').replace(')', '');
      return [clauseNum1, clauseNum2]
    } else {
      const clauseNum = clean.split(' ')[1].replace('(', '.').replace(')', '');
      return [clauseNum]
    }
  }
}).flat().filter(v => v);

const clauseDates = {
  "40.1": "immediately",
  "4.1": "on 1 February 2022",
  "4.2": "on 1 February 2022",
  "4.3": "on 1 February 2022",
  "4.4": "on 1 February 2022",
  "35.1": "on 1 February 2022 as it applies to the New State Council",
  "35.2": "on 1 February 2022 as it applies to the New State Council",
  "35.3": "on 1 February 2022 as it applies to the New State Council",
  "35.4": "on 1 February 2022 as it applies to the New State Council",
  "36.1": "on 1 February 2022 as it applies to the New State Council",
  "36.2": "on 1 February 2022 as it applies to the New State Council",
  "36.3": "on 1 February 2022 as it applies to the New State Council",
  "36.4": "on 1 February 2022 as it applies to the New State Council",
  "21.2": "on 1 January 2023",
};

const clausesMentioningDays = ["12.2", "12.3", "23.2.1", "23.2.2", "28.3.b.1", "28.3.b.2", "35.3.d", "39.1.b", "39.1.b.1", "39.1.b.2", "39.3", "39.5"];

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
    const isSchedule = (file.history[0].indexOf('proposed-constitution/schedule') !== -1);
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
      let heading = null;
      child.children.filter(function(child) {
        if (child.type == 'jsx' && child.value == '<subclause-letters>') {
          childHasLetters = true;
        }
        if (child.type == 'heading') {
          heading = child.data.id;
        }
        return child.type === 'list';
      }).forEach(function(list) {
        list.children.forEach(enumerateChild.bind(null, child.id, childHasLetters));
      });
      if (heading) {
        return;
      }
      const slug = generateSlug(child.id, links);
      let mustnotDelegate = powersStateCouncilMustNotDelegate.includes(slug);
      let clauseAnnotations = [];
      if (mustnotDelegate && !isSchedule) {
        clauseAnnotations.push('nodelegate');
      }
      if (clauseDates[slug] && !isSchedule) {
        clauseAnnotations.push(`effectivefrom="${clauseDates[slug]}"`);
      }
      if (clausesMentioningDays.includes(slug) && !isSchedule) {
        clauseAnnotations.push('days');
      }
      if (child.children && is(child.children[0], 'paragraph')) {
        if (clauseAnnotations.length > 0) {
          child.children[0].children.unshift({
            type: 'jsx',
            value: `<ClauseAnnotation ${clauseAnnotations.join(" ")} />`
          });
        }
        child.children[0].children.unshift({
          type: 'html',
          value: `<a aria-hidden="true" tabindex="-1" class="anchor anchor-ref" id="${slug}"></a>`,
        })
        child.children[0].children.push({
          type: 'html',
          value: `<a class="hash-link" href="#${slug}" title="Direct link">#</a>`
        })
      } else {
        if (clauseAnnotations.length > 0) {
          child.children.unshift({
            type: 'jsx',
            value: `<ClauseAnnotation ${clauseAnnotations.join(" ")} />`
          });
        }
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