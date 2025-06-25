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
