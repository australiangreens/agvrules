# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Development

To get set up in local development, you'll need a few things:
* `git`
* `node.js` - ideally install [nvm](https://github.com/nvm-sh/nvm) (node version manager)
    to then install node - it'll make your life so much easier
* `pnpm` - which can be installed via `brew install pnpm`, previously `yarn`

If you're using MacOS (or linux) I'd also reccomend installing [homebrew](brew.sh)
to make managing everything a little easier.

To do this, install nvm, then run:

```zsh
$ nvm install --lts
$ nvm alias default 22
EITHER
$ brew install pnpm
OR
$ npm install --global yarn # we really want to move away from this
```

### Local Development

```zsh 
$ pnpm install
$ pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Building

```zsh
$ pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```zsh
$ GIT_USER=<Your GitHub username> USE_SSH=true pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Errata

Previous requirements:
```
"@docusaurus/babel": "^3.8.1",
"@docusaurus/core": "^3.8.1",
"@docusaurus/mdx-loader": "^3.8.1",
"@docusaurus/plugin-client-redirects": "^3.8.1",
"@docusaurus/preset-classic": "^3.8.1",
"@docusaurus/theme-common": "^3.8.1",
"@easyops-cn/docusaurus-search-local": "^0.34.0",
"@mdx-js/mdx": "^3.1.0",
"@mdx-js/react": "^3.1.0",
"@svgr/webpack": "^5.5.0",
"clsx": "^2.1.1",
"gatsby-remark-acronyms": "^1.2.1",
"patch-package": "^6.5.1",
"prism-react-renderer": "^2.4.1",
"react": "^19.1.0",
"react-dom": "^19.1.0",
"react-pdf": "^5.7.2",
"react-toggle": "^4.1.3",
"rehype-raw": "^7.0.0",
"remark-admonitions": "^1.2.1",
"remark-cli": "^12.0.1",
"remark-frontmatter": "^5.0.0",
"remark-gfm": "^4.0.1",
"remark-lint": "^10.0.1",
"remark-preset-lint-consistent": "^4.0.0",
"remark-preset-lint-recommended": "^5.0.0",
"unist-util-is": "^6.0.0",
"unist-util-map": "^2.0.1",
"unist-util-position": "^5.0.0",
"unist-util-visit": "^2.0.3",
"url-loader": "^4.1.1"
```