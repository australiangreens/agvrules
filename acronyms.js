const visit = require('unist-util-visit');
const map = require('unist-util-map');
const is = require('unist-util-is');

const proposedConstitutionAcronyms = {
  "Australian Greens": "the Australian Greens (The Greens) Incorporated, incorporated under the *Associations Incorporation Act 1991* (ACT) with association number A02626",
  "act": "the <i>Associations Incorporation Reform Act 2012</i>",
  "ballot": "a secret ballot that uses a single transferable vote quota-preferential voting system, allows the option of not allocating further preferences, uses Robson Rotation, and provides an option of voting to ‘Seek Further Candidates’",
  "casual vacancy": "includes a vacancy caused by an office not being filled at an election",
  "charter": "The Charter of The Greens which is appended to the National Constitution",
  "consensus": "the circumstance in which no member of the party body who is in attendance objects to the proposal being passed, having been given the opportunity to do so",
  "continuing State Councillor": `<ol style="list-style-type: lower-alpha !important;"><li>in the case of a scheduled election—a current State Councillor whose term of office continues beyond 30 June of the year of the election; and</li><li>in the case of a by-election — a current State Councillor</li></ol>`,
  "disciplinary action": `<ol style="list-style-type: lower-alpha !important;"><li>a member is suspended for a specified period; or</li><li>a member is expelled.</li></ol>`,
  "disciplinary procedure": "State Council must make the procedure under which disciplinary action may be taken (<b><i>disciplinary procedure</b></i>)",
  "election deliberation session": `a discussion of:<ol style="list-style-type: lower-alpha !important;"><li>the issues facing the Party and how they should be addressed;</li><li>the strengths and weaknesses of the current State Council;</li><li>the merits of the candidates in addressing those.</li></ol>`,
  "Greens party": "one of the member bodies of the Australian Greens",
  "grievance procedure": "State Council must make the procedure for dealing with any dispute under this Constitution between a member and another member or the Party (<b><i>grievance procedure</b></i>)",
  "insolvent under administration": `<ol style="list-style-type: lower-alpha !important;"><li>a person who is an undischarged bankrupt within the meaning of the Bankruptcy Act 1966 of the Commonwealth (or the corresponding provisions of the law of another jurisdiction); or</li><li>a person who has executed a deed of arrangement under Part X of the Bankruptcy Act 1966 of the Commonwealth (or the corresponding provisions of the law of another jurisdiction) if the terms of the deed have not been fully complied with; or</li><li>a person whose creditors have accepted a composition under Part X of the Bankruptcy Act 1966 of the Commonwealth (or the corresponding provisions of the law of another jurisdiction) if a final payment has not been made under that composition; or</li><li>a person for whom a debt agreement has been made under Part IX of the Bankruptcy Act 1966 of the Commonwealth (or the corresponding provisions of the law of another jurisdiction) if the debt agreement has not ended or has not been terminated; or</li><li>a person who has executed a personal insolvency agreement under Part X of the Bankruptcy Act 1966 of the Commonwealth (or the corresponding provisions of the law of another jurisdiction) but not if the agreement has been set aside or terminated or all of the obligations that the agreement created have been discharged;</li></ol>`,
  "local government area": `means the district under the local government of a Council`,
  "member body of the Australian Greens": "the Greens’ state political parties (comprised of their various constituent groups)",
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
  "Secretary of the Association": "the person who is for the time being the secretary of the association under Division 1 of Part 6 of the Act",
  "scheduled election": "An election must be held each year beginning with the call for nominations no earlier than 1 February and ending with the declaration of which candidates are elected no later than 31 May",
  "special measure": "has the meaning given in the Equal Opportunity Act 2010"
}

module.exports = function acronymsPlugin({
  acronyms
} = {}) {
  return function transformer(tree, file) {
    if (!acronyms) return tree;
    if (file.history[0].indexOf('proposed-constitution') !== -1) {
      acronyms = Object.assign({}, acronyms, proposedConstitutionAcronyms);
    }

    const acronymsRegExp = new RegExp(`\\b(${Object.keys(acronyms).join('|')})\\b`, 'gi');
    visit(tree, 'text', (node, index, parent) => {
      if (node.value && typeof node.value === 'string') {
        const newNodes = node.value.split(acronymsRegExp).map((value) => {
          const acronymTitle = acronyms[value] ? acronyms[value] : acronyms[value.toLowerCase()];
  
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