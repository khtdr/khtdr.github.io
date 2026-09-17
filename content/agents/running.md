---
title: "agents: operating it"
date: 2026-09-15T00:00:00-06:00
description: Ports, hosts, where the files live, moving to Postgres, and the things that go wrong.
url: /agents/running
---

{{< agents-nav "running" >}}

## Which port does it use?

`agent serve` listens on port 2137, on `127.0.0.1` only. You can change it. For
one start:

```bash
agent serve --port 3000
```

To change it for good, set `PORT` where the server will see it. Either of these
works:

```bash
# in ~/.agents/.env, which the server reads on every start
PORT=3000

# or in your shell profile (~/.bashrc, ~/.zshrc)
export PORT=3000
```

The CLI finds the server through a separate variable, so if you move the port,
move that too:

```bash
export AGENT_API_URL=http://localhost:3000
```

## It says the port is already in use

Most likely another `agent serve` is still running, possibly in a terminal you
forgot about. If so, use that one. Otherwise pick a different port as above. The
error message names the port and gives the same options.

## Can I reach it from another machine?

By default, no. The server binds to `127.0.0.1`, and nothing on it asks for a
password, so opening it up is a decision you make on purpose. Set `HOST` to listen
wider, and put it behind something that authenticates first:

```bash
# ~/.agents/.env
HOST=0.0.0.0
```

There is no login, no bearer token, and no notion of a caller anywhere in the
system. Treat reachability as the whole security boundary.

## Where does everything live?

Under `~/.agents`. The `.env` with your key and settings, the SQLite database, and
the directories tools read from and write to. Back up that directory and you have
backed up the install. Set `AGENTS_HOME` to put it somewhere else.

## Running it against Postgres

SQLite is fine for one machine. Postgres is for when more than one process, or
more than one machine, needs the same agents and history.

The database has to exist. The tables do not. They get created the first time the
server starts, and a database from an older version picks up any columns it is
missing the same way.

Set the driver and the connection in `~/.agents/.env`, then restart:

```bash
# ~/.agents/.env
STORE_DRIVER=postgres
PGHOST=db.example.internal
PGPORT=5432
PGUSER=agents
PGPASSWORD=...
PGDATABASE=agents
```

```bash
agent serve
# Agent platform running on http://127.0.0.1:2137 (storage: postgres)
```

Everything lands in a schema named `agents` inside that database, so it can share
a database with other things. Set `DB_SCHEMA` to use a different name. The user
needs to be able to create the schema and its tables on the first start. After
that, ordinary read and write is enough.

Two servers pointed at the same database see the same agents, runs, secrets and
memories. The SQLite file under `~/.agents` stays where it was, so switching back
is a matter of changing `STORE_DRIVER` again.

## A run is stuck at "running"

It should not stay that way. Runs check in on a heartbeat, and a reaper closes out
the ones that stopped checking in. A crashed run gets recorded as an error rather
than left hanging, and cancel stops the run.

What the reaper does not do is resume anything. A dead run is closed, not
continued. If that matters for your workload, read the
[durability section of the Flue comparison](/agents/compare), which says where
this falls short.

## A paused run is not the same as a stuck run

A run waiting on a person holds no process. It sits in the database with a token,
and it will wait as long as it takes. `agent pending` and
`GET /api/runs/pending` list everything in that state.

The one thing the server does resume is a paused run that already got its answer.
Answering is a write to the row, and restarting the run is a second step; if the
server goes down between the two — a deploy landing at the wrong second — the run
would otherwise sit there answered and unfinished forever. So every server sweeps
for that on startup and every thirty seconds after, and picks those runs back up.
It waits a minute first, so it adopts a run nobody is holding rather than racing a
restart already under way.

## Upgrading

```bash
npm install -g @upship/agents@latest
```

Restart the server. Schema changes apply on start. If you vendored the runtime
with `agent bundle`, run that again after updating the CLI.

{{< agents-pager "running" >}}
