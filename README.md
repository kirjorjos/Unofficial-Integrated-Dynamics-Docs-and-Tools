# Unofficial Integrated Dynamics Docs and Tools

This project is a TypeScript implementation of the core logic from the [Integrated Dynamics](https://github.com/cyclopsmc/IntegratedDynamics/) Minecraft mod as well as documentation and guides for learning the mod.

## Live Deployment

This project is hosted and deployed live on GitHub Pages:
[https://kirjorjos.github.io/Unofficial-Integrated-Dynamics-Docs-and-Tools/](https://kirjorjos.github.io/Unofficial-Integrated-Dynamics-Docs-and-Tools/)

## Project Roadmap

Current plans for this project are as follows:

- [x] Ability to eval custom operators
- [ ] Ability to convert to and from AST:
  - [x] SNBT
  - [x] Condensed
  - [x] Expanded
  - [x] CodeLine
  - [x] URL Param
  - [ ] Javascript (Anything that's valid in [InSr](https://github.com/cyclopsmc/IntegratedScripting))
- [ ] An article explaining various things about the mod intended to help beginners learn
  - [ ] An article for each operator explaining its usage and providing a mini challenge involving it
  - [ ] Explaining operators in general
  - [ ] Explaining how to use the logic programmer & labeller
  - [ ] Explaining how to use the materializer and delayer
  - [ ] Explaining readers
  - [ ] Explaining writers
  - [ ] Explaining [InTr](https://github.com/cyclopsmc/IntegratedTerminals)
  - [ ] Explaining [InCr](https://github.com/cyclopsmc/IntegratedCrafting)
  - [ ] Explaining [InSr](https://github.com/cyclopsmc/IntegratedScripting)
  - [ ] Explaining [InMk](https://github.com/cyclopsmc/IntegratedMekanism)

## Deployments

GitHub Pages hosts every served branch under the project base:

| branch                         | URL                               |
| ------------------------------ | --------------------------------- |
| `1.19.2/main` (primary)        | `…/1.19.2/main/`                  |
| `1.19.2/development`           | `…/1.19.2/development/`           |
| `1.19.2/development/issue-###` | `…/1.19.2/development/issue-###/` |

### Branch rules

- Serveable branches match `^[0-9]+\.[0-9]{1,2}\.[0-9]{1,2}\/(?:main|development(?:\/issue-[0-9]+)?)$` and must be listed in `branches.json` on the `metadata` branch.
- Add or remove a branch in `branches.json`, then run **Pages deploy** manually. Pushing to `1.19.2/main` auto-deploys it and pins the other served branches to their recorded SHAs.
- `metadata` is a data branch (one orphan commit holding `branches.json`, README/licenses and `builds/<slug>/`). Never make it default, and don't edit it during a deploy — the store is force-pushed with `--force-with-lease`.
- A branch that fails to build is dropped (404) until a later deploy succeeds. Stored builds are reused byte-for-byte unless the commit, base, Node, Vite or lockfile changes, so unchanged branches skip `npm ci`/Vite.
- Node is pinned to `20.19.5`; bumping it, Vite or a branch's lockfile rebuilds every branch next deploy.
- `dry_run: true` builds and composes without pushing or deploying. Once a second `<version>/main` exists, remove the push trigger and deploy manually.

### Local preview

```bash
npm run dev:branch -- 1.19.2/development
```

Serves the app at `http://localhost:5173/1.19.2/development/`. Locally the prefix is optional (default `/`); set `PAGES_BASE` to mirror Pages, and `PAGES_BASE=/` plus `PAGES_SITE_URL` for a custom domain.

## Contributing

If you think something is wrong or missing, feel free to [open an issue](https://github.com/kirjorjos/Unofficial-Integrated-Dynamics-Docs-and-Tools/issues) or [submit a pull request](https://github.com/kirjorjos/Unofficial-Integrated-Dynamics-Docs-and-Tools/pulls).

When committing changes, please use the automated tools to test and format staged changes:

After cloning the repo or pulling new changes, run the generation script to regenerate environment-specific artifacts:

```bash
npm run generate
```

To run the playwright test(s) CI flagged as diffs on the current PR, noting that this regenerates your local snapshots as above, and assuming `gh` is installed and authenticated:

```bash
npm run compare
```

To be prompted for commit message:

```bash
npm run commit
```

To specify commit message in-line:

```bash
npm run commit -- -m "commit message here"
```
