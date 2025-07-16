# joejohnson-xyz

## About

Monorepo scaffolded using [Nx](https://nx.dev).

### Commands
------------------------------
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
- not published to any registries
- TODO: deploy storybook
### [Gear Ratios](https://bike.joejohnson.xyz/)
#### `apps/gearratios`

- TODO: migrate from [Angular project](https://github.com/NorskJoe/GearRatios)
- currently deployed using [fly.io](https://fly.io)
