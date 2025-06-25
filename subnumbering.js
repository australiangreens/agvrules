export default function (context, options) {

  let counterCss = '';

  for (let i = 0; i < 100; i++) {
    counterCss += `
ol[start="${i}"] {
  counter-reset: item ${i-1};
}
`
  }

  let headString = `
<script>
if (window.location.pathname.indexOf('/constitution/') !== -1) {
  document.head.insertAdjacentHTML("beforeend", \`<style>

ol {
  list-style-type: none;
  counter-reset: item;
  margin: 0;
  padding: 0;
}
 ol > li {
  display: table;
  counter-increment: item;
  margin-bottom: 0.6em;
}
 ol > li:before {
  content: counters(item, ".") ". ";
  display: table-cell;
  padding-right: 0.6em;    
}

li ol > li {
  margin: 0;
}

li > p {
  margin-block-start: 0;
  margin-block-end: 0;
}

li ol > li:before {
  content: counters(item, ".") " ";
}

${counterCss}
  </style>\`)
}
</script>
`;

  return {
    name: 'docusaurus-subnumbering',
    injectHtmlTags() {
      return {
        headTags: [headString],
      };
    },
  };
};