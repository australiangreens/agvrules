const visit = require('unist-util-visit');
const map = require('unist-util-map');
const is = require('unist-util-is');

const newConstitutionDefinitions = {
  "Australian Greens Victoria": undefined,
  "Electoral Act": undefined,
  "Australian Greens": "the Australian Greens (The Greens) Incorporated, incorporated under the *Associations Incorporation Act 1991* (ACT) with association number A02626",
  "act": `the <a href="http://www8.austlii.edu.au/cgi-bin/viewdb/au/legis/vic/consol_act/aira2012376/" target="_blank">Associations Incorporation Reform Act 2012</a>`,
  "ballot": "a secret ballot that uses a single transferable vote quota-preferential voting system, allows the option of not allocating further preferences, uses Robson Rotation, and provides an option of voting to ‘Seek Further Candidates’",
  "casual vacancy": "includes a vacancy caused by an office not being filled at an election",
  "charter": "The Charter of The Greens which is appended to the National Constitution",
  "consensus": "the circumstance in which no member of the party body who is in attendance objects to the proposal being passed, having been given the opportunity to do so",
  "continuing State Councillor": `<ol style={{listStyleType: 'lower-alpha !important'}}><li>in the case of a scheduled election—a current State Councillor whose term of office continues beyond 30 June of the year of the election; and</li><li>in the case of a by-election — a current State Councillor</li></ol>`,
  "disciplinary action": `<ol style={{listStyleType: 'lower-alpha !important'}}><li>a member is suspended for a specified period; or</li><li>a member is expelled.</li></ol>`,
  "disciplinary procedure": "State Council must make the procedure under which disciplinary action may be taken (<b><i>disciplinary procedure</b></i>)",
  "election deliberation session": `a discussion of:<ol style={{listStyleType: 'lower-alpha !important'}}><li>the issues facing the Party and how they should be addressed;</li><li>the strengths and weaknesses of the current State Council;</li><li>the merits of the candidates in addressing those.</li></ol>`,
  "Greens party": "one of the member bodies of the Australian Greens",
  "grievance procedure": "State Council must make the procedure for dealing with any dispute under this Constitution between a member and another member or the Party (<b><i>grievance procedure</b></i>)",
  "insolvent under administration": `has the meaning given in the <a href="http://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/vic/consol_act/iola1984322/s38.html#insolvent_under_administration" target="_blank">Interpretation of Legislation Act 1984</a>`,
  "local government area": `has the meaning given to the term <b>municipal district</b> in the <a href="http://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/vic/consol_act/lga2020182/s3.html" target="_blank">Local Government Act 2020</a>`,
  "member body of the Australian Greens": `has the meaning given to the term <bmember body</b> in the <a href="https://greens.org.au/sites/default/files/2020-11/AG%20Constitution%20%28amended%202020%20Nov%29_0.pdf" target="_blank">National Constitution</a>`,
  "member who holds public office": "includes a member elected or appointed to a public office where the term of that office is yet to begin",
  "National Constitution": "the Constitution of the Australian Greens",
  "Party": "the incorporated association referred to in clause 40(1)",
  "party body": "State Council, the Constitutional Votes Committee, a branch, and any body established by exercise of the power of State Council or a branch",
  "party office": "State Councillor, member of the Constitutional Votes Committee, Secretary of the Association, and any named office established by exercise of the power of State Council or a branch",
  "party strategy": "a general statement of the long-term aims and objectives of the Party and how they should be achieved",
  "policy": "a statement of principle and intent about what government should do",
  "political party": "a political party registered under Commonwealth, state or territory law",
  "public office": "an elected office in a council or parliament",
  "procedural proposal": "a proposal about the proceedings of the meeting at which it is put",
  "reconsideration proposal": "a proposal that a resolution of State Council or a senior party body be rescinded",
  "resolution": "a proposal that was passed",
  "senior party body": "a party body given that status under clause 19(3)",
  "special resolution": "a special resolution of a general meeting passed in accordance with the Act and clause 39(11)",
  "substantive proposal": "any proposal that is not a procedural or reconsideration proposal",
  "members’ meeting substantive proposal": "a permitted proposal about the issue",
  "Secretary of the Association": `has the meaning given in <a href="http://www8.austlii.edu.au/cgi-bin/viewdb/au/legis/vic/consol_act/aira2012376/" target="_blank">the Act</a>`,
  "scheduled election": "An election must be held each year beginning with the call for nominations no earlier than 1 February and ending with the declaration of which candidates are elected no later than 31 May",
  "special measure": `has the meaning given in the <a href="http://www8.austlii.edu.au/cgi-bin/viewdb/au/legis/vic/consol_act/eoa2010250/" target="_blank">Equal Opportunity Act 2010</a>`,
  "financial year": "The financial year of the Party is the year ending on 30 June.",
}

module.exports = function definitionsPlugin({
  definitions
} = {}) {
  return function transformer(tree, file) {
    if (!definitions) return tree;
    if (file.history[0].indexOf('new-constitution') !== -1) {
      definitions = Object.assign({}, definitions, newConstitutionDefinitions);
    }

    const acronymsRegExp = new RegExp(`\\b(${Object.keys(definitions).join('|')})\\b`, 'gi');
    visit(tree, 'text', (node, index, parent) => {
      if (node.value && typeof node.value === 'string') {
        const newNodes = node.value.split(acronymsRegExp).map((value) => {
          const acronymTitle = definitions[value] ? definitions[value] : definitions[value.toLowerCase()];
  
          return acronymTitle
            ? {
                type: 'html',
                value: `<abbr>${value}<span class="abbr-info">${acronymTitle}</span></abbr>`,
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