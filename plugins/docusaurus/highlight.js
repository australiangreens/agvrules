export default function (context, options) {
  return {
    name: 'docusaurus-anchor-highlight',
    getClientModules() {
      return ['./plugins/docusaurus/highlightclient.js']
    }
  };
};