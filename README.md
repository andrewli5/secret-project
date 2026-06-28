# secret-project

A personal dashboard SPA: a clock, the local weather (NWS), inbound MBTA Commuter
Rail times, and a Chinese word of the day. Built with React, TypeScript, Vite, and
Mantine, and deployed to GitHub Pages.

## Scripts

- `yarn dev` – start the development server
- `yarn build` – type-check and build the production bundle
- `yarn preview` – preview the production build locally
- `yarn test` – run the unit tests once with Vitest
- `yarn typecheck` – type-check without emitting
- `yarn lint` – run ESLint and Stylelint
- `yarn format` – format all files with Biome

## Configuration

Set `VITE_MBTA_API_KEY` in a `.env` file to raise the MBTA API rate limit (requests
work without it, just throttled).
