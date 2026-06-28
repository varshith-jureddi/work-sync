
# WorkSync

Manage your events,invites and track RSVPs
Create events, share a unique invite link, and watch attendee status update in real-time with Going, Maybe, and Not going counts.


## Authors

- [@varshith-jureddi](https://github.com/varshith-jureddi)


## Features

- Create Events
- Share Invite Links
- Track Attendance


## Tech Stack

**Client:** React, Next, TailwindCSS

**Server:** Node, PostgreSQL


## Run Locally

Clone the project

```bash
  git clone https://github.com/varshith-jureddi/work-sync
```

Go to the project directory

```bash
  cd work-sync
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

For Database

Create a database in the postgres server

Initialise Prisma

```
  npx prisma init
```

Add Your postgres link to the .env file

```ex
postgres://postgres:{password}@localhost:5432/name-db?schema=public
```
Prisma Generate

```
  npx prisma generate
```

