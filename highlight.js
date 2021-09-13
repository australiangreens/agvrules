module.exports = function (context, options) {

  let postBodyString = `
<script>
  let timesRun = 0;
  const applyHashHighlight = function() {
    timesRun++;
    if (window.location.hash?.startsWith('#')) {
      const refElement = document.getElementById(window.location.hash.replace('#', ''));
      if (refElement) {
        refElement.parentElement.innerHTML = "<mark>" + refElement.parentElement.innerHTML + "</mark>";
      }
      if (timesRun < 100) {
        setTimeout(applyHashHighlight, 100);
      }
    }
  };

  applyHashHighlight();
</script>
`;

  return {
    name: 'docusaurus-anchor-highlight',
    injectHtmlTags() {
      return {
        headTags: [],
        postBodyTags: [postBodyString],
      };
    },
  };
};