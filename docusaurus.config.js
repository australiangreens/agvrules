import {themes} from 'prism-react-renderer';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
// import {nodeTypes} from '@mdx-js/mdx' // we can't load this - it just breaks things

// import remarkFootnotes from 'remark-footnotes';
import definitionsPlugin from './plugins/remark/definitions.js';
import bylawLinksPlugin from './plugins/remark/bylawlinksplugin.js';
import highlightPlugin from './plugins/docusaurus/highlight.js';
import subnumberingPlugin from './plugins/docusaurus/subnumbering.js';
// import webpackPlugin from './webpackplugin';


// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
export default {
  title: 'AGV Rules',
  tagline: 'Browsable governance',
  url: 'https://australiangreens.github.io',
  baseUrl: '/agvrules/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'australiangreens', // Usually your GitHub org/user name.
  projectName: 'agvrules', // Usually your repo name.
  trailingSlash: true,
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  // future: {
  //   v4: true, // Improve compatibility with the upcoming Docusaurus v4
  // },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: false,
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // editUrl: undefined,
          rehypePlugins: [
            [rehypeRaw, {passThrough: ["mdxFlowExpression", "mdxJsxFlowElement", 
              "mdxJsxTextElement", "mdxTextExpression", "mdxjsEsm"]
            }], // hardcoded since @mdx-js/mdx breaks things
          ],
          remarkPlugins: [
            [remarkGfm, { }],
            [bylawLinksPlugin, {}],
            [definitionsPlugin, { definitions: {
              "AA": "Affirmative Action",
              "AEC": "Australian Electoral Commission",
              "AF": "Audit and Finance Committee",
              "AG": "Australian Greens",
              "AG": "Attorney-General",
              "AGPCC": "Australian Greens Policy Coordination Committee",
              "AGM": "Annual General Meeting",
              "AGV": "Australian Greens Victoria",
              "ALP": "Australian Labor Party",
              "AJP": "Animal Justice Party",
              "AIR": "Associations Incorporation Reform Act ",
              "APH": "Australian Parliament House",
              "ARP": "Administrative Review Panel",
              "AssSec": "Assistant Secretary",
              "ASS": "Assistant State Secretary",
              "AusPol": "Australian Politics",
              "AYG": "Australian Young Greens",
              "BRT": "Branch Reporting Tool",
              "CAV": "Consumer Affairs Victoria",
              "CEPWG": "Climate and Energy Policy Working Group",
              "CGN": "Country Greens Network",
              "CiviCRM": "Civi Customer Relationship Management (It’s just CiviCRM or Civi)",
              "CMT": "Campaign Management Team",
              "COM": "Committee of Management (In existence in some state Greens)",
              "Conf": "Conference",
              "CoS": "Chief of Staff",
              "CRP": "Constitutional Review Panel",
              "Co-Co": "Co-Convenor",
              "DIM": "Decisions Implementation Matrix",
              "DRG": "Donations Reference Group",
              "DRO": "Deputy Returning Officer",
              "EAP": "Employee Assistance Program",
              "ECC": "Election/Electorate Campaign Committee",
              "EGM": "Extraordinary General Meeting",
              "EMRC": "Eastern Metro Regional Council",
              "EMS": "Election Management System",
              "EoI": "Expressions of Interest",
              "ERC": "Endorsement Review Committee",
              "ETS": "Emissions Trading Scheme",
              "Exec": "State Executive",
              "FAIC": "Finance, Administration and Infrastructure Committee",
              "FNN": "First Nations Network",
              "GG": "Global Greens",
              "GIG": "Global Issues Group",
              "GPEW": "Greens Party of England & Wales",
              "GM": "(Ordinary) General Meeting",
              "GMO": "Genetically Modified Organisms",
              "GRN": "Greens",
              "GVIRS": "Grassroots Voter Interaction Recording System",
              "HoR": "House of Representatives",
              "HRC": "Human Rights Commission",
              "HtV": "How to Vote",
              "HTVC": "How to Vote Card",
              "ICAC": "Independent Commission Against Corruption",
              "IRV": "Instant Runoff Voting",
              "IP Policy": "Israel/Palestine Resolution",
              "JSJ": "Jordon Steele-John",
              "J-Greens": "Jewish Greens",
              "LAB": "Australian Labor Party",
              "LEAN": "Labor Environment Action Network",
              "LG": "Local Government",
              "LGA": "Local Government Area",
              "LGC": "Local Government Councillors",
              "LGBTIQA+": "Lesbian, Gay, Bisexual, Trans, Intersex, Queer, Asexual/Aromantic",
              "LNP": "Liberal National Party",
              "LIB": "Liberal Party",
              "LO": "Leader’s Office",
              "LP": "Liberal Party",
              "LRRR": "Left Renewal Renewal Renewal",
              "LR": "The OG Left Renewal",
              "MEC": "Membership Engagement Committee ",
              "MeP": "Mediation Panel",
              "MGV": "Multicultural Greens Victoria",
              "MiP": "Misconduct Panel",
              "MLA": "Member (of) Legislative Assembly (not commonly used in VIC, see MP)",
              "MLC": "Member (of) Legislative Council (Victorian state parliament upper house)",
              "MP": "Member (of) Parliament",
              "MTC": "Meet The Candidates (sometimes called Hustings)",
              "NAC": "National Affairs Committee (now NCC)",
              "NatCon": "National Conference",
              "NB": "NationBuilder",
              "NC": "National Council",
              "NCC": "National Conference Committee",
              "NM": "Northern Metropolitan region",
              "NVRSECC": "Northern Victoria Regional Standing Campaign Committee",
              "OB": "Office Bearer",
              "ON": "One Nation",
              "PDWG": "Participatory Democracy Working Group",
              "PCC": "Policy Coordination Committee",
              "PHON": "Pauline Hanson’s One Nation",
              "PR": "Party Room",
              "PSC": "Policy Steering Committee",
              "PWDWG": "People With Disabilities Working Group",
              "PWG": "Policy Working Group",
              "QDMG": "Quick Decision Making Group",
              "QGV": "Queer Greens Victoria",
              "RDN": "Richard Di Natali",
              "RO": "Returning Officer",
              "ROCkET": "Recruit, Organise, Campaign, Engagement Tool",
              "RR": "Risk Register",
              "SAlt": "Socialist Alternatives",
              "SC": "State Council",
              "SD": "State Director",
              "SDC": "State Delegates Council (used in other states)",
              "SFC": "Seek Further Candidate",
              "SGM": "Special General Meeting",
              "SHY": "Sarah Hanson-Young",
              "SM": "Southern Metropolitan region",
              "STV": "Single Transferable Vote",
              "SECC": "Standing Election Campaign Committee Report",
              "SEMRC": "South Eastern Metro Regional Council",
              "SO": "State Office",
              "STEM": "Statewide Tool for Election Management",
              "TGDNB": "Trans, Gender Diverse, and Non-Binary",
              "ToR": "Terms of Reference",
              "VEC": "Victorian Election Commission",
              "VEOHRC": "Victorian Equal Opportunity and Human Rights Commission",
              "Vic": "Victoria",
              "VicPol": "Victorian Politics",
              "VicPol": "Victorian Police",
              "VicSoc": "Victorian Socialists",
              "VCAT": "Victorian Civil and Administrative Tribunal",
              "VCC": "Victorian Campaign Committee",
              "VG": "Victorian Greens",
              "VGWN": "Victorian Greens Women's Network",
              "VLGA": "Victorian Local Government Association",
              "VPD": "Victorian Positions Document",
              "VPL": "Victorian Pride Lobby",
              "VYG": "Victorian Young Greens",
              "WVRCC": "Western Victoria Regional Campaign Committee",
              "most senior member of the agv staff": "State Director",
              "most senior agv staff member": "State Director",
              "most senior staff member": "State Director",
            } } ]
          ]
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    ['@easyops-cn/docusaurus-search-local', {
      docsRouteBasePath: '/',
      highlightSearchTermsOnTargetPage: true,
      searchResultLimits: 10,
      searchResultContextMaxLength: 100
    }],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects: function (existingPath) {
          if (existingPath.startsWith('/old-bylaws/')) {
            let links = [];
            links.push(existingPath.replace('old-bylaws', 'bylaws'));
            const matches = existingPath.match(/[0-9]{2}/);
            if (matches) {
              const bylawNumber = matches[0];
              const shortLink = `/bylaws/${bylawNumber}`;
              // Don't break old URLs
              const shortLinkOld = shortLink.replace('old-bylaws', 'bylaws');
              const shorterLink = `/bylaws/${parseInt(bylawNumber)}`;
              const shorterLinkOld = shorterLink.replace('old-bylaws', 'bylaws')
              return shortLink === shorterLink ? [...links, shortLink, shortLinkOld] : [...links, shortLink, shortLinkOld, shorterLink, shorterLinkOld];
            }
            return links;
          }
          if (existingPath.startsWith('/constitution/')) {
            let links = [];
            links.push(existingPath.replace('constitution', 'new-constitution'));
            const scheduleMatches = existingPath.match(/(?:schedule-)([0-9]{2})/);
            if (scheduleMatches) {
              const scheduleNumber = scheduleMatches[1];
              const shortLink = `/constitution/schedule-${scheduleNumber}`;
              // Don't break old URLs
              const shortLinkNew = shortLink.replace('constitution', 'new-constitution');
              const shorterLink = `/constitution/schedule-${parseInt(scheduleNumber)}`;
              const shorterLinkNew = shorterLink.replace('constitution', 'new-constitution');
              return shortLink === shorterLink ? [...links, shortLink, shortLinkNew] : [...links, shortLink, shortLinkNew, shorterLink, shorterLinkNew];
            }
            return links;
          }
        },
      },
    ],
    [highlightPlugin, {}],
    [subnumberingPlugin, {}],
    // [webpackPlugin, {}],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'AGV Rules',
        logo: {
          alt: 'AGV logo coming soon',
          src: 'img/logo.svg',
        },
        items: [
          // {to: '/constitution', label: 'Constitution', position: 'left'},
          // {to: '/terms-of-reference', label: 'Terms of Reference', position: 'left'},
          {to: '/charter', label: 'Charter', position: 'left'}
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contribute',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/australiangreens/agvrules',
              },
            ],
          },
        ],
        copyright: `Authorised by governance nerds everywhere, Suite 1.05 50 Queen St, Melbourne VIC 3000. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),
  // markdown: {
  //   format: 'mdx',
  //   mermaid: false,
  //   // preprocessor: ({filePath, fileContent}) => {
  //   //   return fileContent.replaceAll('{{MY_VAR}}', 'MY_VALUE');
  //   // },
  //   // mdx1Compat: {
  //   //   comments: true,
  //   //   admonitions: true,
  //   //   headingIds: true,
  //   // },
  // },
};
