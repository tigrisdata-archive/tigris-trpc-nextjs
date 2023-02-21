<p align="center">
  <a href="https://www.typescriptlang.org/"><img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/></a>
  <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/></a>
  <a href="https://trpc.io/"><img alt="Typescript" src="https://img.shields.io/badge/tPRC-317EB9?style=for-the-badge&logo=trpc&logoColor=white"/></a>
  <a href="https://opensource.org/licenses/MIT"><img alt="LICENSE" src="https://img.shields.io/badge/licence-MIT-orange?style=for-the-badge"></a>
</p>

# Tigris Database and Search + tRPC + Next.js

An example demonstrating the following tech stack:

- [Tigris](https://www.tigrisdata.com) - database and search
- [Next.js](https://nextjs.org/) - React-based web framework
- [tRPC](https://trpc.io) - Remote Procedure Call library that enables Type inference across client and server

And the following Tigris products and features:

- [Database Inserts](https://www.tigrisdata.com/docs/sdkstools/typescript/database/insert/)
- [Database Querying](https://www.tigrisdata.com/docs/sdkstools/typescript/database/query/)
- [Database Query sorting](https://www.tigrisdata.com/docs/sdkstools/typescript/database/query/#sort)
- [Database Query pagination](https://www.tigrisdata.com/docs/sdkstools/typescript/database/query/#pagination)
- [Search](https://www.tigrisdata.com/docs/sdkstools/typescript/database/search/)

## Development

### Prerequisites

- A [Tigris Cloud](https://www.tigrisdata.com) account
- Install the [Tigris CLI](https://www.tigrisdata.com/docs/sdkstools/cli/installation/)
- [Node.js > 18.13.0](https://nodejs.org/en/download/) installed

### Get the code and install dependencies

```bash
git clone git@github.com:tigrisdata-community/tigris-trpc-nextjs.git
cd tigris-trpc-nextjs
npm install
```

### Create your Tigris Project

Create your Tigris project and Tigris application keys, and set environmental variables.

### Setup

1. Login to the [Tigris Console](https://console.preview.tigrisdata.cloud/)
2. Create a Project called `tigris_trpc_nextjs` (or some other name if you prefer)
3. Navigate to **Application Keys**
4. Click the eye icon next to the Key with the same name as your Project
5. Create a `.env.development.local` file and copy:

- **URL** to a variable named `TIGRIS_URI`
- **Name** to a variable named `TIGRIS_PROJECT`
- **Client ID** to a variable named `TIGRIS_CLIENT_ID`
- **Client Secret** to a variable named `TIGRIS_CLIENT_SECRET`

6. Finally, add another variable called `TIGRIS_DB_BRANCH` with a value of `develop`

An example `.env.development.local` is in the repo called `.env.development.local.example`.

### Preload some data

An app with no data is no fun!

Run the following script to add some users to the database. Separate each username with a space character:

```shell
npm run add-users -- {username1} {username2} ... {usernameX}
```

For example, the following command will add four users to the database with the corresponding usernames:

```shell
npm run add-users -- leggetter ovaistariq adilansari GarrenSmith
```

Now, add some mock posts by running the following command:

```shell
npm run load-mock-data
```

### Run the app

With users and posts loaded, we can run the app:

```shell
npm run dev
```

## Contribute 🙌

Please do get involved! Issues and Pull Requests are very much sought and appreciated.

## Code of Conduct

See the [Tigris Community Code of Conduct](https://www.tigrisdata.com/docs/community/code-of-conduct/).

## More info

- [Join the Tigris Community Discord](https://www.tigrisdata.com/discord)
- [Follow Tigris Data on Twitter](https://twitter.com/tigrisdata)
- [Dive into the Tigris Docs](https://www.tigrisdata.com/docs/)
- [Visit the Tigris Data website](https://www.tigrisdata.com)
