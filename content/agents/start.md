---
title: "agents: getting started"
date: 2026-09-15T00:00:00-06:00
description: One key, one install, and a working agent in about five minutes.
url: /agents/start
---

{{< agents-nav "start" >}}

<p class="agents-hero">
You need one API key and one npm install. There is no database to set up, no
queue, and no broker. About five minutes from nothing to a working agent.
</p>

<ol class="agents-steps">
<li>
<h4>Get a model key</h4>
<p>Sign up at <a href="https://openrouter.ai">openrouter.ai</a> and copy an API key.
One key covers every provider, so Anthropic, OpenAI, Google and the rest all work
from it. It is the only credential you need.</p>
</li>
<li>
<h4>Install it</h4>

```bash
npm install -g @upship/agents
agent serve
```

<p>Paste the key in when it asks. That starts the API and the web UI on
<code>localhost:2137</code>. Storage is a SQLite file under <code>~/.agents</code>.
You can point it at Postgres later if you outgrow that.</p>
</li>
<li>
<h4>Make your first agent</h4>
<p>Two ways, and neither needs a copy of the source. The first is to let the
platform interview you. Open a second terminal, since the server is running in the
first:</p>

```bash
agent new
```

<p>It asks what you want to build, follows up on the vague parts, then writes a
draft and shows it to you:</p>

```text
What do you want to build?
(take as many lines as you like — blank line when you're done)

> something that watches my RSS feeds and summarizes new posts

draft
  Name:  rss-summarizer
  What:  Summarizes new posts across a list of feeds.
  Model: default
  Tools: web_search, write_file

  System prompt
  You are handed a list of feed URLs. Fetch what is new since the
  last run, and write one short paragraph per post: what it says,
  not that it exists.

  Notes
  Give it a durable memory namespace if you want it to remember
  where it stopped between runs.

Create it? [y/N]
```

<p>Nothing is saved until you say yes.</p>

<p>The second way is to hand the job to the coding agent you already use:</p>

```bash
agent skill install     # writes the /new-agent skill
claude                  # then: /new-agent
```

<p>Both read the same brief, and that brief is generated from your install. It
lists the tools you have, including ones you wrote and ones that came
from a package or an MCP server, and it explains how to add one when nothing fits.
Run <code>agent brief</code> to print it if you want it somewhere else.</p>
</li>
<li>
<h4>Run it</h4>

```bash
agent rss-summarizer "catch me up on this week"
```

<p>Or open the web UI and click Run. Either way the run lands in history with its
cost, its steps, and every sub-agent it called.</p>
</li>
</ol>

## What you just installed

Everything lives under `~/.agents`. That directory holds the `.env` with your key
and settings, the SQLite database, and the folders tools read from and write to.
Back up that one directory and you have backed up the install. Set `AGENTS_HOME`
to put it somewhere else.

The server is a single Node process. It serves the HTTP API, the web UI, and
nothing else. The CLI talks to it over that same API, so anything
the CLI does you can also do over HTTP.

## Where to go next

- The agent you just made runs a freeform loop: the model picks tools until it is
  done. If you want fixed steps, branches, or a human approval in the middle, that
  is a [pipeline](/agents/features).
- If you want it to reach one of your own services, look at
  [tools](/agents/tools) before you write any code. An HTTP API with a key is
  usually a config change, not a module.
- If you want it to compute rather than estimate, give it
  [run_script](/agents/sandbox).

{{< agents-pager "start" >}}
