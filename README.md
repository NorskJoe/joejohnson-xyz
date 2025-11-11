# joejohnson-xyz

## About

Monorepo scaffolded using [Nx](https://nx.dev).

### Commands
------------------------------
### First time setup
#### Install NX
`npm add --global nx`

#### Install packages
`npm i`

#### List all projects using nx:
`npx nx show projects`

#### See GUI with commands for a given project:
`npx nx show project <project-name> --web`

------------------------------

## Projects
### [joejohnson.xyz](https://www.joejohnson.xyz)
#### `apps/resume` 

- personal website built in react
- static content
- migrated from standalone next.js project ([View on GitHub](https://github.com/NorskJoe/pw-ui))
- deployed using Azure DevOps

`npx nx serve-static resume`
### Component Library
#### `packages/components`

- react component library
- for use across other projects in the monorepo
- storybook exists
- not published to any registries
- TODO: deploy storybook?

`npx nx run components:storybook`
### [Gear Ratios](https://bike.joejohnson.xyz/)
#### `apps/gearratios`

- TODO: migrate from [Angular project](https://github.com/NorskJoe/GearRatios)
- currently deployed using [fly.io](https://fly.io)

### Recipes
#### `apps/recipes`
- TODO: build read-only site
- TODO: build admin site to add recipes
- app routing (page, not-found, error, loading, etc)
- API currently mocked with json-server
`npx json-server --port 3030 --watch .\apps\recipes\src\mocks\db.json`